/**
 * Component to generate a mesh from a 2D height map image
 *
 * Downloads a PNG image and samples its pixels for height values on a
 * generated grid.
 * The value range sampled is given by the resolution parameter, which
 * will be translated to world-meters given by the size parameter.
 */
WL.registerComponent('height-map', {
    material: {type: WL.Type.Material},
    resolutionX: {type: WL.Type.Float, default: 128.0},
    resolutionY: {type: WL.Type.Float, default: 256.0},
    sizeX: {type: WL.Type.Float, default: 16.0},
    sizeY: {type: WL.Type.Float, default: 16.0},
    heightmap: {type: WL.Type.String, default: "gardasee.png"},
}, {
    start: function() {
        /* In Browser-JavaScript you cannot access images directly,
         * only through drawing on a Canvas first.
         * Create the canvas and start loading the image */
        let img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = this.heightmap;
        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('width', this.resolutionX);
        this.canvas.setAttribute('height', this.resolutionY);
        this.canvas.setAttribute('style', 'display: none');
        document.body.appendChild(this.canvas);

        img.onload = function() {
            /* Once the image has loaded, draw it onto the canvas
             * to be sampled later */
            this.ctx = this.canvas.getContext('2d');
            this.ctx.drawImage(img, 0, 0);
            img.style.display = 'none';

            this.generate();
        }.bind(this);
    },
    generate: function() {
        console.log("Generating terrain...");
        this.meshComp = this.object.addComponent('mesh');
        this.meshComp.material = this.material;

        const vertexCount = 6*(this.resolutionX-1)*(this.resolutionY-1);
        this.indexData = new Uint32Array(vertexCount);
        /* Indices:
         * 0--1
         * | /
         * |/
         * 2  4
         *   /|
         *  / |
         * 5--3
         */
        for(let i = 0; i < vertexCount; i += 6) {
            this.indexData.subarray(i, i + 6)
                .set([i + 0, i + 2, i + 1, i + 5, i + 3, i + 4]);
        }

        console.log("Vertices:", vertexCount);
        console.log("Data size:", "unknown", "bytes");

        this.mesh = new WL.Mesh({
            vertexCount: vertexCount,
            indexData: this.indexData,
            indexType: WL.MeshIndexType.UnsignedInt,
        });

        let v = 0;
        const scaleX = this.resolutionX/this.sizeX;
        const scaleY = this.resolutionY/this.sizeY;

        const positions = this.mesh.attribute(WL.MeshAttribute.Position);
        const texCoords = this.mesh.attribute(WL.MeshAttribute.TextureCoordinate);
        const normals = this.mesh.attribute(WL.MeshAttribute.Normal);
        const colors = this.mesh.attribute(WL.MeshAttribute.Color);

        for(let x = 0; x < this.resolutionX - 1; ++x) {
            for(let y = 0; y < this.resolutionY - 1; ++y) {
                let height = 0;
                for(let i = 0; i < 4; ++i) {
                    height = this.pick([x + (i & 1), y + ((i & 2) >> 1)]);
                    positions.set(v + i, [(x + (i & 1))/scaleX, height, (y + ((i & 2) >> 1))/scaleY]);
                }

                /* Duplicate vertex 1 and 2, triangles will receive different flat normals */
                for(let i = 0; i < 2; ++i) {
                    positions.set(v + (4 + i), positions.get(v + (i + 1)));
                }

                v += 6;

                const c = (height + 10)/32;
                for(let i = 0; i < 6; ++i) {
                    colors.set(v + i, [x/this.resolutionX, c, y/this.resolutionY, 1.0]);
                }
            }
        }

        /* Texture coordinates, if the exist */
        v = 0;
        if(texCoords) for(let x = 0; x < this.resolutionX - 1; ++x) {
            for(let y = 0; y < this.resolutionY - 1; ++y) {
                for(let i = 0; i < 4; ++i) {
                    texCoords.set(v + i, [x + (i & 1), y + ((i & 2) >> 1)]);
                }

                /* Duplicate vertex 1 and 2, triangles will receive different flat normals */
                for(let i = 0; i < 2; ++i) {
                    texCoords.set(v + (4 + i), texCoords.get(v + (i + 1)));
                }

                v += 6;
            }
        }

        const normal = new Float32Array(3);
        for(let i = 0; i < vertexCount; i += 6) {
            this.surfaceNormal(normal,
                positions.get(this.indexData[i + 0]),
                positions.get(this.indexData[i + 1]),
                positions.get(this.indexData[i + 2]));

            /* Set with offset, will set all three components of the normal */
            for(let v = 0; v < 3; ++v) {
                /* Set with offset, will set all three components of the normal */
                normals.set(this.indexData[i + v], normal);
            }

            this.surfaceNormal(normal,
                positions.get(this.indexData[i + 3]),
                positions.get(this.indexData[i + 4]),
                positions.get(this.indexData[i + 5]));

            for(let v = 3; v < 6; ++v) {
                /* Set with offset, will set all three components of the normal */
                normals.set(this.indexData[i + v], normal);
            }
        }
        this.meshComp.mesh = this.mesh;
    },
    pick: function(coord) {
        const x = coord[0];
        const y = coord[1];
        let pixels = this.ctx.getImageData(x, y, 1, 1);
        let data = pixels.data;
        const height = (data[0] - 220)/32.0;
        return height;
    },
    surfaceNormal: function() {
        const u = new Float32Array(3);
        const v = new Float32Array(3);

        return function(out, p1, p2, p3) {
            glMatrix.vec3.sub(u, p2, p1);
            glMatrix.vec3.sub(v, p3, p1);
            glMatrix.vec3.cross(out, u, v);
            glMatrix.vec3.normalize(out, out);

            return out;
        }
    }()
});

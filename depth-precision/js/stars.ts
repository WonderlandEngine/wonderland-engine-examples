import {Component, MeshComponent} from '@wonderlandengine/api';
import {property} from '@wonderlandengine/api/decorators.js';
import type {FlatOpaque} from './Materials';

export class Stars extends Component {
    static TypeName = 'stars';

    /* Properties that are configurable in the editor */

    @property.float(1.0)
    minScale!: number;

    @property.float(1.0)
    maxScale!: number;

    @property.float(1.0)
    distance!: number;

    @property.mesh()
    starMesh!: Mesh;

    @property.material()
    starMaterial!: Material;

    @property.int(1)
    count!: number;

    start() {
        const colors = [
            [1.0, 0.9, 0.8, 1.0],  // Warm white
            [0.9, 0.9, 1.0, 1.0],  // Cool white
            [0.8, 0.8, 1.0, 1.0],  // Pale blue
            [0.7, 0.7, 1.0, 1.0],  // Light blue
            [1.0, 0.85, 0.7, 1.0], // Yellowish-white
            [0.6, 0.6, 1.0, 1.0],  // Deep blue
            [0.9, 0.9, 0.9, 1.0],  // Neutral white
        ];

        const materials = colors.map(color => {
            const material = this.starMaterial.clone() as FlatOpaque;
            material.setColor(color);
            return material;
        });

        for(let i = 0; i < this.count; ++i) {
            const star = this.object.addChild();
            const material = materials[Math.floor(Math.random()*materials.length)];
            const scale = 0.001*this.distance*(this.minScale + Math.random()*(this.maxScale - this.minScale));
            star.setScalingLocal([scale, scale, scale]);
            star.addComponent(MeshComponent, {
                mesh: this.starMesh,
                material
            });

            /* Random points on a sphere */
            const theta = Math.random()*Math.PI*2.0;
            const phi = Math.acos(2.0*Math.random() - 1.0);
            const x = this.distance*Math.sin(phi)*Math.cos(theta);
            const y = this.distance*Math.sin(phi)*Math.sin(theta);
            const z = this.distance*Math.cos(phi);

            star.setPositionWorld([x, y, z]);
        }
    }

    update(dt: number) {
    }
}

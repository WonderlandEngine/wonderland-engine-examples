import {Component, MeshComponent, Property} from '@wonderlandengine/api';
import { vec3 } from 'gl-matrix';

/**
 * Randomize mesh and material on start.
 */
export class RandomMesh extends Component {
    static TypeName = 'random-mesh';
    /* Properties that are configurable in the editor */
    static Properties = {
        mesh0: Property.mesh(),
        mesh1: Property.mesh(),
        mesh2: Property.mesh(),
        material0: Property.material(),
        material1: Property.material(),
        material2: Property.material(),
    };

    start() {
        const mesh = this.object.getComponent(MeshComponent);
        if (!mesh) {
            throw new Error('mesh component is required');
        }

        const meshes = [this.mesh0, this.mesh1, this.mesh2];
        const materials = [this.material0, this.material1, this.material2];
        for (let i = 0; i < meshes.length; ++i) {
            if (!meshes[i]) {
                throw new Error(`Mesh ${i} is required`);
            }
            if (!materials[i]) {
                throw new Error(`Material ${i} is required`);
            }
        }

        const meshIndex = Math.floor(Math.random() * meshes.length);
        const matIndex = Math.floor(Math.random() * materials.length);

        mesh.mesh = meshes[meshIndex];
        mesh.material = materials[matIndex];

        /* Random scaling */
        const scale = this.object.getScalingWorld();
        const randScale = 0.5 + 0.5 * Math.random();
        vec3.scale(scale, scale, randScale);
        this.object.setScalingWorld(scale);

        /* Update y position based on new scale */
        this.object.setPositionLocal([0, 0.5 * scale[1], 0]);
    }
}

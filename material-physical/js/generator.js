import {Component, Property} from '@wonderlandengine/api';

const Colors = [
    [44 / 255, 62 / 255, 80 / 255, 1], /* Dark blue */
    [236 / 255, 240 / 255, 241 / 255, 1],
    [46 / 255, 204 / 255, 113 / 255, 1], /* Green */
    [1.0, 0.0, 0.988, 1], /* Pink */
    [192 / 255, 57 / 255, 43 / 255, 1], /* Red */
];

export class Generator extends Component {
    static TypeName = 'generator';
    static Properties = {
        prefab: Property.object({required: true})
    };

    start() {
        const meshComp = this.prefab.getComponent('mesh');
        if (!meshComp) {
            throw new Error('Missing mesh component');
        }

        this.prefab.setScalingWorld([0, 0, 0]); /* Hide the prefab */

        const max = Colors.length;
        const half = (max - 1) * 0.5;

        /* Create multiple rows of spheres with varying levels of roughness/metallic */
        const mesh = meshComp.mesh;
        for (let i = 0; i < max * max; ++i) {
            const x = i % max;
            const y = Math.floor(i / max);

            const obj = this.scene.addObject(this.prefab.parent);
            obj.setScalingWorld([0.25, 0.25, 0.25]);
            obj.setPositionWorld([x - half, y - half, 0]);

            const material = meshComp.material.clone();
            material.setRoughnessFactor((x + 1) / max);
            material.setMetallicFactor((y + 1) / max);
            material.setAlbedoColor(Colors[y]);

            obj.addComponent('mesh', {mesh, material});
        }

        this.scene.dispatchReadyEvent(); /* For screenshot testing */
    }
}

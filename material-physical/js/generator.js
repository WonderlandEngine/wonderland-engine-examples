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

        const max = Colors.length;
        const half = (max - 1) * 0.5;

        const mesh = meshComp.mesh;
        const prefabMaterial = meshComp.material;
        for (let y = 0; y < max; ++y) {
            const rgba = Colors[y];
            for (let x = 0; x < max; ++x) {
                const obj = this.scene.addObject(this.prefab.parent);
                obj.setScalingWorld([0.25, 0.25, 0.25]);
                obj.setPositionWorld([x - half, y - half, 0]);

                const material = prefabMaterial.clone();
                material.setRoughnessFactor((x + 1) / max);
                material.setMetallicFactor((y + 1) / max);
                material.setAlbedoColor(rgba);

                obj.addComponent('mesh', {mesh, material});
            }
        }

        /* Hide the prefab */
        this.prefab.setScalingWorld([0, 0, 0]);
    }

    update(dt) {
        /* Called every frame. */
    }
}

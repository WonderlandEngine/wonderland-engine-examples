import {Alignment, Component, Material, Mesh, MeshComponent, Object3D, TextComponent, TextEffect, VerticalAlignment} from '@wonderlandengine/api';
import {property} from '@wonderlandengine/api/decorators.js';
import type {Text} from './Materials.js';

const textBounds = new Float32Array(4);

export class DistanceSigns extends Component {
    static TypeName = 'distance-signs';

    @property.material()
    textMaterial!: Material;

    @property.mesh()
    planeMesh!: Mesh;

    @property.material()
    planeMaterial!: Material;

    static readonly Distances = [0.01, 0.1, 1.0, 10.0, 100.0, 1000.0, 10000.0, 100000.0];
    static readonly DistanceNames = ['1cm', '10cm', '1m', '10m', '100m', '1km', '10km', '100km'];

    textObjects: Object3D[] = [];

    start() {
        for(let i = 0; i < DistanceSigns.Distances.length; i++) {
            const child = this.object.addChild();

            const factor = i/(DistanceSigns.Distances.length - 1)*2.0 - 1.0;
            const distance = DistanceSigns.Distances[i];
            const xOffset = factor*0.65*distance;
            const yOffset = factor*distance*0.25;
            child.setPositionWorld([xOffset, yOffset, -distance]);
            child.setScalingLocal([0.75*distance, 0.75*distance, 0.75*distance]);
            const material = this.textMaterial.clone() as Text;
            // TODO set text color
            const text = child.addComponent(TextComponent, {
                text: DistanceSigns.DistanceNames[i],
                material,
                effect: TextEffect.Outline,
                alignment: Alignment.Center,
                verticalAlignment: VerticalAlignment.Middle,
            });
            this.textObjects.push(child);
            /*
            const plane = child.addChild();

            text.getBoundingBox(textBounds);
            const textWidth = textBounds[2] - textBounds[0];
            const textHeight = textBounds[3] - textBounds[1];

            plane.setPositionLocal([0, 0, -0.00001]);
            plane.setScalingLocal([0.55*textWidth, 0.55*textHeight, 1.0]);
            plane.addComponent(MeshComponent, {
                mesh: this.planeMesh,
                material: this.planeMaterial,
            });
            */
        }
    }
}

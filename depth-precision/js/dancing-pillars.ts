import {Component, Material, Mesh, MeshComponent, Object3D} from '@wonderlandengine/api';
import {property} from '@wonderlandengine/api/decorators.js';
import {DistanceSigns} from './distance-signs.js';
import type {PhysicalOpaque} from './Materials.js';

export class DancingPillars extends Component {
    static TypeName = 'dancing-pillars';

    @property.float(1.0)
    speed!: number;

    @property.mesh()
    pillarMesh!: Mesh;

    @property.material()
    pillarMaterial!: Material;

    private platforms: Object3D[] = [];

    start() {
        const colors = [
            [1.0, 0.8039215, 0.0, 1.0],
            [0.1529411, 0.7882353, 0.5411764, 1.0],
            [0.9098039, 0.0, 0.5411764, 1.0],
        ];
        const positions = [
            [-0.5, -2, -0.5],
            [0, -2, 0.5],
            [0.5, -2, -0.5],
        ];

        const materials = colors.map(color => {
            const material = this.pillarMaterial.clone() as PhysicalOpaque;
            material.setAlbedoColor(color);
            return material;
        });

        for(let i = 0; i < DistanceSigns.Distances.length; ++i) {
            const child = this.object.addChild();
            const platform = child.addChild();
            this.platforms.push(platform);

            for(let j = 0; j < colors.length; ++j) {
                const pillar = platform.addChild();
                pillar.setScalingLocal([0.5, 1, 0.5]);
                pillar.addComponent(MeshComponent, {
                    mesh: this.pillarMesh,
                    material: materials[j]
                });
                pillar.setPositionLocal(positions[j]);
            }

            const factor = i/(DistanceSigns.Distances.length - 1)*2.0 - 1.0;
            const distance = DistanceSigns.Distances[i];
            const xOffset = factor*0.65*distance;
            const yOffset = factor*distance*0.25;
            const scale = 0.075*distance;
            child.setPositionWorld([xOffset, yOffset, -distance]);
            platform.setScalingLocal([scale, scale, scale]);
            platform.setPositionLocal([0, 0, -scale]);
            platform.rotateAxisAngleRadObject([0, 1, 0], Math.random()*Math.PI*2.0);
        }
    }

    update(dt: number) {
        for(const platform of this.platforms) {
            platform.rotateAxisAngleRadLocal([0, 1, 0], this.speed*dt);
            platform.rotateAxisAngleRadObject([0, 1, 0], this.speed*dt);
        }
    }
}

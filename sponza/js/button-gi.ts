import { Material, MeshComponent, Object3D, property } from '@wonderlandengine/api';
import {ButtonComponent} from './button.js';

export class ButtonToggleGI extends ButtonComponent {
    static TypeName = 'button-gi';

    @property.object({required: true})
    targetMesh: Object3D;

    @property.material({required: true})
    materialGI: Material;

    private _meshes: MeshComponent[];
    private _materials: Material[];
    private _switch = true;

    onActivate(): void {
        super.onActivate();
        this._meshes = this.targetMesh.getComponents('mesh');
        this._materials = this._meshes.map(c => c.material);
    }

    onDeactivate(): void {
        super.onDeactivate();
        for(let i = 0; i < this._meshes.length; ++i) {
            this._meshes[i].material = this._materials[i];
        }
    }

    onDown(): void {
        for(let i = 0; i < this._meshes.length; ++i) {
            this._meshes[i].material = this._switch ? this.materialGI : this._materials[i];
        }
        this._switch = !this._switch;
    }
}

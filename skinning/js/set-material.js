import {Component, Type} from '@wonderlandengine/api';

export class SetMaterial extends Component {
    static TypeName = 'set-material';
    static Properties = {
        mat: {type: Type.Material},
        switchMat: {type: Type.Material},
    };
    start() {
        this.switchflag = true;
        setInterval(this.changeMaterial.bind(this), 1000);
    }

    changeMaterial() {
        this.object.getComponent('mesh').material = this.switchflag
            ? this.mat
            : this.switchMat;
        this.switchflag = !this.switchflag;
    }
}

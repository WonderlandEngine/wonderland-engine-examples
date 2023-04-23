import {Component, Property} from '@wonderlandengine/api';
import {PlaneDetection} from '@wonderlandengine/components';

const tempColor = new Float32Array(4);

const colorHSL = (o, h, s, l) => {
    s /= 100;
    l /= 100;
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    o[0] = f(0);
    o[1] = f(8);
    o[2] = f(4);
};

/**
 * random-plane-colors
 */
export class RandomPlaneColors extends Component {
    static TypeName = 'random-plane-colors';
    static Properties = {};
    static Dependencies = [];

    start() {
        const planeDetection = this.object.getComponent(PlaneDetection);
        planeDetection.onPlaneFound.add((xrPlane, object) => {
            /* Clone the material and change the color */
            const mat = planeDetection.planeMaterial.clone();
            tempColor[3] = mat.diffuseColor[3];
            colorHSL(tempColor, Math.random() * 260, 100, 50);
            mat.diffuseColor = tempColor;
            planeDetection.planeMaterial = mat;
        });
    }
}

import {Component, Property} from "@wonderlandengine/api";
import { SwitchScene } from './switch';

/**
 * switch-scene
 */
export class Portal extends Component {
	static TypeName = "portal";
	/* Properties that are configurable in the editor */
	static Properties = {
		target: Property.object(),
		translationDuration: Property.float(0.5),
		initialTranslate: Property.float(30),
		portalRotateSpeed: Property.float(1.0),
	};

	startBool = false;
	startUpdate = true;

	onActivate() {
		this.target.translateObject([0, 0, this.initialTranslate]);
	}

	update(dt) {
		this.object.rotateAxisAngleDegObject(
			[0, 0, 1],
			dt * 10000 * this.portalRotateSpeed,
		);
		this.playerPosition = this.target.getPositionWorld([]);
		this.portalPosition = this.object.getPositionWorld([]);
		if (this.playerPosition[0] <= this.portalPosition[0]) {
			const distanceRemaining = Math.abs(
				this.portalPosition[0] - this.playerPosition[0],
			);
			const alpha =
				1 -
				Math.exp(-dt / (this.translationDuration * distanceRemaining));

			const newPosition = this.lerpVector(
				this.playerPosition,
				this.portalPosition,
				alpha,
			);
			this.target.setPositionWorld(newPosition);
		}
		if (this.playerPosition[0] >= this.portalPosition[0]) {
			this.startUpdate = false;
			this.object.getComponent(SwitchScene).switch();
		}
	}

	lerpVector(v1, v2, alpha) {
		return [
			v1[0] + (v2[0] - v1[0]) * alpha,
			v1[1] + (v2[1] - v1[1]) * alpha,
			v1[2] + (v2[2] - v1[2]) * alpha,
		];
	}

}

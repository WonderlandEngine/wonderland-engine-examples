import {Component, Property} from "@wonderlandengine/api";

/**
 * switch-scene
 */
export class SwitchScene extends Component {
	static TypeName = "switch-scene";
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
		this.object.translateObject([0, 0, this.initialTranslate]);
		console.error("activate got called on", this.scene.filename);
		this.startUpdate = true;
	}

	onDeactivate() {
		console.error("deactivate got called on", this.scene.filename);
	}

	update(dt) {
		this.target.rotateAxisAngleDegObject(
			[0, 0, 1],
			dt * 10000 * this.portalRotateSpeed,
		);
		if (!this.startUpdate) return;
		//console.error("updating ", this.engine.scene.filename);
		this.currentPosition = this.object.getPositionWorld([]);
		this.targetPosition = this.target.getPositionWorld([]);
		if (this.currentPosition[0] <= this.targetPosition[0]) {
			const distanceRemaining = Math.abs(
				this.targetPosition[0] - this.currentPosition[0],
			);
			const alpha =
				1 -
				Math.exp(-dt / (this.translationDuration * distanceRemaining));

			const newPosition = this.lerpVector(
				this.currentPosition,
				this.targetPosition,
				alpha,
			);
			this.object.setPositionWorld(newPosition);
		}
		if (this.currentPosition[0] >= this.targetPosition[0]) {
			this.startUpdate = false;
			this.switch();
		}
	}

	lerpVector(v1, v2, alpha) {
		return [
			v1[0] + (v2[0] - v1[0]) * alpha,
			v1[1] + (v2[1] - v1[1]) * alpha,
			v1[2] + (v2[2] - v1[2]) * alpha,
		];
	}

	switch() {
		const scene1 = this.engine.getSceneGroup(0).getScene(0);
		const scene0 = this.engine.getSceneGroup(1).getScene(0);
		if (this.scene === scene0) {
			console.error("switching to " + scene1.filename);
			scene1.activate();
		} else {
			console.error("switching to " + scene0.filename);
			scene0.activate();
		}
	}
}

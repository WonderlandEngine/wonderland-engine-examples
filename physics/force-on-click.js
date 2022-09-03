WL.registerComponent('apply-force-on-click', {
    strength: {type: WL.Type.Float, default: 100.0},
}, {
    start: function() {
        const target = this.object.getComponent('cursor').globalTarget;
        target.addClickFunction(this.onClick.bind(this));

        this.force = new Float32Array(3);
    },

    onClick: function(object, cursor) {
        const body = object.getComponent('physx');
        if(body.static) return;

        glMatrix.vec3.scale(this.force, cursor.direction, this.strength);
        body.addForce(this.force, WL.ForceMode.Force, false, cursor.rayHit.locations[0]);
    },
});

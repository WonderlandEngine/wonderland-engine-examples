WL.registerComponent('rotate.js', {}, {
    init: function() {
        this._axis = [0, 1, 0];
    },
    update: function(dt) {
        this.object.rotateAxisAngleDegObject(this._axis, dt * 50.0);
    },
});

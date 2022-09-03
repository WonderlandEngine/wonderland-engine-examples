WL.registerComponent('light-animation', {
    speed: {type: WL.Type.Float, default: 1.0},
}, {
    init: function() {
    },
    start: function() {
        this.time = 0;

        this.originalPos = new Float32Array(3);
        this.object.getTranslationLocal(this.originalPos);
    },
    update: function(dt) {
        this.time += dt*this.speed;
        this.object.setTranslationLocal([this.originalPos[0] + Math.sin(this.time), this.originalPos[1] + Math.cos(this.time), this.originalPos[2]]);
    },
});

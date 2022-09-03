WL.registerComponent('custom-0', {
    param: {type: WL.Type.Float, default: 1.0},
}, {
    init: function() {
        console.log('init() with param', this.param);
    },
    start: function() {
        console.log('start() with param', this.param);
    },
    update: function(dt) {
        console.log('update() with delta time', dt);
    },
});
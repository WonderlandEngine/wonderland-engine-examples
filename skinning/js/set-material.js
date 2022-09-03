WL.registerComponent('set-material', {
    mat: {type: WL.Type.Material},
}, {
    init: function() {
    },
    start: function() {
        setTimeout(() => {
            this.object.getComponent('mesh').material = this.mat;
        }, 1500);
    },
    update: function(dt) {
    },
});

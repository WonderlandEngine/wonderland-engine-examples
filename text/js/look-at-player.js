WL.registerComponent('look-at-player', {
    player: {type: WL.Type.Object, default: null},
}, {
    init: function() {
        this.translation = [0, 0, 0];
        this.forward = [0, 0, 0];
    },
    
    update: function(dt) {
        this.player.getTranslationWorld(this.translation);
        this.object.lookAt(this.translation, [0, 1, 0]);

        // Set position, based on FOV?
        this.player.getForward(this.forward);
        for(i = 0; i < 3; ++i) {
            this.translation[i] += this.forward[i]*3.0;
        }
        //this.object.setTranslationWorld(this.translation);
    },
});

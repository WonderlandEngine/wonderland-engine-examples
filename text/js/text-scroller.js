WL.registerComponent('text-scroller', {
    speed: {type: WL.Type.Float, default: 0.5},
}, {
    init: function() {
        this.time = 0.0;
        this.textLength = 0;
    },
    
    update: function(dt) {
        this.time += dt;
        if(this.time > this.speed) {
            const str = 'Welcome to Wonderland!';
            this.object.getComponent('text').text = str.substring(0, this.textLength);
            this.textLength = (this.textLength + 1) % (str.length + 1);
            this.time = 0.0;
        }
    },
});

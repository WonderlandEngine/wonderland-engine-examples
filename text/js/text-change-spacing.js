WL.registerComponent('text-change-spacing', {
    speed: {type: WL.Type.Float, default: 1.0},
    lineMin: {type: WL.Type.Float, default: 0.0},
    lineMax: {type: WL.Type.Float, default: 3.0},
    characterMin: {type: WL.Type.Float, default: 0.0},
    characterMax: {type: WL.Type.Float, default: 2.0},
}, {
    init: function() {
        this.time = 0.0;
        this.lineDirection = 1.0;
        this.characterDirection = 0.0;
    },
    
    update: function(dt) {
        let text = this.object.getComponent('text');

        const lineSpacing = text.lineSpacing + dt*this.speed*this.lineDirection;
        const characterSpacing = text.characterSpacing + dt*this.speed*this.characterDirection;

        if(lineSpacing > this.lineMax) {
            this.lineDirection = -1.0;
        } else if(lineSpacing < this.lineMin) {
            this.lineDirection = 0.0;
            this.characterDirection = 1.0;
        }

        if(characterSpacing > this.characterMax) {
            this.characterDirection = -1.0;
        } else if(characterSpacing < this.characterMin) {
            this.characterDirection = 0.0;
            this.lineDirection = 1.0;
        }

        text.lineSpacing = Math.min(Math.max(lineSpacing, this.lineMin), this.lineMax);
        text.characterSpacing = Math.min(Math.max(characterSpacing, this.characterMin), this.characterMax);
    },
});

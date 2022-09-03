WL.registerComponent('play-anim-on-click', {
}, {
    start: function() {
        this.anim = this.object.getComponent('animation');

        this.cursorTarget = this.object.getComponent('cursor-target');
        this.cursorTarget.addClickFunction(this.onClick.bind(this));
    },
    onClick: function(e) {
        this.anim.play();
    }
});

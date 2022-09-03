WL.registerComponent('button', {
    buttonMeshObject: {type: WL.Type.Object},
    hoverMaterial: {type: WL.Type.Material},
}, {
    start: function() {
        this.mesh = this.buttonMeshObject.getComponent('mesh');
        this.defaultMaterial = this.mesh.material;

        this.target = this.object.getComponent('cursor-target');
        if(!this.target) console.error("'button' component on object", this.object.name, "missing 'cursor-target' component");
        this.target.addHoverFunction(this.onHover.bind(this));
        this.target.addUnHoverFunction(this.onUnHover.bind(this));
        this.target.addClickFunction(this.onClick.bind(this));

        this.soundClick = this.object.addComponent('howler-audio-source', {src: 'sfx/click.wav', spatial: true});
        this.soundUnClick = this.object.addComponent('howler-audio-source', {src: 'sfx/unclick.wav', spatial: true});
    },

    onHover: function() {
        this.mesh.material = this.hoverMaterial;
    },

    onClick: function() {
        this.soundClick.play();
    },

    onUnHover: function() {
        this.mesh.material = this.defaultMaterial;
    },
});

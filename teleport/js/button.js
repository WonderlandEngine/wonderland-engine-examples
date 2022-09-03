WL.registerComponent('button', {
    buttonMeshObject: {type: WL.Type.Object},
    hoverMaterial: {type: WL.Type.Material},
}, {
    start: function() {
        this.mesh = this.buttonMeshObject.getComponent('mesh');
        this.defaultMaterial = this.mesh.material;

        this.target = this.object.getComponent('cursor-target');
        this.target.addHoverFunction(this.onHover.bind(this));
        this.target.addUnHoverFunction(this.onUnHover.bind(this));
        this.target.addClickFunction(this.onClick.bind(this));

        this.soundClick = this.object.addComponent('howler-audio-source', {src: 'sfx/click.wav', spatial: true});
        this.soundUnClick = this.object.addComponent('howler-audio-source', {src: 'sfx/unclick.wav', spatial: true});
    },

    onHover: function(_, cursor) {
        this.mesh.material = this.hoverMaterial;
        if(cursor.type == 'finger-cursor') {
            this.buttonMeshObject.translate([0.0, -0.1, 0.0]);
        }
    },

    onClick: function(_, cursor) {
        this.soundClick.play();
        if(cursor.type != 'finger-cursor') {
            this.buttonMeshObject.translate([0.0, -0.1, 0.0]);
            setTimeout(() => this.buttonMeshObject.translate([0.0, 0.1, 0.0]), 100);
        }
    },

    onUnHover: function(_, cursor) {
        this.mesh.material = this.defaultMaterial;
        if(cursor.type == 'finger-cursor') {
            this.buttonMeshObject.translate([0.0, 0.1, 0.0]);
        }
    },
});

WL.registerComponent('move-comp', {
   matStart: {type: WL.Type.Material},
   matCollision: {type: WL.Type.Material},
}, {
    init: function() {
      this.collider = this.object.getComponent('collision');
      this.objects = [];
      this.check = false;
    },
    start: function() {
    },
    update: function(dt) {
      //Sphere Movement
      this.object.translate([0, 0, -2*dt]);
      if(this.object.transformWorld[6] < -2){
        this.object.translate([0, 0, 10]);

      };
      //Collision Detection & Material Change
      let collidingComps = this.collider.queryOverlaps();
      for(let i = 0; i < collidingComps.length; ++i) {
        if(!this.check) {
          let collidingMesh = collidingComps[i].object.getComponent('mesh');
          collidingMesh.material = this.matCollision;
          this.objects.push(collidingComps[i]);
          this.check = true;
        }
      }
      if(collidingComps.length == 0) {
        this.check = false;
        for (var i = 0; i < this.objects.length; i++) {
          let startMesh = this.objects[i].object.getComponent('mesh');
          startMesh.material = this.matStart;
        }
        this.objects = [];
      }
    },
});

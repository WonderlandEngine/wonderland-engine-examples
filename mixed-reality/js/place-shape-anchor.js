import { Component, MeshComponent, Property } from "@wonderlandengine/api";
import { Cursor } from "@wonderlandengine/components";
import { Anchor } from "@wonderlandengine/components";

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

const tempQuat2 = new Float32Array(8);

/**
 * place-shape-anchor
 */
export class PlaceShapeAnchor extends Component {
  static TypeName = "place-shape-anchor";
  static Properties = {
    meshCone: Property.mesh(),
    meshCube: Property.mesh(),
    meshSphere: Property.mesh(),

    materialCone: Property.material(),
    materialCube: Property.material(),
    materialSphere: Property.material(),

    hitTestObject: Property.object(),
  };
  static Dependencies = [Anchor];

  start() {
    this.meshes = [this.meshCone, this.meshCube, this.meshSphere];
    this.materials = [
      this.materialCone,
      this.materialCube,
      this.materialSphere,
    ];

    this.cursor = this.object.getComponent(Cursor);
    this.cursor.hitTestTarget.onClick.add((result, _, event) => {
      this.spawnShapeAnchor(null, event.frame ?? null, result);
    });
    this.cursor.globalTarget.onClick.add((clickedObject, _, event) => {
      this.spawnShapeAnchor(null, event.frame ?? null, null);
    });

    this.engine.onXRSessionStart.add((s) => {
      for (const uuid of this.engine.xrSession.persistentAnchors) {
        this.engine.xrSession
          .deletePersistentAnchor(uuid)
          .then(() => console.log("deleting old anchor", uuid))
          .catch(console.error);
      }

      const uuidList = getCookie("persistent-anchors").split(",");

      /* Restore all known anchors */
      for (const uuid of uuidList) {
        if (!(uuid in this.engine.xrSession.persistentAnchors)) continue;
        this.spawnShapeAnchor(uuid);
      }
    });
  }

  spawnShapeAnchor(
    uuid = null,
    frame = this.engine.xr?.frame,
    hitResult = null,
    shapeType = Math.floor(Math.random() * 3)
  ) {
    const o = this.engine.scene.addObject(this.parent);
    o.setTransformWorld(this.cursor.cursorObject.getTransformWorld(tempQuat2));
    o.setScalingWorld([0.1, 0.1, 0.1]);

    Anchor.create(o, { persist: false, uuid: uuid }, frame, hitResult).then(
      (a) => {
        const m = o.addComponent(MeshComponent, {
          material: this.materials[shapeType],
          mesh: this.meshes[shapeType],
        });
        /* Hide and show mesh if tracking is lost/restored */
        a.onTrackingLost.add(() => ((m.active = false), console.log("lost")));
        a.onTrackingFound.add(() => ((m.active = true), console.log("found")));

        const uuidList = Anchor.getAllAnchors()
          .filter((a) => a.persist)
          .map((a) => a.uuid)
          .join(",");

        setCookie("persistent-anchors", uuidList, 356);
      }
    );
  }
}

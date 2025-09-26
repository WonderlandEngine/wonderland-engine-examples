import {
    Component,
    MeshComponent,
    property,
    Mesh,
    Material,
    Object3D,
    WonderlandEngine,
} from '@wonderlandengine/api';
import {Cursor} from '@wonderlandengine/components';
import {Anchor} from '@wonderlandengine/components';

/**
 * Stores a cookie value for the given number of days.
 * @param cname Name of the cookie key.
 * @param cvalue Value to be stored.
 * @param exdays Lifetime in days before expiration.
 */
function setCookie(cname: string, cvalue: string, exdays: number) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

/**
 * Retrieves the cookie value identified by `cname`.
 * @param cname Name of the cookie key to look up.
 * @returns The cookie value or an empty string if missing.
 */
function getCookie(cname: string) {
    let name = cname + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

/** Reusable quaternion buffer for world transform extraction. */
const tempQuat2 = new Float32Array(8);

/**
 * Component that spawns persistent mesh anchors via cursor hit-test interactions.
 */
export class PlaceShapeAnchor extends Component {
    static TypeName = 'place-shape-anchor';

    /**
     * Ensures the Anchor component is available before use.
     */
    static onRegister(engine: WonderlandEngine) {
        if (!engine.isRegistered(Anchor)) {
            engine.registerComponent(Anchor);
        }
    }

    @property.mesh()
    declare meshCone: Mesh;
    @property.mesh()
    declare meshCube: Mesh;
    @property.mesh()
    declare meshSphere: Mesh;
    @property.material()
    declare materialCone: Material;
    @property.material()
    declare materialCube: Material;
    @property.material()
    declare materialSphere: Material;
    @property.object()
    declare hitTestObject: Object3D;
    static Dependencies = [Anchor];
    private declare meshes: Mesh[];
    private declare materials: Material[];
    private declare cursor: Cursor;

    start() {
        this.meshes = [this.meshCone, this.meshCube, this.meshSphere];
        this.materials = [this.materialCone, this.materialCube, this.materialSphere];

        this.cursor = this.object.getComponent(Cursor)!;
    }

    onActivate(): void {
        this.cursor.hitTestTarget.onClick.add(this.targetHit);
        this.cursor.globalTarget.onClick.add(this.globalTargetHit);
        this.engine.onXRSessionStart.once(this.sessionStart);
    }

    onDeactivate(): void {
        this.cursor.hitTestTarget.onClick.remove(this.targetHit);
        this.cursor.globalTarget.onClick.remove(this.globalTargetHit);
    }

    /**
     * Spawns a shape anchor at the cursor position or provided hit-test result.
     * @param uuid Optional anchor identifier for persistence restoration.
     * @param frame XR frame to use when creating the anchor.
     * @param hitResult Hit-test result that provides placement pose.
     * @param shapeType Index of the mesh/material pair to instantiate.
     */
    spawnShapeAnchor(
        uuid: string | null = null,
        frame = this.engine.xr?.frame,
        hitResult: XRHitTestResult | null = null,
        shapeType: number = Math.floor(Math.random() * 3)
    ) {
        const o = this.engine.scene.addObject(this.object.parent);
        o.setTransformWorld(this.cursor.cursorObject!.getTransformWorld(tempQuat2));
        o.setScalingWorld([0.1, 0.1, 0.1]);
        //@ts-ignore Type issue with Anchor.create
        Anchor.create(o, {persist: false, uuid: uuid}, frame, hitResult).then((a) => {
            const m = o.addComponent(MeshComponent, {
                material: this.materials[shapeType],
                mesh: this.meshes[shapeType],
            });
            const anchor = a as unknown as Anchor;
            /* Hide and show mesh if tracking is lost/restored */
            anchor.onTrackingLost.add(() => ((m.active = false), console.log('lost')));
            anchor.onTrackingFound.add(() => ((m.active = true), console.log('found')));

            const uuidList = Anchor.getAllAnchors()
                .filter((a) => a.persist)
                .map((a) => a.uuid)
                .join(',');

            setCookie('persistent-anchors', uuidList, 356);
        });
    }

    /**
     * Clears stale persistent anchors and restores those remembered in cookies.
     */
    private sessionStart = (session: XRSession, sessionMode: XRSessionMode) => {
        if (!this.engine.xr) return;
        //@ts-ignore persistentAnchors is not yet in the types
        for (const uuid of this.engine.xr.session.persistentAnchors) {
            this.engine.xr.session
                //@ts-ignore deletePersistentAnchor is not yet in the types
                .deletePersistentAnchor(uuid)
                .then(() => console.log('deleting old anchor', uuid))
                .catch(console.error);
        }

        const uuidList = getCookie('persistent-anchors').split(',');

        /* Restore all known anchors */
        for (const uuid of uuidList) {
            //@ts-ignore persistentAnchors is not yet in the types
            if (!~this.engine.xr.session.persistentAnchors.indexOf(uuid)) continue;
            this.spawnShapeAnchor(uuid);
        }
    };

    /**
     * Places an anchor at the AR hit-test result provided by the cursor.
     */
    private targetHit = (result: XRHitTestResult | null, _: any, event: any) => {
        this.spawnShapeAnchor(null, event.frame ?? null, result);
    };

    /**
     * Places an anchor at the cursor position when no hit-test target is used.
     */
    private globalTargetHit = (clickedObject: Object3D, _: any, event: any) => {
        this.spawnShapeAnchor(null, event.frame ?? null, null);
    };
}

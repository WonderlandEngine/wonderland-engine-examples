declare global {
    interface XRSession {
        persistentAnchors: string[];
        deletePersistentAnchor(uuid: string): Promise<void>;
    }

    interface XRHitTestResult {
        createAnchor?: () => Promise<XRAnchor>;
    }
}

export {};

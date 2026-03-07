import {Component} from '@wonderlandengine/api';
import {property} from '@wonderlandengine/api/decorators.js';
import {ImageTexture, VideoTexture} from '@wonderlandengine/components';

/**
 * SkyTextureLoader
 *
 * - Properties:
 *   - url: string URL to load (image or video)
 *   - skyMaterial: material to assign to the created texture component
 *
 * - Behavior:
 *   - On start() calls loadUrl()
 *   - loadUrl() is public and can be called later from other components
 *   - If URL is an image => ensures an ImageTexture component exists, sets url + material, starts it
 *   - If URL is a video => ensures a VideoTexture component exists, sets url + autoplay/muted/loop, sets material, starts it
 */
export class MediaTextureLoader extends Component {
    static TypeName = 'mediaTextureLoader';

    // URL to load (image or video)
    @property.string(
        'https://media.discordapp.net/attachments/943037933118701620/1421042478395686943/AJfQ9KQQE5AW-e9NNLtJTXVAQjMkDCPEmziYHhHotW083unjsMu5o-a_FiITTBs4tpSZLfJ4d29H1ohgz7HcXFzvnk-2oEoXLP4XgTefCBf98O0U4lLvDEe5sL1GR_uHue3i5nybR9fN9sL4rfY3w9QxWm-RJ3m1oVMe7Sb0lEbQD_3JlZpIs1024.png?ex=68d79870&is=68d646f0&hm=92d5a65af02bf4da2a7def9f44868064c71ef301c35374f4f7f462aad8f65e0b&=&format=webp&quality=lossless&width=1160&height=1160'
    )
    url!: string;

    // The material to use as the sky material (drag your textured sky material in editor)
    // NOTE: the exact decorator may vary by engine version; try property.material(null) if your build supports it.
    @property.material(null)
    texturedMaterial!: any;

    static onRegister(engine) {
        engine.registerComponent(ImageTexture);
        engine.registerComponent(VideoTexture);
    }

    start() {
        // Call loadUrl on start; swallow errors to avoid uncaught promise rejections
        this.loadUrl().catch((e) => {
            console.warn('SkyTextureLoader: loadUrl failed on start:', e);
        });
    }

    // Public: can be called from other components at any time.
    async loadUrl(url?: string) {
        if (url !== undefined) this.url = url;
        if (!this.url) {
            console.warn('SkyTextureLoader: no url provided');
            return;
        }

        // Detect whether the URL points to an image or a video
        const kind = await this._detectMediaKind(this.url);

        // Try to find existing components
        const existingImageComp = this.object.getComponent(ImageTexture);
        const existingVideoComp = this.object.getComponent(VideoTexture);

        if (kind === 'image') {
            // If a video component exists, try to stop/disable it to avoid conflicts
            if (existingVideoComp) {
                try {
                    existingVideoComp.active = false;
                    existingVideoComp.video.pause();
                } catch (e) {
                    // best-effort only
                    console.warn('SkyTextureLoader: failed to disable video comp', e);
                }
            }

            let imgComp: ImageTexture;

            if (existingImageComp) {
                // Set properties and material
                existingImageComp.url = this.url;
                existingImageComp.material = this.texturedMaterial;
                imgComp = existingImageComp;
            }
            // If no existing image component, create one and set properties
            else {
                imgComp = this.object.addComponent(ImageTexture, {
                    url: this.url,
                    material: this.texturedMaterial,
                });
            }

            // Start the component (ImageTexture typically needs initialization)
            imgComp.start();
            imgComp.active = true;
            return;
        }

        if (kind === 'video') {
            // If an image component exists, disable it to avoid conflicts
            if (existingImageComp) {
                try {
                    existingImageComp.active = false;
                } catch (e) {
                    console.warn('SkyTextureLoader: failed to disable image comp', e);
                }
            }

            let vidComp: VideoTexture;

            if (existingVideoComp) {
                vidComp;
                // Configure video properties (as requested)
                vidComp.url = this.url;
                // many video components expose autoplay/muted/loop — set them if present
                vidComp.autoplay = true;
                vidComp.muted = false;
                vidComp.loop = true;
                vidComp.material = this.texturedMaterial;
            } else {
                vidComp = this.object.addComponent(VideoTexture, {
                    url: this.url,
                    autoplay: true,
                    muted: false,
                    loop: true,
                    material: this.texturedMaterial,
                });
            }

            // Start the component (VideoTexture needs init/play)
            vidComp.start();

            vidComp.active = true;
            return;
        }

        console.warn('SkyTextureLoader: could not determine media kind for url:', this.url);
    }

    // Helper: detect media kind using extension + HEAD fetch fallback
    private async _detectMediaKind(url: string): Promise<'image' | 'video' | 'unknown'> {
        // Quick extension-based detection
        const cleanUrl = url.split('?')[0].split('#')[0].toLowerCase();
        const ext = cleanUrl.split('.').pop() || '';

        const videoExts = ['mp4', 'webm', 'ogg', 'mov', 'm4v'];
        const imageExts = [
            'png',
            'jpg',
            'jpeg',
            'gif',
            'webp',
            'bmp',
            'svg',
            'tiff',
            'ico',
            'heic',
        ];

        if (videoExts.includes(ext)) return 'video';
        if (imageExts.includes(ext)) return 'image';

        // If extension is not decisive, try a HEAD request to read content-type
        try {
            const resp = await fetch(url, {method: 'HEAD'});
            if (resp && resp.headers) {
                const ct = resp.headers.get('content-type') || '';
                if (ct.startsWith('video/')) return 'video';
                if (ct.startsWith('image/')) return 'image';
            }
        } catch (e) {
            console.warn('SkyTextureLoader: HEAD fetch failed', e);
        }

        // Fallback: 'image' is a safe default for sky usage, but return unknown
        return 'image';
    }
}

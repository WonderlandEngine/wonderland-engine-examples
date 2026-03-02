import { Component, Pipeline, TextureManager } from "@wonderlandengine/api";

const TextureUnit = 6;

export class CustomWebGL extends Component {
    static TypeName = 'custom-webgl';

    url = 'noise.png';

    _gl: WebGL2RenderingContext | null = null;
    _texture: WebGLTexture | null = null;

    _pipeline: Pipeline;
    _ready = false;

    _draw = () => {
        const gl = this._gl;

        const prevActive = gl.getParameter(gl.ACTIVE_TEXTURE);
        gl.activeTexture(WebGL2RenderingContext.TEXTURE0 + TextureUnit);
        gl.bindTexture(WebGL2RenderingContext.TEXTURE_2D, this._texture);

        if(!this._ready) {
            const shader = this._pipeline.webglProgram;
            gl.useProgram(shader);
            const loc = gl.getUniformLocation(shader, 'customTexture');
            gl.uniform1i(loc, TextureUnit);
            this._ready = true;
        }

        /* This is required to avoid breaking the current active state in the engine */
        gl.activeTexture(prevActive);
    };

    async init() {
        this._gl = this.engine.canvas.getContext('webgl2')!;
        this._texture = this._gl.createTexture();

        const img = await TextureManager.fetchImage(this.url, 'anonymous');

        const gl = this._gl!;
        gl.bindTexture(gl.TEXTURE_2D, this._texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }

    onActivate(): void {
        this._pipeline = this.engine.pipelines.findByName('CustomShader');
        this._pipeline.onPreRender.add(this._draw);
    }

    onDeactivate(): void {
        if (!this._pipeline) return;
        this._pipeline.onPreRender.remove(this._draw);
    }

    onDestroy(): void {
        this._gl.deleteTexture(this._texture);
    }
}
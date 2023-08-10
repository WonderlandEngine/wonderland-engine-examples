#include "lib/Compatibility.frag"

#define FEATURE_TEXTURED

#define USE_NORMAL
#define USE_MATERIAL_ID
#ifdef TEXTURED
#define USE_TEXTURE_COORDS
#endif

#ifdef VERTEX_COLORS
#define USE_COLOR
#endif

#if NUM_LIGHTS > 0
#define USE_POSITION_WORLD
#endif

#if NUM_SHADOWS > 0
#define USE_POSITION_VIEW
#endif

#include "lib/Inputs.frag"
#include "lib/Uniforms.glsl"

#if NUM_LIGHTS > 0
#include "lib/Quaternion.glsl"
#endif

#ifdef TEXTURED
#include "lib/Textures.frag"
#endif
#include "lib/Materials.frag"

struct Material {
    lowp vec4 textColor;
#ifdef TEXTURED
    mediump uint fontTexture;
#endif
};

Material decodeMaterial(uint matIndex) {
    {{decoder}}
    return mat;
}

mediump float phongDiffuseBrdf(mediump vec3 lightDir, mediump vec3 normal) {
    return max(0.0, dot(lightDir, normal));
}

/**
 * Simple shader for rendering text in Playbook exports
 */
void main() {
    #ifdef TEXTURED
    alphaMask(fragMaterialId, fragTextureCoords);
    #endif

    Material mat = decodeMaterial(fragMaterialId);
    outColor.rgb = mat.textColor.rgb;
#ifdef TEXTURED
    outColor.a = smoothstep(0.48, 0.52, textureAtlas(mat.fontTexture, fragTextureCoords).a);
#endif
}

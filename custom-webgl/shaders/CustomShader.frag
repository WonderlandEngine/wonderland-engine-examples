#include "lib/Compatibility.glsl"

#define USE_TEXTURE_COORDS /* provides fragTextureCoords */
#define USE_MATERIAL_ID /* provides fragMaterialId */

#include "lib/Inputs.glsl"
#include "lib/Packing.glsl"
#include "lib/Materials.glsl"

uniform sampler2D customTexture; /* Binding 6 */

/* This structure is essential. Wonderland Editor will look
 * for it and parse the material properties to generate UI
 * from it.
 * If a uint property ends with "*Texture", it will be regarded
 * as a texture, only 2D textures are currently supported. */
struct Material {
    lowp vec4 color;
};

/* Wonderland Engine does some material packing magic and
 * automatically generates the matching unpacking code
 * if it finds this snippet in a shader. */
Material decodeMaterial(uint matIndex) {
    {{decoder}}
    return mat;
}

void main() {
    Material mat = decodeMaterial(fragMaterialId);
    vec4 tex = textureLod(customTexture, fragTextureCoords, 0.0);
    outColor = tex * mat.color;
    outColor.a = length(tex.rgb);
}

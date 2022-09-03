#include "lib/Compatibility.frag"

/* To read vertex shader output, declare the desired values
 * here before including Inputs.frag. Only request the data
 * you really need for improved performance.
 * For a list of all values, check Inputs.frag. */

#define TEXTURED
#define USE_MATERIAL_ID
#define USE_NORMAL /* provides fragNormal */
#define USE_VIEW_POSITION /* provides viewPositionWorld */
#define USE_POSITION_VIEW /* provides viewPositionWorld */
#define USE_POSITION_WORLD /* provides fragPositionWorld */

#include "lib/Inputs.frag"
#include "lib/Textures.frag"
#include "lib/Materials.frag"

/* This structure is essential. Wonderland Editor will look
 * for it and parse the material properties to generate UI
 * from it.
 * If a uint property ends with "*Texture", it will be regarded
 * as a texture, only 2D textures are currently supported. */
struct Material {
    mediump uint texture;
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
    mediump vec3 normal = normalize(fragNormal);
    mediump vec3 view = - normalize(fragPositionWorld - viewPositionWorld);
    mediump vec3 viewDir = normalize( -view );
    mediump vec3 x = normalize(vec3(viewDir.z, 0.0, -viewDir.x));
    mediump vec3 y = cross(viewDir, x);
    mediump vec2 uv = vec2(dot(x, normal), dot(y, normal)) * 0.499 + 0.5;
    outColor = textureAtlas(mat.texture, uv);
}

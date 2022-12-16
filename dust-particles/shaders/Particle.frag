#include "lib/Compatibility.frag"

/* To read vertex shader output, declare the desired values
 * here before including Inputs.frag. Only request the data
 * you really need for improved performance.
 * For a list of all values, check Inputs.frag. */

#define TEXTURED
#define USE_MATERIAL_ID
#define USE_TEXTURE_COORDS /* provides fragTextureCoords */

#include "lib/Inputs.frag"
#include "lib/Textures.frag"
#include "lib/Materials.frag"

struct Material {
    mediump float intensity;
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
    float distFromCenter = length(fragTextureCoords - vec2(0.5));
    float factor = smoothstep(1.0, 0.0, distFromCenter*2.0);
    outColor = vec4(1.0, 1.0, 1.0, factor*0.5*mat.intensity);
}

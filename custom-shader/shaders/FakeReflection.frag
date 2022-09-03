#include "lib/Compatibility.frag"

#define USE_VIEW_POSITION
#define USE_LIGHTS

#define FEATURE_WITH_FOG
#define FEATURE_TEXTURED
#define FEATURE_ALPHA
#define FEATURE_ALPHA_MASKED
#define FEATURE_NORMAL_MAPPING
#define FEATURE_VERTEX_COLORS
#define FEATURE_WITH_EMISSIVE

#ifdef NORMAL_MAPPING
#define TEXTURED
#endif

#define USE_POSITION_WORLD
#ifdef TEXTURED
#define USE_TEXTURE_COORDS
#endif
#ifdef VERTEX_COLORS
#define USE_COLOR
#endif
#ifdef NORMAL_MAPPING
#define USE_TANGENT
#endif
#define USE_MATERIAL_ID
#define USE_NORMAL
#define USE_POSITION_WORLD

#include "lib/Inputs.frag"

#if NUM_LIGHTS > 0
#include "lib/Lights.frag"
#endif

#ifdef TEXTURED
#include "lib/Textures.frag"
#endif

#include "lib/Materials.frag"

struct Material {
    lowp vec4 ambientColor;
    lowp vec4 diffuseColor;
    lowp vec4 specularColor;
#ifdef WITH_EMISSIVE
    lowp vec4 emissiveColor;
#endif

#ifdef WITH_FOG
    lowp vec4 fogColor;
#endif

    lowp uint shininess;
#ifdef TEXTURED
    mediump uint diffuseTexture;
#ifdef NORMAL_MAPPING
    lowp uint normalTexture;
#endif
#endif
    lowp float reflectivity;
    mediump uint reflectionTexture;
    lowp float ambientFactor;
};

Material decodeMaterial(uint matIndex) {
    {{decoder}}
    return mat;
}

#ifdef WITH_FOG
float fogFactorExp2(float dist, float density) {
    const float LOG2 = -1.442695;
    float d = density * dist;
    return 1.0 - clamp(exp2(d*d*LOG2), 0.0, 1.0);
}
#endif

#ifdef TEXTURED
lowp vec4 sampleEquirect(lowp uint texture, vec3 direction) {
    const vec2 invAtan = vec2(0.1591, 0.3183);

    vec2 uv = vec2(atan(direction.z, direction.x), asin(direction.y));
    return textureAtlas(texture, uv*invAtan + 0.5);
}
#endif

mediump float phongDiffuseBrdf(mediump vec3 lightDir, mediump vec3 normal) {
    return max(0.0, dot(lightDir, normal));
}

mediump float phongSpecularBrdf(mediump vec3 lightDir, mediump vec3 normal, mediump vec3 viewDir, mediump float shininess) {
    mediump vec3 reflection = reflect(lightDir, normal);
    return pow(max(dot(viewDir, reflection), 0.0), shininess);
}

void main() {
#ifndef PRE_Z_PASS
#ifdef TEXTURED
    /* PRE_Z_PASS was not used, we need to alpha mask ourselves! */
    alphaMask(fragMaterialId, fragTextureCoords);
#endif
#endif

    Material mat = decodeMaterial(fragMaterialId);

#ifdef TEXTURED
    lowp vec4 finalDiffuseColor =
        #ifdef VERTEX_COLORS
        vec4(fragColor.rgb, 1.0) +
        #endif
        textureAtlas(mat.diffuseTexture, fragTextureCoords);
#else
    lowp vec4 finalDiffuseColor =
        #ifdef VERTEX_COLORS
        vec4(fragColor.rgb, 1.0) +
        #endif
        mat.diffuseColor;
#endif

    lowp vec4 finalAmbientColor =
        mat.ambientColor + finalDiffuseColor*mat.ambientFactor;
    lowp vec4 finalSpecularColor = mat.specularColor;
    finalSpecularColor.rgb *= finalSpecularColor.a;

    /* Ambient color */
    outColor.rgb = finalAmbientColor.rgb;
    outColor.a = finalDiffuseColor.a;

    mediump float shininess = float(mat.shininess);

    /* Normal */
    mediump vec3 normal;
    #ifdef NORMAL_MAPPING
    if(mat.normalTexture > 0u) {
        mediump vec3 normalizedNormal = normalize(fragNormal);
        mediump vec3 normalizedTangent = normalize(fragTangent.xyz);
        mediump mat3 tbn = mat3(
            normalizedTangent,
            normalize(cross(normalizedNormal, normalizedTangent)*fragTangent.w),
            normalizedNormal);
        normal = tbn*(normalize((textureAtlas(mat.normalTexture, fragTextureCoords).rgb*2.0 - vec3(1.0))));
    } else
    #endif
    {
        normal = normalize(fragNormal);
    }

    #if NUM_LIGHTS > 0
    mediump vec3 viewDir = normalize(fragPositionWorld - viewPositionWorld);
    bool useSpecular = finalSpecularColor.a != 0.0 && shininess != 0.0;

    lowp uint i = 0u;
    for(; i < numPointLights; ++i) {
        lowp vec4 lightData = lightColors[i];
        /* dot product of mediump vec3 can be NaN for distances > 128 */
        highp vec3 lightPos = lightPositionsWorld[i];
        highp vec3 lightDirAccurate = lightPos - fragPositionWorld;
        mediump float distSq = dot(lightDirAccurate, lightDirAccurate);
        mediump float attenuation = 1.0/(1.0 + lightData.a*distSq);

        if(attenuation > 0.001) {
            mediump vec3 lightDir = lightDirAccurate;
            lightDir *= inversesqrt(distSq);

            /* Add diffuse color */
            mediump vec3 value = finalDiffuseColor.rgb*
                phongDiffuseBrdf(lightDir, normal);
            /* Add specular color */
            if(useSpecular) {
                value += finalSpecularColor.rgb*
                    phongSpecularBrdf(lightDir, normal, viewDir, shininess);
            }
            outColor.rgb += attenuation*value*lightData.rgb;
        }
    }

    lowp uint endSunLights = numPointLights + numSunLights;
    for(; i < endSunLights; ++i) {
        lowp vec3 lightColor = lightColors[i].rgb;
        mediump vec3 lightDir = lightPositionsWorld[i];

        /* Add diffuse color */
        mediump vec3 value = finalDiffuseColor.rgb*
            phongDiffuseBrdf(lightDir, normal);
        /* Add specular color */
        if(useSpecular) {
            value += finalSpecularColor.rgb*
                phongSpecularBrdf(lightDir, normal, viewDir, shininess);
        }
        outColor.rgb += value*lightColor;
    }
    #endif

    #ifdef WITH_EMISSIVE
    outColor.rgb += mat.emissiveColor.a*mat.emissiveColor.rgb;
    #endif

    #ifdef WITH_FOG
    float dist = gl_FragCoord.z/gl_FragCoord.w;
    float fogFactor = fogFactorExp2(dist, mat.fogColor.a*0.2);
    outColor.rgb = mix(outColor.xyz, mat.fogColor.rgb, fogFactor);
    #endif

    outColor = mix(sampleEquirect(mat.reflectionTexture, normalize(reflect(viewDir, normal))), outColor, mat.reflectivity);
}

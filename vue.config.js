const {defineConfig} = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    // Add rule for .glsl, .vs, .fs, .vert, and .frag files
    config.module
        .rule('raws')
        .test(/\.(glsl|vs|fs|vert|frag|mtl|glb)$/)
        .use('raw-loader')
        .loader('raw-loader')
        .end();

    config.module
        .rule('3dmodels')
        .test(/\.(fbx|FBX|obj|OBJ)$/)
        .use('file-loader')
        .loader('file-loader')
        .end();
  }
});

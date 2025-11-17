const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);

// Remove .svg from assetExts
defaultConfig.resolver.assetExts =
  defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg');

// Add .svg to sourceExts
defaultConfig.resolver.sourceExts.push('svg');

// Use the SVG transformer
defaultConfig.transformer = {
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
};

module.exports = mergeConfig(defaultConfig, {});

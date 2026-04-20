module.exports = function (api) {
  api.cache(true);
  // `nativewind/babel` resolves to `react-native-css-interop/babel`, which returns
  // `{ plugins: [...] }` — that shape is *not* a valid Babel plugin entry; spread it here.
  const nativewind = require('nativewind/babel');
  const { plugins: nativewindPlugins = [] } =
    typeof nativewind === 'function' ? nativewind() : nativewind;

  return {
    presets: ['babel-preset-expo'],
    plugins: [...nativewindPlugins],
  };
};

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins:[
    ['@babel/plugin-transform-modules-commonjs', { allowTopLevelThis: true }],
    ]
  };
};

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['module-resolver',
    {
      root: ['./'],
      extensions: [
        '.js',
        '.ts',
        '.tsx',
        '.ios.js',
        'ios.tsx',
        '.android.js',
        'android.tsx',
        '.json',
      ],
      alias: {
        '@Pokemon': './src',
      },
    }]
  ]
};

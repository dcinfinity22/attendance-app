module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // other plugins you may have...

    // 👇 MUST be last
    'react-native-worklets/plugin',
  ],
};

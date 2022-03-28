const ubuilderPlugin = require('./stylePlugin');

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts}',
  ],
  plugins: [
    ubuilderPlugin,
  ],
};

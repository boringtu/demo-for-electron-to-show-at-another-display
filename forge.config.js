const path = require('path');
module.exports = {
  packagerConfig: {
    asar: true,
    icon: path.join(__dirname, 'public/favicon'),
    // extraResource: [
    //   path.join(__dirname, 'public/favicon.ico'),
    // ],
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        iconUrl: path.join(__dirname, 'public/favicon.ico'),
        setupIcon: path.join(__dirname, 'public/favicon.ico'),
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
  ],
};

const { dependencies } = require("./package.json");

module.exports = {
  name: "adminconsole_ra",
  exposes: {
    "./App": "./src/App",
  },
  remotes: {
    configui: `configui@[window.appModules.configui.url]/moduleEntry.js`,
  },
  filename: "moduleEntry.js",
  shared: {
    ...dependencies,
    react: {
      singleton: true,
      requiredVersion: dependencies["react"],
    },
    "react-dom": {
      singleton: true,
      requiredVersion: dependencies["react-dom"],
    },
  },
};

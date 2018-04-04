# webpack-anybar-plugin

> A webpack AnyBar menubar status indicator

[![npm version](https://img.shields.io/npm/v/webpack-anybar-plugin.svg?style=flat-square)](https://www.npmjs.com/package/webpack-anybar-plugin)

Use version 4 of this project for the webpack tapable plugin API (introduced in webpack 4). Use version 3 for the older webpack plugin syntax.

## Install

Install [AnyBar](https://github.com/tonsky/AnyBar), an OS X menubar status indicator, or any of its forks such as [this one](https://github.com/sfsam/AnyBar) which adds the ability to define custom colors and display text.

```
yarn add --dev webpack-anybar-plugin
```

### Usage

```
const WebpackAnybarPlugin = require('webpack-anybar-plugin');

module.exports = {
    // webpack configuration ...
    plugins: [
        new WebpackAnybarPlugin({
            applicationPath: '<absolute path to AnyBar>',  // default: '/Applications/AnyBar.app'
            autoStart: <boolean>,                          // default: true
            port: <port number>,                           // default: 1738
            status: {
                error: '<color or function(stats)>',       // default: 'red'
                pending: '<color or function(compiler)>',  // default: 'orange'
                success: '<color or function(stats)>'      // default: 'green'
            }
        })
    ]
}
```

It's also possible to specify options in `anybar.config.js`. Adding `anybar.config.js` to `.gitignore` allows different team members to use different options. Options defined in `anybar.config.js` takes precedence to options defined in `webpack.config.js`.

```
module.exports = {
    applicationPath: '<absolute path to AnyBar>',  // default: '/Applications/AnyBar.app'
    autoStart: <boolean>,                          // default: true
    port: <port number>,                           // default: 1738
    status: {
        error: '<color or function(stats)>',       // default: 'red'
        pending: '<color or function(compiler)>',  // default: 'orange'
        success: '<color or function(stats)>'      // default: 'green'
    }
};
```

## License

MIT

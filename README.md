# webpack-anybar-plugin

> A webpack AnyBar menubar status indicator

[![npm version](https://img.shields.io/npm/v/webpack-anybar-plugin.svg?style=flat-square)](https://www.npmjs.com/package/webpack-anybar-plugin)

## Install

Install [AnyBar](https://github.com/tonsky/AnyBar), an OS X menubar status indicator, or any of its forks such as [this one](https://github.com/sfsam/AnyBar) which adds the ability to define custom colors and display text.

```
npm install --save-dev webpack-anybar-plugin
```

### Usage

```
var WebpackAnybarPlugin = require('webpack-anybar-plugin').default;

module.exports = {
    // webpack configuration ...
    plugins: [
        new WebpackAnybarPlugin({
            port: <port number>,                           // default: AnyBar's default port
            status: {
                error: '<color or function(stats)>',       // default: 'red'
                pending: '<color or function(compiler)>',  // default: 'orange'
                success: '<color or function(stats)>'      // default: 'green'
            },
        })
    ]
}
```

## License

MIT

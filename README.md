# webpack-anybar-plugin

> A webpack AnyBar watch notifier

[![npm version](https://img.shields.io/npm/v/webpack-anybar-plugin.svg?style=flat-square)](https://www.npmjs.com/package/webpack-anybar-plugin)

## Install

Install the following [fork](https://github.com/sfsam/AnyBar) of [AnyBar](https://github.com/tonsky/AnyBar).

```
npm install --save-dev webpack-anybar-plugin
```

### Usage

```
plugins: [
    new WebpackAnybarPlugin({
        colors: {
            error: '<color name or hex code>',      // default: red
            running: '<color name or hex code>',    // default: orange
            success: '<color name or hex code>'     // default: green
        },
        port: <port number>,                        // default: anybar's default port
        text: '<text>'                              // default: null
    })
]
```

## License

MIT

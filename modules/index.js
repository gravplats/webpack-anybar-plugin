const anybar = require('anybar');
const defaults = require('lodash.defaultsdeep');
const path = require('path');


const DefaultOptions = {
    port: null,
    status: {
        error: 'red',
        pending: 'orange',
        success: 'green'
    }
};

function WebpackAnybarPlugin(options) {
    let config;

    try {
        config = require(path.resolve(process.cwd(), 'anybar.config.js'));
    } catch (e) {
        config = {};
    }

    this.options = defaults({}, config, options, DefaultOptions);

    const { port } = this.options;
    this.broadcast = (status, info) => {
        return anybar(typeof status === 'function' ? status(info) : status, { port });
    };
}

WebpackAnybarPlugin.prototype.apply = function(compiler) {
    const { status } = this.options;
    compiler.plugin('watch-run', (compiler, callback) => {
        this.broadcast(status.pending, compiler);
        callback();
    });

    compiler.plugin('done', (stats) => {
        this.broadcast(stats.hasErrors() ? status.error : status.success, stats);
    });
};

module.exports = WebpackAnybarPlugin;

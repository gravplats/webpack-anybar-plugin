import anybar from 'anybar';
import defaults from 'lodash.defaultsdeep';


const DefaultOptions = {
    port: null,
    status: {
        error: 'red',
        pending: 'orange',
        success: 'green'
    }
};

function WebpackAnybarPlugin(options) {
    this.options = defaults({}, options, DefaultOptions);

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

export default WebpackAnybarPlugin;

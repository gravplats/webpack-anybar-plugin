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
    this.broadcast = (status) => {
        return anybar(typeof status === 'function' ? status() : status, { port });
    };
}

WebpackAnybarPlugin.prototype.apply = function(compiler) {
    const { status } = this.options;
    compiler.plugin('watch-run', (watching, callback) => {
        this.broadcast(status.pending);
        callback();
    });

    compiler.plugin('done', (stats) => {
        this.broadcast(stats.hasErrors() ? status.error : status.success);
    });
};

export default WebpackAnybarPlugin;

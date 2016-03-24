import anybar from 'anybar';
import defaults from 'lodash.defaultsdeep';


const DefaultOptions = {
    colors: {
        error: 'red',
        running: 'orange',
        success: 'green'
    },
    port: null,
    text: null
};

function WebpackAnybarPlugin(options) {
    this.options = defaults({}, options, DefaultOptions);

    const { port, text } = this.options;
    this.broadcast = (color) => {
        const status = text !== null
            ? color + ' ' + text
            : color;

        return anybar(status, { port });
    };
}

WebpackAnybarPlugin.prototype.apply = function(compiler) {
    const { colors } = this.options;
    compiler.plugin('watch-run', (watching, callback) => {
        this.broadcast(colors.running);
        callback();
    });

    compiler.plugin('done', (stats) => {
        this.broadcast(stats.hasErrors() ? colors.error : colors.success);
    });
};

export default WebpackAnybarPlugin;

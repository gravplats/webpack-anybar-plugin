const anybar = require('anybar');
const chalk = require('chalk');
const cp = require('child_process');
const defaults = require('lodash.defaultsdeep');
const fs = require('fs');
const path = require('path');


const configFilename = 'anybar.config.js';

const defaultOptions = {
    applicationPath: '/Applications/AnyBar.app',
    autoStart: true,
    port: 1738,
    status: {
        error: 'red',
        pending: 'orange',
        success: 'green'
    }
};

function getAnyBarConfig() {
    try {
        return fs.existsSync(configFilename)
            ? require(path.resolve(process.cwd(), configFilename))
            : {};
    } catch (e) {
        return {};
    }
}

function WebpackAnybarPlugin(options) {
    this.options = defaults({}, getAnyBarConfig(), options, defaultOptions);
}

WebpackAnybarPlugin.prototype.apply = function(compiler) {
    this.checkForAnyBarApp();

    compiler.plugin('watch-run', (compiler, callback) => {
        const { status } = this.options;
        this.broadcast(status.pending, compiler);
        callback();
    });

    compiler.plugin('done', (stats) => {
        const { status } = this.options;
        this.broadcast(stats.hasErrors() ? status.error : status.success, stats);
    });
};

WebpackAnybarPlugin.prototype.broadcast = function(status, info) {
    const { port } = this.options;
    return anybar(typeof status === 'function' ? status(info) : status, { port });
};

WebpackAnybarPlugin.prototype.checkForAnyBarApp = function() {
    const { applicationPath, autoStart, port } = this.options;
    /* eslint-disable no-console */
    if (autoStart) {
        try {
            // is AnyBar running and listening to the specified port?
            cp.exec(`lsof -ti udp:${port}`, function lsofCallback(err) {
                // 'lsof' returns an error if it cannot find what it's looking for.
                if (err !== null) {
                    if (fs.existsSync(applicationPath)) {
                        return cp.exec(`ANYBAR_PORT=${port} open -na ${applicationPath}`, function openAnyBarCallback(err) {
                            if (err !== null) {
                                return;
                            }

                            console.log(`webpack-anybar-plugin: Starting AnyBar on port ${port}`);
                        });
                    } else {
                        console.log(
                            chalk.cyan(
                                `webpack-anybar-plugin: Unable to find AnyBar application at "${applicationPath}".` +
                                ' Download it from "https://github.com/sfsam/AnyBar" for a better webpack experience. ' +
                                'See "https://github.com/mrydengren/webpack-anybar-plugin" for configuration options.'
                            )
                        );
                    }
                } else {
                    console.log(`webpack-anybar-plugin: AnyBar is listening on port ${port}`);
                }
            });
        } catch (e) {} // eslint-disable-line no-empty
    }
    /* eslint-enable no-console */
};

module.exports = WebpackAnybarPlugin;

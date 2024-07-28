// webpack.config.js
const path = require('path');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const { exec } = require('child_process');

module.exports = {
    mode: 'production',
    entry: {
        plugin: './src/main.js',
        popup: './src-popup/popup.js'
    },
    output: {
        filename: '[name].unified-script.js',
        path: path.resolve(__dirname, 'build'),
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        {
            apply: (compiler) => {
                compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
                    exec('./update-plugin.sh true', (err, stdout, stderr) => {
                        if (err) {
                            console.error(`Error executing script: ${err}`);
                            return;
                        }
                        console.log(stdout);
                        console.error(stderr);
                    });
                });
            }
        }
    ],
    watchOptions: {
        ignored: [
            "/node_modules/",
            "/dist/",
            "/build/"
        ]
    }
};

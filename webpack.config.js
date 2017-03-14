let webpack = require('webpack');
let webpackMerge = require('webpack-merge');
let path = require('path');
let env = 'dev';

switch (process.env.NODE_ENV) {
    case 'prod':
    case 'production':
        env = 'prod';

        break;

    case 'test':
        env = 'test';

        break;
}

module.exports = webpackMerge(require(path.join(
    __dirname,
    'config',
    'webpack.' + env + '.js'
)), {
    entry: {
        api: ['./src/app/mylib.ts']
    },
    output: {
        path: path.resolve('') + "/dist",
        library: ['mylib', '[name]'],
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    resolve: {
        extensions: ['.js', '.ts'],
        modules: [
            path.join(__dirname, 'src'),
            'node_modules'
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            Promise: 'bluebird'
        }),

        new webpack.NormalModuleReplacementPlugin(/es6-promise$/, 'bluebird'),
    ]
});

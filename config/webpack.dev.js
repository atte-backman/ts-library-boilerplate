let webpack = require('webpack');

const ENV = process.env.NODE_ENV = process.env.ENV = 'development';

module.exports = {
    performance: {
        hints: false
    },
    devtool: 'source-map',
    output: {
        sourceMapFilename: '[file].map',
        filename: 'mylib[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                loader: 'eslint-loader'
            },
            {
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader'
            },
            {
                test: /\.ts$/,
                loader: 'babel-loader!awesome-typescript-loader'
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(ENV)
            }
        })
    ]
};

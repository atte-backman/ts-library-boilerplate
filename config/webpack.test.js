let webpack = require('webpack');

const ENV = process.env.NODE_ENV = process.env.ENV = 'test';

module.exports = {
    performance: {
        hints: false
    },
    devtool: 'inline-source-map',
    output: {
        sourceMapFilename: '[file].map',
        filename: 'mylib[name].js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.ts$/,
                enforce: 'post',
                loader: 'istanbul-instrumenter-loader',
                exclude: [
                    'node_modules',
                    /\.spec\.ts$/
                ]
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

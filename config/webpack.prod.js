let webpack = require('webpack');
let path = require('path');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = {
    devtool: false,
    output: {
        filename: 'mylib[name].min.js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'babel-loader!awesome-typescript-loader'
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),

        new webpack.NoEmitOnErrorsPlugin(),

        new webpack.optimize.UglifyJsPlugin({
            beautify: false
        }),

        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV),
                'NODE_ENV': JSON.stringify(ENV)
            }
        })
    ]
};

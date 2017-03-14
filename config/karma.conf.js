let webpackConfig = require('../webpack.config');

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', 'source-map-support'],
        files: [
            { pattern: '../test/**/*.ts', watched: false, include: false }
        ],
        exclude: [
        ],
        preprocessors: {
            '../src/**/*.ts': ['webpack', 'coverage'],
            '../test/**/*.ts': ['webpack', 'sourcemap']
        },
        webpack: {
            module: webpackConfig.module,
            resolve: webpackConfig.resolve
        },
        webpackMiddleware: {
            quiet: true,
            stats: {
                colors: true
            }
        },
        coverageReporter: {
            reporters: [
                {
                    type: 'html',
                    dir: '../docs/coverage/html-js',
                    subdir: '.'
                },
                {
                    type: 'json',
                    dir: '../docs/coverage/json',
                    subdir: '.'
                }
            ]
        },
        reporters: ['coverage', 'progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: [],
        singleRun: false,
        concurrency: Infinity,
        mime: {
            'text/x-typescript': ['ts', 'tsx']
        }
    })
};

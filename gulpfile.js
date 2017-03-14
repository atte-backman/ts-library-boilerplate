let argv = require('yargs').argv;
let gulp = require('gulp');
let Server = require('karma').Server;
let remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul');
let tslint = require('gulp-tslint');
const guppy = require('git-guppy')(gulp);
let gulpFilter = require('gulp-filter');

gulp.task('test:coverage', () => {
    gulp.src(__dirname + '/docs/coverage/json/coverage-final.json')
        .pipe(remapIstanbul({
            fail: true,
            reports: {
                'text-summary': null,
                'json': __dirname + '/docs/coverage/json/coverage.json',
                'html': __dirname + '/docs/coverage/html-ts'
            }
        }));
});

gulp.task('test', (done) => {
    let singleRun = argv.singleRun !== undefined;

    let server = new Server({
        configFile: __dirname + '/config/karma.conf.js',
        singleRun,
        browsers: singleRun || argv.tddBrowser !== undefined ? ['Chrome'] : [],
    }, done);

    server.on('run_complete', (browsers, results) => {
        if (!(results.error || results.failed) && (singleRun || argv.coverage !== undefined)) {
            gulp.start('test:coverage').once('task_stop', () => {});
        }
    });

    server.start();
});

gulp.task('lint', () => {
    gulp.src(['./src/**/*.ts', './test/**/*.ts'])
        .pipe(tslint({
            formatter: 'verbose'
        }))
        .pipe(tslint.report({
            summarizeFailureOutput: true
        }))
        .on('error', console.error.bind(console));
});

gulp.task('pre-commit', () => {
    return guppy.stream('pre-commit')
        .pipe(gulpFilter(['**/*.ts']))
        .pipe(tslint({
            formatter: 'verbose'
        }))
        .pipe(tslint.report({
            summarizeFailureOutput: true
        }));
});

gulp.task('default', ['lint']);

import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import browserSync from 'browser-sync';
import { deleteAsync } from 'del';
import ts from 'gulp-typescript';

const { src, dest, series, parallel, watch } = gulp;

const tsProject = ts.createProject('tsconfig.json');
const sync = browserSync.create();

function script() {
    return src('./src/**/*.js')
        .pipe(dest('dist/'));
}

function typescript() {
    return src('./src/**/*.ts')
        .pipe(tsProject())
        .pipe(dest('dist/'));
}

function clear() {
    return deleteAsync('dist/**');
}

function serve() {
    watch('./src/**/**.js', series(script)).on('change', sync.reload);
    watch('./src/**/**.ts', series(typescript)).on('change', sync.reload);
}

async function startBRowserSync() {
    sync.init({
        proxy: {
            target: 'localhost:5555',
        },
        open: false,
    });
}

export const startNodemon = async () => {
    nodemon({
        ext: 'js',
        script: './dist/index.js',
    }).on('start', function () {
        serve();
    });
}

export const watchNode = parallel(
    startBRowserSync,
    series(
        clear,
        script,
        typescript,
        startNodemon
    )
)

export const build = series(
    clear,
    script,
    typescript
)

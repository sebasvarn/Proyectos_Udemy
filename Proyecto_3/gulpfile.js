import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import {src, dest, watch, series} from 'gulp';


//Compila SASS con Gulp
const sass = gulpSass(dartSass);

export function js(done){
    src('src/js/app.js')
        .pipe(dest('dist/js'));
    done();
}


export function css(done){
    src('src/scss/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('dist/css'));
    done();
}

export function dev(){
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', js);
}

export default series(js,css,dev);
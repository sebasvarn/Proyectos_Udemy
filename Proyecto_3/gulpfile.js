import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import {src, dest, watch} from 'gulp';


//Compila SASS con Gulp
const sass = gulpSass(dartSass);

export function css(done){
    src('src/scss/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('dist/css'));
    done();
}

export function dev(){
    watch('src/scss/**/*.scss', css);
}
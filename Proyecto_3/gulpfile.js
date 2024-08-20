import path from 'path';
import fs from 'fs';
import { glob } from 'glob';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import {src, dest, watch, series} from 'gulp';


//Compila SASS con Gulp
const sass = gulpSass(dartSass);

import sharp from 'sharp';


export function js(done){
    src('src/js/app.js')
        .pipe(dest('dist/js'));
    done();
}


export function css(done){
    src('src/scss/app.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(dest('dist/css'));
    done();
}

export function dev(){
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', js);
    watch('src/img/**/*.{jpg,png}', imagenes);
}

//Cambia el tamaño de las imagenes de la galeria para optimizacion
export async function crop(){
    const inputFolder = 'src/img/gallery/full';
    const outputFolder = 'src/img/gallery/thumb';
    const width = 200;
    const height = 150;

    if(!fs.existsSync(outputFolder)){ //Si no existe la carpeta la creamos
        fs.mkdirSync(outputFolder, {recursive: true}); //Creamos la carpeta
    }
    const imagenes = fs.readdirSync(inputFolder).filter(imagen => imagen.includes('.jpg')); //Filtramos las imagenes y nos quedamos solo con las .jpg
    try{
        imagenes.forEach(imagen => {
            sharp(`${inputFolder}/${imagen}`)
                .resize(width, height) //Ajustamos el tamaño
                .toFile(`${outputFolder}/${imagen}`); //Guardamos la imagen
        });
    }catch(error){
        console.log(error);
    }

}

export async function imagenes(done) {
    const srcDir = './src/img';
    const buildDir = './dist/img';
    //const images =  await glob('./src/img/**/*{jpg,png}')

    images.forEach(file => {
        const relativePath = path.relative(srcDir, path.dirname(file)); 
        const outputSubDir = path.join(buildDir, relativePath);
        procesarImagenes(file, outputSubDir);
    });
    done();
}

function procesarImagenes(file, outputSubDir) {
    if (!fs.existsSync(outputSubDir)) {
        fs.mkdirSync(outputSubDir, { recursive: true })
    }
    const baseName = path.basename(file, path.extname(file))
    const extName = path.extname(file)
    const outputFile = path.join(outputSubDir, `${baseName}${extName}`)
    const outputFileWebp = path.join(outputSubDir, `${baseName}.webp`)

    const options = { quality: 80 }
    sharp(file).jpeg(options).toFile(outputFile)
    sharp(file).webp(options).toFile(outputFileWebp)
}

export default series(crop,js,css,dev);
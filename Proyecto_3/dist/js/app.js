document.addEventListener('DOMContentLoaded', function() {
    navegacionFija();
    crearGaleria();
});

function navegacionFija() {
   const header= document.querySelector('.header');
   const contenidoFestival = document.querySelector('.festival');
   window.addEventListener('scroll', function() {
        if (contenidoFestival.getBoundingClientRect().bottom < 1){
            header.classList.add('fijo');
        } else {
            header.classList.remove('fijo');
        }
    });
}



function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i = 1; i <= 16; i++) {
        const imagen = document.createElement('IMG');
        imagen.src ='src/img/gallery/full/' + i + '.jpg';
        imagen.alt = 'Imagen ' + i;
        // Añadir la función de mostrarImagen
        imagen.onclick = function() {
            console.log(i);
            mostrarImagen(i);
        }    
        galeria.appendChild(imagen);
    }

}

function mostrarImagen(e) {

    const imagen = document.createElement('IMG');
    imagen.src = 'src/img/gallery/full/' + e + '.jpg';
 
    const modal = document.createElement('DIV');
    modal.classList.add('modal');
    modal.onclick = cerrarModal;

    //boton para cerrar el modal
    const cerrarModalBtn= document.createElement('button');
    cerrarModalBtn.textContent = 'X Cerrar Imagen';
    cerrarModalBtn.classList.add('btn-cerrar');
    cerrarModalBtn.onclick = cerrarModal;

    modal.appendChild(imagen);
    modal.appendChild(cerrarModalBtn);

    //agregar al html
    const body = document.querySelector('body');
    body.classList.add('no-scroll');
    body.appendChild(modal);


}

function cerrarModal() {
    const modal = document.querySelector('.modal');
    modal.classList.add('fade-out');
    setTimeout(() => {
        modal?.remove();
        const body = document.querySelector('body');
        body.classList.remove('no-scroll');
    }, 500);

}
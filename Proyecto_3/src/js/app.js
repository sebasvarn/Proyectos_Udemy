document.addEventListener('DOMContentLoaded', function() {
    navegacionFija();
    crearGaleria();
    highlightEnlace();
    scrollNav();
});


function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-header a');
    enlaces.forEach((enlace) => {
        enlace.addEventListener('click', (e) => {
            e.preventDefault();
            const seccion = document.querySelector(e.target.attributes.href.value);
            seccion.scrollIntoView({ behavior: 'smooth' });
            
        })
    })
}

function highlightEnlace() {
    document.addEventListener('scroll', function() {
        const secciones = document.querySelectorAll('section');
        const enlaces = document.querySelectorAll('.navegacion-header a');

        let actual = '';
        secciones.forEach((seccion, i) => {
            const seccionTop = seccion.offsetTop;
            const seccionHeight = seccion.clientHeight;

            if(window.scrollY >= seccionTop - seccionHeight / 3) {
                actual = seccion.getAttribute('id');
            }
        });
        enlaces.forEach((enlace) => {
            enlace.classList.remove('activo');
            if (enlace.getAttribute('href') === `#${actual}`) {
                enlace.classList.add('activo');
            }
1        });
    }
    )
}

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
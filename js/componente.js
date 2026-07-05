/**
 * 
 * @param {string} contenedorId 
 * @param {Array<Object>} datos 
 */
function inicializarCarrusel(contenedorId, datos) {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;

    let indiceActivo = 0;


    const carruselWrapper = document.createElement('div');
    carruselWrapper.className = 'carrusel-wrapper';

    const carruselPantalla = document.createElement('div');
    carruselPantalla.className = 'carrusel-pantalla';

    datos.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'carrusel-item';
        itemElement.innerHTML = `
            <img src="${item.url}" alt="${item.titulo}">
            <div class="carrusel-info">
                <h5>${item.titulo}</h5>
                <p>${item.desc}</p>
            </div>
        `;
        carruselPantalla.appendChild(itemElement);
    });

    const btnPrev = document.createElement('button');
    btnPrev.className = 'carrusel-btn prev';
    btnPrev.innerHTML = '&#10094;';

    const btnNext = document.createElement('button');
    btnNext.className = 'carrusel-btn next';
    btnNext.innerHTML = '&#10095;';

    carruselWrapper.appendChild(carruselPantalla);
    carruselWrapper.appendChild(btnPrev);
    carruselWrapper.appendChild(btnNext);
    contenedor.appendChild(carruselWrapper);


    console.log(`Carrusel inicializado correctamente con ${datos.length} imágenes.`);

    function actualizarPosicion() {
        carruselPantalla.style.transform = `translateX(-${indiceActivo * 100}%)`;
        console.log(`Carrusel movido al slide índice: ${indiceActivo} (${datos[indiceActivo].titulo})`);
    }

    btnNext.addEventListener('click', () => {
        if (indiceActivo < datos.length - 1) {
            indiceActivo++;
        } else {
            indiceActivo = 0;
        }
        actualizarPosicion();
    });

    btnPrev.addEventListener('click', () => {
        if (indiceActivo > 0) {
            indiceActivo--;
        } else {
            indiceActivo = datos.length - 1;
        }
        actualizarPosicion();
    });
}


/**
 * 
 * @param {string} contenedorId 
 * @param {Array<Object>} secciones
 */
function inicializarAcordeon(contenedorId, secciones) {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;

    const acordeonWrapper = document.createElement('div');
    acordeonWrapper.className = 'acordeon-wrapper';

    console.log(`Acordeón inicializado con ${secciones.length} secciones de información.`);

    secciones.forEach((sec, index) => {
        const item = document.createElement('div');
        item.className = 'acordeon-item';

        item.innerHTML = `
            <button class="acordeon-cabecera">
                <span>${sec.titulo}</span>
                <span class="acordeon-icono">&#10217;</span>
            </button>
            <div class="acordeon-panel">
                <div class="acordeon-contenido">
                    <p>${sec.contenido}</p>
                </div>
            </div>
        `;

        const cabecera = item.querySelector('.acordeon-cabecera');
        const panel = item.querySelector('.acordeon-panel');

        cabecera.addEventListener('click', () => {
            const estaActivo = item.classList.contains('activo');

            acordeonWrapper.querySelectorAll('.acordeon-item').forEach((otroItem, otroIndex) => {
                if (otroItem.classList.contains('activo')) {
                    console.log(`Sección colapsada correctamente: ${secciones[otroIndex].titulo.split('(')[0].trim()}`);
                }
                otroItem.classList.remove('activo');
                otroItem.querySelector('.acordeon-panel').style.maxHeight = null;
            });

            if (!estaActivo) {
                item.classList.add('activo');
                panel.style.maxHeight = panel.scrollHeight + "px";
                console.log(`Sección abierta: ${sec.titulo.split('(')[0].trim()}`);
            }
        });

        acordeonWrapper.appendChild(item);
    });

    contenedor.appendChild(acordeonWrapper);
}
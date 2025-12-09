import Header from '../componentes/header.js';
import router from '../utils/router.js'; // o router-estudiante.js

const init = async () => {
    // 1. Inyectar el Header en su lugar (fuera de "vista")
    const headerContainer = document.querySelector('header');
    if(headerContainer) {
        headerContainer.innerHTML = await Header(); // O la lógica que uses para el header
    }

    // 2. Iniciar el Router (que inyectará el dashboard dentro de "vista")
    window.addEventListener('hashchange', router);
    window.addEventListener('load', router);
};

init();
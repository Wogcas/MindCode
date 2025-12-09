import { cursoService } from '../api/CursoService.js';
import { LeccionService } from '../api/LeccionService.js';
import { renderModalCrearLeccion } from './componentes/ModalLeccion.js'; // Lo haremos en el paso 4
import { loadVistaLeccion } from './VistaLeccion.js'; // Lo haremos en el paso 5

export async function loadDetalleCurso(cursoId) {
    const mainContent = document.getElementById('main-content') ||
        document.getElementById('contenido-principal') ||
        document.querySelector('main') ||
        document.getElementById('app');

    if (!mainContent) {
        console.error("NO SE ENCONTRÓ EL CONTENEDOR PRINCIPAL. Asegúrate de tener un <div id='main-content'> en tu HTML.");
        alert("Error: No se encontró donde mostrar el curso (falta id='main-content').");
        return;
    }

    // Limpiamos el contenido actual para mostrar el nuevo
    mainContent.innerHTML = '<div class="flex justify-center p-10"><div class="loader">Cargando curso...</div></div>';

    try {
        // 1. Obtenemos datos del curso y sus lecciones
        // Nota: Dependiendo de tu back, getById podría traer las lecciones o se piden aparte.
        const responseCurso = await cursoService.fetchCourseById(cursoId); // Usamos la instancia
        const curso = responseCurso.curso; // Ajustamos según la respuesta de tu API

        const lecciones = await LeccionService.getByCursoId(cursoId)

        // 2. Renderizamos el Header (Como en la Imagen 2)
        mainContent.innerHTML = `
      <div class="p-8">
        <header class="mb-8 border-b pb-4">
          <h1 class="text-4xl font-bold text-purple-700">${curso.titulo}</h1>
          <p class="text-gray-600 mt-2 text-xl">${curso.descripcion}</p>
          <div class="mt-4 flex gap-2">
            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Progreso: 0%</span>
            <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">${lecciones.length} Lecciones</span>
          </div>
        </header>

        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold">Contenido del Curso</h2>
          <button id="btn-nueva-leccion" class="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">
            + Nueva Lección
          </button>
        </div>

        <div id="lista-lecciones" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          </div>
      </div>
    `;

        // 3. Renderizar lista de lecciones
        const listaLecciones = document.getElementById('lista-lecciones');
        lecciones.forEach(leccion => {
            const leccionCard = document.createElement('div');
            leccionCard.className = "border rounded-lg p-4 hover:bg-gray-50 cursor-pointer flex flex-col justify-between h-40";
            leccionCard.innerHTML = `
        <div>
           <h3 class="font-bold text-lg mb-1">${leccion.titulo}</h3>
           <p class="text-sm text-gray-500 line-clamp-2">${leccion.descripcion || 'Sin descripción'}</p>
        </div>
        <div class="text-right mt-2">
           <span class="text-purple-600 text-sm font-semibold">Editar / Ver &rarr;</span>
        </div>
      `;

            // Al hacer clic en una lección, vamos a la vista de edición de contenido (Imágenes 3 y 4)
            leccionCard.addEventListener('click', () => loadVistaLeccion(cursoId, leccion.id));

            listaLecciones.appendChild(leccionCard);
        });

        // 4. Lógica del Botón "Nueva Lección" (Abre el Modal Imagen 5)
        document.getElementById('btn-nueva-leccion').addEventListener('click', () => {
            renderModalCrearLeccion(cursoId, () => loadDetalleCurso(cursoId)); // Callback para recargar al guardar
        });

    } catch (error) {
        console.error(error);
        mainContent.innerHTML = `<p class="text-red-500">Error al cargar el curso.</p>`;
    }
}
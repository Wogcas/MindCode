import { cursoService } from '../api/CursoService.js';
import { LeccionService } from '../api/LeccionService.js';
import { renderModalCrearLeccion } from './componentes/ModalLeccion.js';
import { loadVistaLeccion } from './VistaLeccion.js';

export async function loadDetalleCurso(cursoId) {
  // CAMBIO CLAVE: Ahora buscamos 'vista', que es el ID que usa tu Shell
  const mainContent = document.getElementById('vista');

  if (!mainContent) {
    console.error("Error: No se encontró el contenedor 'vista'");
    return;
  }

  // Loader
  mainContent.innerHTML = `
    <div class="flex flex-col items-center justify-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
        <p class="text-gray-500">Cargando contenido del curso...</p>
    </div>
  `;

  try {
    const [cursoResponse, lecciones] = await Promise.all([
      cursoService.fetchCourseById(cursoId),
      LeccionService.getByCursoId(cursoId)
    ]);

    const curso = cursoResponse.curso || cursoResponse;

    mainContent.innerHTML = `
      <div class="p-8 font-sans max-w-7xl mx-auto animate-fade-in">
        
        <header class="mb-10 border-b pb-6">
          <button id="btn-volver" class="text-gray-500 hover:text-purple-600 mb-4 flex items-center gap-2 transition-colors">
             <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
             Volver a mis cursos
          </button>
          
          <div class="flex justify-between items-start">
              <div>
                  <h1 class="text-4xl font-bold text-gray-900 mb-2">${curso.titulo}</h1>
                  <p class="text-xl text-gray-600 max-w-3xl">${curso.descripcion || 'Sin descripción disponible.'}</p>
              </div>
              
              <button id="btn-nueva-leccion" class="bg-purple-600 text-white px-5 py-2.5 rounded-lg shadow hover:bg-purple-700 transition flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                Nueva Lección
              </button>
          </div>

          <div class="mt-6 flex gap-3">
            <span class="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-100">
                ${lecciones.length} Lecciones
            </span>
          </div>
        </header>

        <div id="contenedor-lecciones" class="grid grid-cols-1 gap-4">
           </div>
      </div>
    `;

    // Lógica Volver (Recargamos para volver al dashboard por defecto)
    document.getElementById('btn-volver').addEventListener('click', () => {
      location.reload();
    });

    // Lógica Nueva Lección
    document.getElementById('btn-nueva-leccion').addEventListener('click', () => {
      renderModalCrearLeccion(cursoId, () => {
        loadDetalleCurso(cursoId);
      });
    });

    // Renderizado de Lista
    const contenedor = document.getElementById('contenedor-lecciones');

    if (lecciones.length === 0) {
      contenedor.innerHTML = `
            <div class="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                <p class="text-gray-500 text-lg mb-2">Este curso aún no tiene lecciones.</p>
                <p class="text-gray-400 text-sm">Usa el botón "Nueva Lección" para comenzar.</p>
            </div>
        `;
    } else {
      lecciones.forEach((leccion, index) => {
        const card = document.createElement('div');
        card.className = "bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer flex justify-between items-center group";

        card.innerHTML = `
                <div class="flex items-center gap-4">
                    <div class="bg-purple-100 text-purple-700 w-10 h-10 rounded-full flex items-center justify-center font-bold">
                        ${index + 1}
                    </div>
                    <div>
                        <h3 class="font-bold text-lg text-gray-800 group-hover:text-purple-700 transition-colors">${leccion.titulo}</h3>
                        <p class="text-gray-500 text-sm line-clamp-1">${leccion.descripcion || ''}</p>
                    </div>
                </div>
                <div class="text-gray-400 group-hover:text-purple-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </div>
            `;

        card.addEventListener('click', () => {
          loadVistaLeccion(cursoId, leccion._id || leccion.id);
        });

        contenedor.appendChild(card);
      });
    }

  } catch (error) {
    console.error("Error:", error);
    mainContent.innerHTML = `<p class="text-red-500 text-center p-10">Error al cargar el curso.</p>`;
  }
}
import { cursoService } from '../api/CursoService.js';
import { LeccionService } from '../api/LeccionService.js';
import { renderModalCrearLeccion } from './componentes/ModalLeccion.js';

let leccionActualId = null;

export async function loadDetalleCurso(cursoId) {
  const mainContent = document.getElementById('vista');
  if (!mainContent) return;

  // 1. Loader
  mainContent.innerHTML = `
    <div class="flex flex-col items-center justify-center h-[80vh]">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
        <p class="text-gray-500">Sincronizando con el servidor...</p>
    </div>
  `;

  try {
    // 2. Petición al Backend (Curso + Lecciones)
    const [cursoResponse, leccionesData] = await Promise.all([
      cursoService.fetchCourseById(cursoId),
      LeccionService.getByCursoId(cursoId)
    ]);

    const curso = cursoResponse.curso || cursoResponse;
    const listaLecciones = leccionesData || [];

    console.log("Datos recibidos del backend:", listaLecciones);

    // 3. Renderizado
    mainContent.innerHTML = `
      <div class="font-sans min-h-screen bg-gray-50 animate-fade-in pb-10">
        
        <div class="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-20 shadow-sm">
           <div class="flex items-center gap-3">
              <button id="btn-volver" class="text-gray-500 hover:text-purple-600 transition p-2 rounded-full hover:bg-gray-100">
                 <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
              </button>
              <h1 class="font-bold text-gray-800 text-lg truncate max-w-md hidden md:block">${curso.titulo}</h1>
           </div>
           
           <button id="btn-nueva-leccion" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2">
             <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
             <span class="hidden sm:inline">Nueva Lección</span>
           </button>
        </div>

        <div class="max-w-[1600px] mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            <div class="lg:col-span-8 flex flex-col gap-4 sticky top-24">
                <div id="player-container" class="bg-white rounded-2xl shadow-lg overflow-hidden min-h-[400px] border border-gray-200 relative">
                    <div class="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-gray-50">
                        <svg class="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        <p>Selecciona una lección para comenzar</p>
                    </div>
                </div>
                <div id="info-leccion-container" class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hidden">
                   <h2 id="titulo-leccion-activa" class="text-2xl font-bold text-gray-800 mb-2"></h2>
                   <p id="desc-leccion-activa" class="text-gray-600 leading-relaxed"></p>
                </div>
            </div>

            <div class="lg:col-span-4 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden flex flex-col h-auto max-h-[calc(100vh-120px)]">
                <div class="p-4 border-b bg-gray-50">
                    <h3 class="font-bold text-gray-700">Contenido del Curso</h3>
                    <p class="text-xs text-gray-500 mt-1">${listaLecciones.length} Lecciones</p>
                </div>
                <div id="lista-lecciones" class="overflow-y-auto custom-scrollbar p-2 space-y-2"></div>
            </div>

        </div>
      </div>
    `;

    // 4. Listeners
    document.getElementById('btn-volver').addEventListener('click', () => location.reload());
    document.getElementById('btn-nueva-leccion').addEventListener('click', () => {
      renderModalCrearLeccion(cursoId, () => loadDetalleCurso(cursoId));
    });

    // 5. Iniciar Vista
    renderizarAcordeon(listaLecciones);
    if (listaLecciones.length > 0) activarLeccion(listaLecciones[0]);

  } catch (error) {
    console.error("Error general:", error);
    mainContent.innerHTML = `<div class="p-10 text-center text-red-500">Error cargando datos del servidor.</div>`;
  }
}

// --- FUNCIONES AUXILIARES ---

function renderizarAcordeon(lecciones) {
    const contenedor = document.getElementById('lista-lecciones');
    contenedor.innerHTML = '';

    if (!lecciones.length) {
        contenedor.innerHTML = `<p class="text-center text-gray-400 py-10 text-sm">No hay lecciones creadas en la base de datos.</p>`;
        return;
    }

    lecciones.forEach((leccion, index) => {
        const item = document.createElement('div');
        item.className = "border border-gray-100 rounded-xl overflow-hidden transition-all bg-white group hover:shadow-md";
        
        // Normalizamos IDs (Mongo usa _id, SQL usa id)
        const idLeccion = leccion._id || leccion.id;
        const numRetos = leccion.retos ? leccion.retos.length : 0;

        item.innerHTML = `
            <button class="w-full text-left p-4 flex justify-between items-center focus:outline-none" id="btn-leccion-${idLeccion}">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold">
                        ${index + 1}
                    </div>
                    <div>
                        <h4 class="font-semibold text-gray-700 text-sm group-hover:text-purple-600 transition">${leccion.titulo}</h4>
                        <p class="text-[10px] text-gray-400">${leccion.videoUrl ? '🎥 Video' : '📄 Lectura'}</p>
                    </div>
                </div>
                <svg class="w-4 h-4 text-gray-400 transition-transform" id="icon-arrow-${idLeccion}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            <div id="content-leccion-${idLeccion}" class="hidden bg-gray-50 border-t border-gray-100 animate-slide-down">
                <div class="p-2 space-y-1">
                    <button class="w-full text-left p-2 pl-4 rounded-lg hover:bg-purple-50 text-xs text-gray-600 hover:text-purple-700 flex items-center gap-2 transition"
                            onclick="window.verContenidoPrincipal('${idLeccion}')">
                        <span>📺 Ver Clase</span>
                    </button>
                    ${numRetos > 0 ? `<div class="px-4 py-1 text-[10px] text-gray-400 font-bold uppercase">Retos</div>` : ''}
                    ${leccion.retos ? leccion.retos.map((reto, i) => `
                        <button class="w-full text-left p-2 pl-4 rounded-lg hover:bg-yellow-50 text-xs text-gray-600 hover:text-yellow-700 flex items-center gap-2"
                                onclick="window.verReto('${idLeccion}', ${i})">
                            <span>🏆 Reto ${i + 1}</span>
                        </button>
                    `).join('') : ''}
                </div>
            </div>
        `;

        // Lógica de apertura
        const btnHeader = item.querySelector(`#btn-leccion-${idLeccion}`);
        const contentDiv = item.querySelector(`#content-leccion-${idLeccion}`);
        const arrow = item.querySelector(`#icon-arrow-${idLeccion}`);

        btnHeader.addEventListener('click', () => {
            // Cierra otros
            document.querySelectorAll('[id^="content-leccion-"]').forEach(el => {
                if(el !== contentDiv) el.classList.add('hidden');
            });
            contentDiv.classList.toggle('hidden');
            arrow.classList.toggle('rotate-180');
            if(!contentDiv.classList.contains('hidden')) activarLeccion(leccion);
        });

        contenedor.appendChild(item);
    });

    // Helpers Globales para el onclick
    window.verContenidoPrincipal = (id) => {
        const lec = lecciones.find(l => (l._id || l.id) == id);
        activarLeccion(lec, 'contenido');
    };
    window.verReto = (id, idx) => {
        const lec = lecciones.find(l => (l._id || l.id) == id);
        activarLeccion(lec, 'reto', idx);
    };
}

function activarLeccion(leccion, tipo = 'contenido', indiceReto = 0) {
    if (!leccion) return;
    leccionActualId = leccion._id || leccion.id;

    const player = document.getElementById('player-container');
    const info = document.getElementById('info-leccion-container');
    document.getElementById('titulo-leccion-activa').textContent = leccion.titulo;
    document.getElementById('desc-leccion-activa').textContent = leccion.descripcion || '';
    info.classList.remove('hidden');

    if (tipo === 'contenido') {
        // Soporte para URL de video (asegúrate de que tu backend envíe 'videoUrl' o 'video_url')
        const vidUrl = leccion.videoUrl || leccion.video_url; 
        
        if (vidUrl && (vidUrl.includes('youtube') || vidUrl.includes('youtu.be'))) {
            const id = vidUrl.split('v=')[1] || vidUrl.split('/').pop();
            player.innerHTML = `<iframe class="w-full h-full aspect-video" src="https://www.youtube.com/embed/${id}" frameborder="0" allowfullscreen></iframe>`;
        } else {
            // Vista por defecto (Lectura)
            player.innerHTML = `
                <div class="flex flex-col items-center justify-center h-full bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-10 text-center">
                    <h2 class="text-3xl font-bold mb-4">${leccion.titulo}</h2>
                    <p class="opacity-90 max-w-lg">Esta es una lección de lectura. Revisa la descripción y completa los retos abajo.</p>
                </div>
            `;
        }
    } else if (tipo === 'reto') {
        const reto = leccion.retos[indiceReto];
        player.innerHTML = `
            <div class="p-10 h-full flex flex-col items-center justify-center text-center bg-gray-50">
                <div class="bg-yellow-100 p-4 rounded-full mb-4 text-4xl">🏆</div>
                <h3 class="text-2xl font-bold text-gray-800 mb-2">${reto.titulo || 'Reto Práctico'}</h3>
                <p class="text-gray-600 mb-6">${reto.instrucciones || 'Sigue las instrucciones...'}</p>
                <button class="bg-primary text-white px-6 py-2 rounded-lg shadow" onclick="alert('Editor de código próximamente')">Iniciar Reto</button>
            </div>
        `;
    }
}
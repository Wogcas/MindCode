import { cursoService } from '../api/CursoService.js';
import { LeccionService } from '../api/LeccionService.js';
import { renderModalCrearLeccion } from './componentes/ModalLeccion.js';

let leccionActualId = null;

export async function loadDetalleCurso(cursoId) {
    const mainContent = document.getElementById('vista');

    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    const esMaestro = usuario.tipo === 'Maestro';

    if (!mainContent) return;

    // 1. Limpiar contenido previo de forma segura
    while (mainContent.firstChild) {
        const child = mainContent.firstChild;
        if (child.cleanup && typeof child.cleanup === 'function') {
            child.cleanup();
        }
        mainContent.removeChild(child);
    }

    // 2. Loader
    mainContent.innerHTML = `
    <div class="flex flex-col items-center justify-center h-[80vh]">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
        <p class="text-gray-500">Sincronizando con el servidor...</p>
    </div>
  `;

    try {
        // 3. Petición al Backend (Curso + Lecciones)
        const [cursoResponse, leccionesData] = await Promise.all([
            cursoService.fetchCourseById(cursoId),
            LeccionService.getByCursoId(cursoId)
        ]);

        const curso = cursoResponse.curso || cursoResponse;
        const listaLecciones = leccionesData.data || leccionesData || []; // Aseguramos acceder a .data si existe

        console.log("Datos recibidos del backend:", listaLecciones);

        // 3. Renderizado
        mainContent.innerHTML = `
      <div class="font-sans min-h-screen bg-gray-50 animate-fade-in pb-10">
        
        <div class="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-20 shadow-sm">
           <div class="flex items-center gap-3">
              <button id="btn-volver" class="text-gray-500 hover:text-primary-600 transition p-2 rounded-full hover:bg-gray-100">
                 <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
              </button>
              <h1 class="font-bold text-gray-800 text-lg truncate max-w-md hidden md:block">${curso.titulo}</h1>
           </div>
           
           <div class="flex gap-2">
                ${esMaestro ? `
                    <button id="btn-eliminar-curso" class="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        <span class="hidden sm:inline">Eliminar Curso</span>
                    </button>

                    <button id="btn-nueva-leccion" class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                        <span class="hidden sm:inline">Nueva Lección</span>
                    </button>
                ` : ''} 
           </div>
        </div>

        <div class="max-w-[1600px] mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            <div class="lg:col-span-8 flex flex-col gap-4 sticky top-24">
                <div id="player-container" class="bg-white rounded-2xl shadow-lg overflow-hidden min-h-[400px] border border-gray-200 relative flex items-center justify-center bg-gray-50 text-gray-400">
                    <div class="text-center">
                        <svg class="w-16 h-16 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
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

        ${esMaestro ? `
        <div id="modal-eliminar-curso" class="hidden fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4 animate-fade-in">
            <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all scale-100">
                <div class="flex items-center gap-4 mb-4 text-red-600">
                    <div class="bg-red-100 p-3 rounded-full">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                    </div>
                    <h3 class="text-xl font-bold text-gray-800">¿Eliminar Curso?</h3>
                </div>
                <p class="text-gray-600 mb-6">
                    Estás a punto de eliminar <strong>"${curso.titulo}"</strong>. Esta acción borrará todas las lecciones y el progreso de los estudiantes. <br><br>
                    <span class="font-bold">Esta acción no se puede deshacer.</span>
                </p>
                <div class="flex justify-end gap-3">
                    <button id="btn-cancelar-eliminar" class="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition font-medium">
                        Cancelar
                    </button>
                    <button id="btn-confirmar-eliminar" class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium shadow-lg flex items-center gap-2">
                        <span>Sí, eliminar definitivamente</span>
                    </button>
                </div>
            </div>
        </div>
        ` : ''}

      </div>
    `;

        // 4. LISTENERS (CON PROTECCIÓN CONTRA NULL)
        
        // Volver (siempre existe)
        document.getElementById('btn-volver').addEventListener('click', () => {
            const vistaVolver = esMaestro ? 'dashboardMaestro' : 'dashboardAlumno';
            window.location.href = `?vista=${vistaVolver}`;
        });

        // Nueva Lección (SOLO SI EXISTE EL BOTÓN)
        const btnNueva = document.getElementById('btn-nueva-leccion');
        if (btnNueva) {
            btnNueva.addEventListener('click', () => {
                renderModalCrearLeccion(cursoId, () => loadDetalleCurso(cursoId));
            });
        }

        // Eliminar Curso (SOLO SI EXISTE EL BOTÓN)
        const btnEliminar = document.getElementById('btn-eliminar-curso');
        if (btnEliminar) {
            const modalEliminar = document.getElementById('modal-eliminar-curso');
            const btnCancelar = document.getElementById('btn-cancelar-eliminar');
            const btnConfirmar = document.getElementById('btn-confirmar-eliminar');

            btnEliminar.addEventListener('click', () => {
                modalEliminar.classList.remove('hidden');
            });

            btnCancelar.addEventListener('click', () => {
                modalEliminar.classList.add('hidden');
            });

            modalEliminar.addEventListener('click', (e) => {
                if (e.target === modalEliminar) modalEliminar.classList.add('hidden');
            });

            btnConfirmar.addEventListener('click', async () => {
                try {
                    btnConfirmar.innerHTML = `<svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg> Eliminando...`;
                    btnConfirmar.disabled = true;

                    await cursoService.deleteCourse(cursoId);
                    
                    modalEliminar.classList.add('hidden');
                    window.location.hash = '/mis-cursos'; 
                    
                } catch (error) {
                    console.error('Error eliminando curso:', error);
                    alert('No se pudo eliminar el curso. Inténtalo de nuevo.');
                    btnConfirmar.innerHTML = 'Sí, eliminar definitivamente';
                    btnConfirmar.disabled = false;
                    modalEliminar.classList.add('hidden');
                }
            });
        }

        // 5. Iniciar Vista
        renderizarAcordeon(listaLecciones, esMaestro, cursoId);
        if (listaLecciones.length > 0) activarLeccion(listaLecciones[0]);

    } catch (error) {
        console.error("Error general:", error);
        mainContent.innerHTML = `<div class="p-10 text-center text-red-500">Error cargando datos del servidor.</div>`;
    }
}

// --- FUNCIONES AUXILIARES ---

function renderizarAcordeon(lecciones, esMaestro, cursoId) {
    const contenedor = document.getElementById('lista-lecciones');
    contenedor.innerHTML = '';

    if (!lecciones.length) {
        contenedor.innerHTML = `<p class="text-center text-gray-400 py-10 text-sm">No hay lecciones creadas en la base de datos.</p>`;
        return;
    }

    lecciones.forEach((leccion, index) => {
        const item = document.createElement('div');
        item.className = "border border-gray-100 rounded-xl overflow-hidden transition-all bg-white group hover:shadow-md";

        const idLeccion = leccion._id || leccion.id;
        const numRetos = leccion.retos ? leccion.retos.length : 0;

        item.innerHTML = `
            <button class="w-full text-left p-4 flex justify-between items-center focus:outline-none" id="btn-leccion-${idLeccion}">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xs font-bold">
                        ${index + 1}
                    </div>
                    <div>
                        <h4 class="font-semibold text-gray-700 text-sm group-hover:text-primary-600 transition">${leccion.titulo}</h4>
                        <p class="text-[10px] text-gray-400">${leccion.videoUrl ? '🎥 Video' : '📄 Lectura'}</p>
                    </div>
                </div>
                <svg class="w-4 h-4 text-gray-400 transition-transform" id="icon-arrow-${idLeccion}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            <div id="content-leccion-${idLeccion}" class="hidden bg-gray-50 border-t border-gray-100 animate-slide-down">
                <div class="p-2 space-y-1">
                ${!esMaestro
                ? `<button class="w-full text-left p-2 pl-4 rounded-lg hover:bg-primary-50 text-xs text-gray-600 hover:text-primary-700 flex items-center gap-2 transition"
                    onclick="window.location.href = '?vista=verLeccion&cursoId=${cursoId}&leccionId=${idLeccion}'">
                    <span>📺 Ver Lección</span>
               </button>`
                : `<a href="?vista=editarLeccion&cursoId=${cursoId}&leccionId=${idLeccion}" 
                    class="w-full text-left p-2 pl-4 rounded-lg hover:bg-primary-50 text-xs text-gray-600 hover:text-primary-700 flex items-center gap-2 transition decoration-transparent">
                    <span>✏️ Editar Lección</span>
                    </a>`
            }
                    
                    ${numRetos > 0 ? `<div class="px-4 py-1 text-[10px] text-gray-400 font-bold uppercase">Retos</div>` : ''}
                    
                    ${leccion.retos ? leccion.retos.map((reto, i) => `
                        <button class="w-full text-left p-2 pl-4 rounded-lg hover:bg-yellow-50 text-xs text-gray-600 hover:text-yellow-700 flex items-center gap-2"
                                onclick="window.verReto('${idLeccion}', ${i})">
                            <span>🏆 ${reto.titulo || 'Reto ' + (i+1)}</span>
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
                if (el !== contentDiv) el.classList.add('hidden');
            });
            contentDiv.classList.toggle('hidden');
            arrow.classList.toggle('rotate-180');
            if (!contentDiv.classList.contains('hidden')) activarLeccion(leccion);
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
        const vidUrl = (leccion.multimedia && leccion.multimedia[0]?.URL) || leccion.video_url;

        if (vidUrl && (vidUrl.includes('youtube') || vidUrl.includes('youtu.be'))) {
            const id = vidUrl.split('v=')[1] || vidUrl.split('/').pop();
            player.innerHTML = `<iframe class="w-full h-full aspect-video" src="https://www.youtube.com/embed/${id}" frameborder="0" allowfullscreen></iframe>`;
        } else {
            player.innerHTML = `
                <div class="flex flex-col items-center justify-center h-full bg-gradient-to-br from-indigo-600 to-primary-700 text-white p-10 text-center">
                    <h2 class="text-3xl font-bold mb-4">${leccion.titulo}</h2>
                    <p class="opacity-90 max-w-lg">Esta es una lección de lectura.</p>
                </div>
            `;
        }
    } else if (tipo === 'reto') {
        const reto = leccion.retos[indiceReto];
        player.innerHTML = `
            <div class="p-10 h-full flex flex-col items-center justify-center text-center bg-gray-50">
                <div class="bg-yellow-100 p-4 rounded-full mb-4 text-4xl">🏆</div>
                <h3 class="text-2xl font-bold text-gray-800 mb-2">${reto.titulo || 'Reto Práctico'}</h3>
                <p class="text-gray-600 mb-6 max-w-lg">${reto.descripcion || reto.instrucciones || 'Sigue las instrucciones...'}</p>
                <button class="bg-primary text-white px-6 py-2 rounded-lg shadow font-bold hover:bg-primary-700 transition" onclick="alert('Editor de código próximamente')">Iniciar Reto</button>
            </div>
        `;
    }
}
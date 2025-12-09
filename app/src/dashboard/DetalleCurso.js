import { cursoService } from '../api/CursoService.js';
// 1. IMPORTAMOS TU SERVICIO (Asegúrate que la ruta sea correcta)
import { LeccionService } from '../api/LeccionService.js';
import { renderModalCrearLeccion } from './componentes/ModalLeccion.js';

let leccionActual = null;

export async function loadDetalleCurso(cursoId) {
  const mainContent = document.getElementById('vista');
  if (!mainContent) return;

  // --- LOADER ---
  mainContent.innerHTML = `
    <div class="flex flex-col items-center justify-center h-[80vh]">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
        <p class="text-gray-500">Cargando contenido del curso...</p>
    </div>
  `;

  try {
    // 2. PETICIÓN SIMULTÁNEA AL BACKEND
    // Usamos Promise.all para traer el Curso y las Lecciones al mismo tiempo
    const [cursoResponse, leccionesData] = await Promise.all([
      cursoService.fetchCourseById(cursoId),
      LeccionService.getByCursoId(cursoId) // <--- Aquí llama a tu servicio
    ]);

    const curso = cursoResponse.curso || cursoResponse;
    
    // 3. PROCESAMIENTO INTELIGENTE DE DATOS
    // Tu servicio devuelve 'response.data || []'. Aquí nos aseguramos de que sea un Array.
    let listaLecciones = [];

    if (Array.isArray(leccionesData)) {
        // Caso ideal: Tu servicio devolvió el array directo
        listaLecciones = leccionesData;
    } else if (leccionesData && Array.isArray(leccionesData.lecciones)) {
        // Caso alternativo: El backend devolvió { lecciones: [...] }
        listaLecciones = leccionesData.lecciones;
    } else if (leccionesData && Array.isArray(leccionesData.data)) {
        // Caso defensivo: Si por alguna razón llegó otro nivel de anidación
        listaLecciones = leccionesData.data;
    }

    console.log("Lecciones listas para renderizar:", listaLecciones);

    // --- RENDERIZADO DEL HTML (VISTA DIVIDIDA) ---
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
                    <p class="text-xs text-gray-500 mt-1">${listaLecciones.length} lecciones disponibles</p>
                </div>
                
                <div id="lista-lecciones" class="overflow-y-auto custom-scrollbar p-2 space-y-2">
                   </div>
            </div>

        </div>
      </div>
    `;

    // 4. EVENTOS
    document.getElementById('btn-volver').addEventListener('click', () => location.reload());
    
    // Conectamos el Modal de Crear Lección con la recarga automática
    document.getElementById('btn-nueva-leccion').addEventListener('click', () => {
      renderModalCrearLeccion(cursoId, () => loadDetalleCurso(cursoId));
    });

    // 5. RENDERIZADO DEL ACORDEÓN
    renderizarAcordeon(listaLecciones);

    // 6. CARGA AUTOMÁTICA DE LA PRIMERA LECCIÓN
    if (listaLecciones.length > 0) {
        activarLeccion(listaLecciones[0]);
    }

  } catch (error) {
    console.error("Error cargando curso:", error);
    mainContent.innerHTML = `
        <div class="flex flex-col items-center justify-center py-20">
            <p class="text-red-500 font-medium mb-2">Error al conectar con el servidor.</p>
            <p class="text-gray-400 text-sm">Verifica tu conexión o intenta más tarde.</p>
            <button onclick="location.reload()" class="mt-4 text-purple-600 hover:underline">Reintentar</button>
        </div>`;
  }
}

// --- FUNCIONES AUXILIARES (Sin cambios en lógica, solo visuales) ---

function renderizarAcordeon(lecciones) {
    const contenedor = document.getElementById('lista-lecciones');
    contenedor.innerHTML = '';

    if (!lecciones || lecciones.length === 0) {
        contenedor.innerHTML = `<p class="text-center text-gray-400 py-10 text-sm">Este curso aún no tiene lecciones.</p>`;
        return;
    }

    lecciones.forEach((leccion, index) => {
        const item = document.createElement('div');
        item.className = "border border-gray-100 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md bg-white group";
        
        // Datos calculados
        const numRetos = leccion.retos ? leccion.retos.length : 0;
        const tieneVideo = !!leccion.videoUrl;

        item.innerHTML = `
            <button class="w-full text-left p-4 flex justify-between items-center focus:outline-none" id="btn-leccion-${leccion._id || leccion.id}">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold shrink-0">
                        ${index + 1}
                    </div>
                    <div class="min-w-0">
                        <h4 class="font-semibold text-gray-700 text-sm group-hover:text-purple-600 transition truncate">${leccion.titulo}</h4>
                        <p class="text-[10px] text-gray-400 flex items-center gap-1">
                           ${tieneVideo ? '🎥 Video' : '📄 Lectura'} 
                           ${numRetos > 0 ? `• 🏆 ${numRetos} Retos` : ''}
                        </p>
                    </div>
                </div>
                <svg class="w-4 h-4 text-gray-400 transform transition-transform duration-200 shrink-0" id="icon-arrow-${leccion._id || leccion.id}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            <div id="content-leccion-${leccion._id || leccion.id}" class="hidden bg-gray-50 border-t border-gray-100 animate-slide-down">
                <div class="p-2 space-y-1">
                    <button class="w-full text-left p-2 pl-4 rounded-lg hover:bg-purple-50 text-xs text-gray-600 hover:text-purple-700 flex items-center gap-2 transition"
                            onclick="window.verContenidoPrincipal('${leccion._id || leccion.id}')">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        Ver Clase
                    </button>
                    ${numRetos > 0 ? leccion.retos.map((reto, i) => `
                        <button class="w-full text-left p-2 pl-4 rounded-lg hover:bg-yellow-50 text-xs text-gray-600 hover:text-yellow-700 flex items-center gap-2 transition"
                                onclick="window.verReto('${leccion._id || leccion.id}', ${i})">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                            Reto ${i + 1}
                        </button>
                    `).join('') : ''}
                </div>
            </div>
        `;

        // Lógica de apertura del acordeón
        const btnHeader = item.querySelector(`#btn-leccion-${leccion._id || leccion.id}`);
        const contentDiv = item.querySelector(`#content-leccion-${leccion._id || leccion.id}`);
        const arrow = item.querySelector(`#icon-arrow-${leccion._id || leccion.id}`);

        btnHeader.addEventListener('click', () => {
            // Cerrar los demás
            document.querySelectorAll('[id^="content-leccion-"]').forEach(el => {
                if(el !== contentDiv) el.classList.add('hidden');
            });
            // Abrir/Cerrar actual
            contentDiv.classList.toggle('hidden');
            arrow.classList.toggle('rotate-180');
            // Si abrimos, cargamos la lección en el player
            if (!contentDiv.classList.contains('hidden')) activarLeccion(leccion);
        });

        contenedor.appendChild(item);
    });

    // Helpers globales para los onclicks
    window.verContenidoPrincipal = (leccionId) => {
        const leccion = lecciones.find(l => (l._id || l.id) == leccionId);
        activarLeccion(leccion, 'contenido');
    };

    window.verReto = (leccionId, retoIndex) => {
        const leccion = lecciones.find(l => (l._id || l.id) == leccionId);
        activarLeccion(leccion, 'reto', retoIndex);
    };
}

function activarLeccion(leccion, tipo = 'contenido', indiceReto = 0) {
    if (!leccion) return;
    leccionActual = leccion;
    const playerContainer = document.getElementById('player-container');
    const infoContainer = document.getElementById('info-leccion-container');
    const titulo = document.getElementById('titulo-leccion-activa');
    const descripcion = document.getElementById('desc-leccion-activa');

    infoContainer.classList.remove('hidden');
    titulo.textContent = leccion.titulo;
    descripcion.textContent = leccion.descripcion || 'Sin descripción';

    if (tipo === 'contenido') {
        if (leccion.videoUrl && (leccion.videoUrl.includes('youtube') || leccion.videoUrl.includes('youtu.be'))) {
            const videoId = obtenerYoutubeId(leccion.videoUrl);
            playerContainer.innerHTML = `<iframe class="w-full h-full aspect-video" src="https://www.youtube.com/embed/${videoId}?rel=0" title="${leccion.titulo}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        } else if (leccion.imagenUrl) {
            playerContainer.innerHTML = `<img src="${leccion.imagenUrl}" class="w-full h-full object-contain bg-black" alt="${leccion.titulo}">`;
        } else {
             playerContainer.innerHTML = `
                <div class="flex flex-col items-center justify-center h-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-10 text-center">
                    <svg class="w-20 h-20 mb-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                    <h2 class="text-3xl font-bold">${leccion.titulo}</h2>
                    <p class="mt-4 opacity-90 max-w-lg">Contenido de lectura. Revisa la descripción y los retos.</p>
                </div>`;
        }
    } else if (tipo === 'reto') {
        const reto = leccion.retos[indiceReto];
        playerContainer.innerHTML = `
            <div class="p-8 h-full overflow-y-auto bg-white flex flex-col items-center justify-center text-center">
                <div class="bg-yellow-100 p-4 rounded-full mb-4">
                    <svg class="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                </div>
                <h3 class="text-2xl font-bold text-gray-800 mb-2">Reto: ${reto.titulo || 'Desafío Práctico'}</h3>
                <p class="text-gray-600 mb-6 max-w-lg">${reto.instrucciones || 'Completa este ejercicio para avanzar.'}</p>
                <button class="bg-primary hover:bg-primary-700 text-white px-8 py-3 rounded-full shadow-lg transition transform hover:scale-105" onclick="alert('Aquí se abriría el editor de código o el input del reto')">Comenzar Reto</button>
            </div>`;
    }
}

function obtenerYoutubeId(url) {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}
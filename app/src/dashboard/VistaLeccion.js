import { LeccionService } from '../api/LeccionService.js';
import RetoAPI from '../api/RetoAPI.js'; 

class VistaLeccion extends HTMLElement {
    constructor() {
        super();
        this.leccionActual = null;
        this.retos = [];
    }

    async connectedCallback() {
        this.cursoId = this.getAttribute('cursoId');
        this.leccionId = this.getAttribute('leccionId');

        console.log(" > IDs recibidos:", this.cursoId, this.leccionId);

        // Loader inicial
        this.innerHTML = `
            <div class="flex flex-col items-center justify-center h-screen bg-gray-50">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
                <p class="text-gray-500">Cargando contenido...</p>
            </div>
        `;

        try {
            // 1. Cargar Datos
            const [respuestaLecciones, respuestaRetos] = await Promise.all([
                LeccionService.getByCursoId(this.cursoId),
                RetoAPI.obtenerRetosPorLeccion(this.leccionId)
            ]);

            const listaLecciones = respuestaLecciones.data || respuestaLecciones || [];
            this.retos = respuestaRetos.data || respuestaRetos || [];

            // 2. Buscar lección actual
            if (Array.isArray(listaLecciones)) {
                this.leccionActual = listaLecciones.find(
                    x => (x.id || x._id).toString() === this.leccionId.toString()
                );
            }

            // 3. Renderizar
            if (this.leccionActual) {
                this.leccionActual.retos = this.retos;
                this.renderLayout();
            } else {
                this.innerHTML = `<div class="p-10 text-center text-red-500"><h1>Error 404: Lección no encontrada</h1><button onclick="window.history.back()">Regresar</button></div>`;
            }

        } catch (error) {
            console.error("ERROR FATAL:", error);
            if(this.leccionActual) {
                 this.leccionActual.retos = [];
                 this.renderLayout();
            } else {
                this.innerHTML = `<h1 style="color:red">Error JS: ${error.message}</h1>`;
            }
        }
    }

    renderLayout() {
        const leccion = this.leccionActual;
        const retos = this.retos;

        this.innerHTML = `
        <div class="font-sans min-h-screen bg-gray-50 pb-10">
            
            <div class="bg-white border-b px-6 py-4 flex flex-col md:flex-row justify-between items-center sticky top-0 z-20 shadow-sm gap-4">
                <div class="flex items-center gap-3 w-full md:w-auto">
                    <button onclick="window.history.back()" class="text-gray-500 hover:text-primary-600 transition p-2 rounded-full hover:bg-gray-100">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                    </button>
                    <div>
                        <p class="text-xs text-gray-400 uppercase font-bold tracking-wider">Modo Edición</p>
                        <h1 class="font-bold text-gray-800 text-lg truncate max-w-md">${leccion.titulo}</h1>
                    </div>
                </div>
                
                <div class="flex items-center gap-3 w-full md:w-auto justify-end">
                    
                    <button id="btn-eliminar-leccion" class="text-red-500 hover:bg-red-50 border border-red-200 px-3 py-2 rounded-lg text-sm font-bold transition flex items-center gap-2" title="Eliminar Lección">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        <span class="hidden sm:inline">Eliminar</span>
                    </button>

                    <div class="w-px h-6 bg-gray-300 mx-1"></div>

                    <button id="btn-add-reto" class="text-primary-700 bg-primary-50 hover:bg-primary-100 border border-primary-200 px-4 py-2 rounded-lg text-sm font-bold transition flex items-center gap-2">
                        <span>+ Reto</span>
                    </button>

                    <button id="btn-guardar" class="bg-gray-800 hover:bg-black text-white px-6 py-2 rounded-lg text-sm font-bold transition flex items-center gap-2 shadow-lg hover:shadow-xl transform active:scale-95">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                        <span>Guardar</span>
                    </button>
                </div>
            </div>

            <div class="max-w-[1600px] mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                <div class="lg:col-span-8 flex flex-col gap-4 sticky top-24">
                    <div id="main-display-area" class="bg-white rounded-2xl shadow-lg overflow-hidden min-h-[400px] border border-gray-200 relative transition-all duration-300">
                        </div>

                    <div id="info-area" class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 id="titulo-activo" class="text-2xl font-bold text-gray-800 mb-2"></h2>
                        <p id="desc-activa" class="text-gray-600 leading-relaxed"></p>
                    </div>
                </div>

                <div class="lg:col-span-4 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden flex flex-col h-auto max-h-[calc(100vh-120px)]">
                    <div class="p-4 border-b bg-gray-50 flex justify-between items-center">
                        <h3 class="font-bold text-gray-700">Retos Configurados</h3>
                        <span class="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full font-bold">${retos.length}</span>
                    </div>
                    
                    <div id="lista-retos" class="overflow-y-auto custom-scrollbar p-2 space-y-2">
                        <button id="btn-ver-leccion" class="w-full text-left p-3 rounded-lg border border-indigo-100 bg-indigo-50 text-indigo-700 font-bold hover:bg-indigo-100 transition flex items-center gap-2">
                            <span>📺</span> Ver Configuración Lección
                        </button>

                        <div class="border-t border-gray-100 my-2"></div>
                        
                        ${this.renderListaRetos(retos)}
                    </div>
                </div>

            </div>
        </div>
        `;

        this.setupListeners(retos);
        this.mostrarInfoLeccion();
    }

    renderListaRetos(retos) {
        if (!retos || retos.length === 0) {
            return `<div class="text-center py-8 text-gray-400 text-sm flex flex-col items-center"><span class="text-2xl mb-2">🤷‍♂️</span>No hay retos creados.</div>`;
        }

        return retos.map((reto, index) => `
            <div class="border border-gray-100 rounded-xl overflow-hidden bg-white hover:shadow-md transition group">
                <button class="w-full text-left p-4 flex justify-between items-center" id="btn-reto-${index}">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center text-xs font-bold border border-yellow-200">
                            ${index + 1}
                        </div>
                        <div>
                            <h4 class="font-semibold text-gray-700 text-sm group-hover:text-primary-600 transition">${reto.titulo || 'Reto sin título'}</h4>
                            <p class="text-[10px] text-gray-400 uppercase font-bold tracking-wide">${reto.tipo || 'Práctico'}</p>
                        </div>
                    </div>
                    <span class="text-gray-300 group-hover:text-primary-500 transition">👉</span>
                </button>
            </div>
        `).join('');
    }

    setupListeners(retos) {
        // 1. ELIMINAR LECCIÓN (NUEVO)
        const btnEliminarLeccion = this.querySelector('#btn-eliminar-leccion');
        if (btnEliminarLeccion) {
            btnEliminarLeccion.addEventListener('click', () => this.eliminarLeccion());
        }

        // 2. Guardar y Volver
        const btnGuardar = this.querySelector('#btn-guardar');
        if (btnGuardar) {
            btnGuardar.addEventListener('click', () => window.history.back());
        }

        // 3. Agregar Reto
        const btnAddReto = this.querySelector('#btn-add-reto');
        if (btnAddReto) {
            btnAddReto.addEventListener('click', () => {
                import('../retos/crearRetoMenu.js').then(() => {
                    const modal = document.createElement('crear-reto-menu');
                    modal.setAttribute('cursoId', this.cursoId);
                    modal.setAttribute('leccionId', this.leccionId);
                    document.body.appendChild(modal);
                    
                    modal.addEventListener('reto-guardado', () => {
                        this.connectedCallback(); 
                    });
                });
            });
        }

        // 4. Ver Lección
        this.querySelector('#btn-ver-leccion').addEventListener('click', () => {
            this.mostrarInfoLeccion();
        });

        // 5. Lista de Retos
        retos.forEach((reto, index) => {
            const btn = this.querySelector(`#btn-reto-${index}`);
            if (btn) btn.addEventListener('click', () => this.mostrarInfoReto(reto, index));
        });
    }

    // --- LÓGICA DE ELIMINAR LECCIÓN ---
    async eliminarLeccion() {
        if (!confirm("⚠️ ¿Estás seguro de que quieres eliminar esta lección?\n\nEsta acción borrará todos los retos asociados y no se puede deshacer.")) {
            return;
        }

        const btn = this.querySelector('#btn-eliminar-leccion');
        const originalContent = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = `<span class="animate-spin h-4 w-4 border-2 border-red-500 border-t-transparent rounded-full mr-2"></span> Borrando...`;

        try {
            console.log("Eliminando lección ID:", this.leccionId);
            
            // Llamada al servicio
            await LeccionService.delete(this.leccionId);
            
            // ÉXITO: Redirigir al detalle del curso (el padre)
            window.location.hash = `#/`;

        } catch (error) {
            console.error(error);
            alert("Error al eliminar la lección: " + error.message);
            btn.disabled = false;
            btn.innerHTML = originalContent;
        }
    }

    mostrarInfoLeccion() {
        const leccion = this.leccionActual;
        const displayArea = this.querySelector('#main-display-area');
        
        const vidUrl = leccion.videoUrl || (leccion.multimedia && leccion.multimedia[0]?.URL);
        let contentHTML = '';
        if (vidUrl && (vidUrl.includes('youtube') || vidUrl.includes('youtu.be'))) {
            const id = vidUrl.split('v=')[1] || vidUrl.split('/').pop();
            contentHTML = `<iframe class="w-full h-full aspect-video" src="https://www.youtube.com/embed/${id}" frameborder="0" allowfullscreen></iframe>`;
        } else {
            contentHTML = `<div class="flex flex-col items-center justify-center h-full bg-slate-900 text-white p-10 text-center min-h-[400px]"><div class="text-6xl mb-4">📺</div><h2 class="text-3xl font-bold mb-2">Video de la Lección</h2><p class="opacity-60">Sin video asignado.</p></div>`;
        }
        displayArea.innerHTML = contentHTML;

        this.querySelector('#titulo-activo').textContent = leccion.titulo;
        this.querySelector('#desc-activa').innerHTML = leccion.descripcion || 'Sin descripción.';
    }

    mostrarInfoReto(reto, index) {
        const displayArea = this.querySelector('#main-display-area');

        displayArea.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full bg-yellow-50 p-10 text-center min-h-[400px] animate-fade-in">
                <div class="bg-yellow-100 p-6 rounded-full mb-6 text-5xl shadow-sm">🏆</div>
                <h2 class="text-3xl font-bold text-gray-800 mb-2">Reto #${index + 1}: ${reto.titulo}</h2>
                
                <div class="bg-white p-6 rounded-xl shadow-sm border border-yellow-100 max-w-lg w-full mt-4 text-left">
                    <p class="text-xs text-yellow-600 uppercase font-bold mb-2 tracking-wider">Instrucciones</p>
                    <p class="text-gray-700 text-base leading-relaxed">${reto.descripcion || reto.instrucciones || 'Sin instrucciones.'}</p>
                    
                    ${reto.tipo === 'opcion_multiple' ? 
                        `<div class="mt-4 pt-4 border-t border-gray-100">
                            <p class="text-xs text-gray-400 font-bold uppercase mb-2">Opciones:</p>
                            <ul class="list-disc list-inside text-sm text-gray-600">
                                ${(reto.preguntas && reto.preguntas[0] && reto.preguntas[0].respuestas) 
                                    ? reto.preguntas[0].respuestas.map(r => `<li>${r.contenido} ${r.es_correcta ? '✅' : ''}</li>`).join('') 
                                    : '<li>Ver detalle para opciones</li>'}
                            </ul>
                         </div>` 
                    : ''}
                </div>
                
                <div class="flex gap-4 mt-8">
                    <button id="btn-eliminar-reto-actual" class="px-6 py-2 bg-red-50 text-red-600 border border-red-100 rounded-lg hover:bg-red-100 font-medium transition flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        Eliminar Reto
                    </button>
                </div>
            </div>
        `;

        this.querySelector('#titulo-activo').textContent = `Detalles del Reto`;
        this.querySelector('#desc-activa').innerHTML = `Visualizando configuración.`;

        const btnEliminar = displayArea.querySelector('#btn-eliminar-reto-actual');
        if (btnEliminar) {
            btnEliminar.addEventListener('click', () => {
                const retoId = reto._id || reto.id;
                this.eliminarReto(retoId);
            });
        }
    }

    async eliminarReto(retoId) {
        if(!confirm("¿Eliminar este reto permanentemente?")) return;
        try {
            await RetoAPI.eliminarReto(retoId);
            this.connectedCallback();
        } catch(e) {
            alert("Error al eliminar: " + e.message);
        }
    }
}

if (!customElements.get('vista-leccion')) {
    customElements.define('vista-leccion', VistaLeccion);
}

export default VistaLeccion;
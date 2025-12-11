import { LeccionService } from '../api/LeccionService.js';
import RetoAPI from '../api/RetoAPI.js'; 

class VistaLeccion extends HTMLElement {
    constructor() {
        super();
        this.leccionActual = null;
        this.retos = [];
        this.listeners = [];
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
                    
                    <button id="btn-editar-leccion" class="text-blue-600 hover:bg-blue-50 border border-blue-200 px-3 py-2 rounded-lg text-sm font-bold transition flex items-center gap-2" title="Editar Lección">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                        <span class="hidden sm:inline">Editar</span>
                    </button>

                    <button id="btn-eliminar-leccion" class="text-red-500 hover:bg-red-50 border border-red-200 px-3 py-2 rounded-lg text-sm font-bold transition flex items-center gap-2" title="Eliminar Lección">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        <span class="hidden sm:inline">Eliminar</span>
                    </button>

                    <div class="w-px h-6 bg-gray-300 mx-1"></div>

                    <button id="btn-add-reto" class="text-primary-700 bg-primary-50 hover:bg-primary-100 border border-primary-200 px-4 py-2 rounded-lg text-sm font-bold transition flex items-center gap-2">
                        <span>+ Reto</span>
                    </button>

                    <button id="btn-volver" class="bg-gray-800 hover:bg-black text-white px-6 py-2 rounded-lg text-sm font-bold transition flex items-center gap-2 shadow-lg hover:shadow-xl transform active:scale-95">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                        <span>Volver</span>
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
        
        <style>
            @keyframes fade-in {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes fade-in-right {
                from { opacity: 0; transform: translateX(20px); }
                to { opacity: 1; transform: translateX(0); }
            }
            .animate-fade-in {
                animation: fade-in 0.2s ease-out;
            }
            .animate-fade-in-right {
                animation: fade-in-right 0.3s ease-out;
            }
        </style>
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
        // 1. EDITAR LECCIÓN
        const btnEditarLeccion = this.querySelector('#btn-editar-leccion');
        if (btnEditarLeccion) {
            btnEditarLeccion.addEventListener('click', () => this.abrirModalEdicion());
        }

        // 2. ELIMINAR LECCIÓN
        const btnEliminarLeccion = this.querySelector('#btn-eliminar-leccion');
        if (btnEliminarLeccion) {
            btnEliminarLeccion.addEventListener('click', () => this.eliminarLeccion());
        }

        // 3. Volver
        const btnVolver = this.querySelector('#btn-volver');
        if (btnVolver) {
            btnVolver.addEventListener('click', () => window.history.back());
        }

        // 4. Agregar Reto
        const btnAddReto = this.querySelector('#btn-add-reto');
        if (btnAddReto) {
            console.log("[VistaLeccion] Botón 'Agregar Reto' encontrado y listener agregado");
            btnAddReto.addEventListener('click', () => {
                console.log("[VistaLeccion] Click en 'Agregar Reto', importando crearRetoMenu.js...");
                import('../retos/crearRetoMenu.js').then(() => {
                    console.log("[VistaLeccion] crearRetoMenu.js importado correctamente");
                    const modal = document.createElement('crear-reto-menu');
                    modal.setAttribute('cursoId', this.cursoId);
                    modal.setAttribute('leccionId', this.leccionId);
                    document.body.appendChild(modal);
                    console.log("[VistaLeccion] Modal 'crear-reto-menu' agregado al DOM");
                    
                    modal.addEventListener('reto-guardado', () => {
                        console.log("[VistaLeccion] Evento 'reto-guardado' recibido, recargando lección...");
                        this.connectedCallback(); 
                    });
                }).catch(err => {
                    console.error("[VistaLeccion] ERROR al importar crearRetoMenu.js:", err);
                });
            });
        } else {
            console.warn("[VistaLeccion] Botón 'Agregar Reto' NO encontrado en el DOM");
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

    // --- LÓGICA DE EDICIÓN DE LECCIÓN ---
    abrirModalEdicion() {
        const leccion = this.leccionActual;
        const videoURL = leccion.multimedia && leccion.multimedia[0] ? leccion.multimedia[0].URL : '';

        // Crear modal de edición
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in';
        modal.innerHTML = `
            <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div class="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center rounded-t-2xl z-10">
                    <h2 class="text-2xl font-bold text-gray-800">Editar Lección</h2>
                    <button id="modal-cerrar" class="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                </div>

                <form id="form-editar-leccion" class="p-6 space-y-5">
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Título de la lección *</label>
                        <input 
                            type="text" 
                            id="edit-titulo" 
                            value="${leccion.titulo || ''}" 
                            required
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            placeholder="Ej: Introducción a Variables"
                        />
                    </div>

                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">URL del Video/Multimedia</label>
                        <input 
                            type="url" 
                            id="edit-video-url" 
                            value="${videoURL}" 
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                            placeholder="https://youtu.be/..."
                        />
                        <p class="text-xs text-gray-500 mt-1">YouTube, Vimeo o cualquier URL de video</p>
                    </div>

                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-2">Descripción</label>
                        <textarea 
                            id="edit-descripcion" 
                            rows="5"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                            placeholder="Describe el contenido de esta lección..."
                        >${leccion.descripcion || ''}</textarea>
                    </div>

                    <div class="flex justify-end gap-3 pt-4 border-t">
                        <button 
                            type="button" 
                            id="modal-cancelar"
                            class="px-6 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-all"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit"
                            class="px-6 py-2.5 bg-primary-600 text-white hover:bg-primary-700 rounded-lg font-medium transition-all shadow-md flex items-center gap-2"
                        >
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(modal);

        // Event listeners del modal
        const cerrar = () => document.body.removeChild(modal);
        
        modal.querySelector('#modal-cerrar').addEventListener('click', cerrar);
        modal.querySelector('#modal-cancelar').addEventListener('click', cerrar);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) cerrar();
        });

        modal.querySelector('#form-editar-leccion').addEventListener('submit', (e) => {
            e.preventDefault();
            this.guardarEdicionLeccion(modal);
        });
    }

    async guardarEdicionLeccion(modal) {
        const form = modal.querySelector('#form-editar-leccion');
        const btnSubmit = form.querySelector('button[type="submit"]');
        const textoOriginal = btnSubmit.innerHTML;

        try {
            btnSubmit.disabled = true;
            btnSubmit.innerHTML = `
                <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Guardando...
            `;

            const nuevoTitulo = form.querySelector('#edit-titulo').value.trim();
            const nuevaDescripcion = form.querySelector('#edit-descripcion').value.trim();
            const nuevaVideoURL = form.querySelector('#edit-video-url').value.trim();

            if (!nuevoTitulo) {
                throw new Error('El título es requerido');
            }

            // Construir objeto de multimedia
            const multimediaData = nuevaVideoURL ? [{
                titulo: `Video de ${nuevoTitulo}`,
                URL: nuevaVideoURL
            }] : [];

            const datosActualizados = {
                titulo: nuevoTitulo,
                descripcion: nuevaDescripcion,
                multimedia: multimediaData,
                id_curso: this.cursoId
            };

            console.log('Actualizando lección:', datosActualizados);

            await LeccionService.update(this.leccionId, datosActualizados);

            // Actualizar datos locales
            this.leccionActual.titulo = nuevoTitulo;
            this.leccionActual.descripcion = nuevaDescripcion;
            this.leccionActual.multimedia = multimediaData;

            // Cerrar modal
            document.body.removeChild(modal);

            // Mostrar notificación de éxito
            this.mostrarNotificacion('✅ Lección actualizada exitosamente', 'success');

            // Recargar la vista para mostrar cambios
            this.connectedCallback();

        } catch (error) {
            console.error('Error al guardar cambios:', error);
            this.mostrarNotificacion('❌ Error al actualizar la lección: ' + error.message, 'error');
            btnSubmit.innerHTML = textoOriginal;
            btnSubmit.disabled = false;
        }
    }

    mostrarNotificacion(mensaje, tipo = 'info') {
        const colores = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            info: 'bg-blue-500'
        };

        const notif = document.createElement('div');
        notif.className = `fixed top-4 right-4 ${colores[tipo]} text-white px-6 py-4 rounded-lg shadow-xl z-[100] animate-fade-in-right flex items-center gap-3`;
        notif.innerHTML = `
            <span class="font-medium">${mensaje}</span>
            <button onclick="this.parentElement.remove()" class="ml-2 hover:bg-white hover:bg-opacity-20 rounded p-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
        `;
        
        document.body.appendChild(notif);
        setTimeout(() => notif.remove(), 5000);
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
                    <button id="btn-editar-reto-actual" class="px-6 py-2 bg-blue-50 text-blue-600 border border-blue-100 rounded-lg hover:bg-blue-100 font-medium transition flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                        Editar Reto
                    </button>
                    <button id="btn-eliminar-reto-actual" class="px-6 py-2 bg-red-50 text-red-600 border border-red-100 rounded-lg hover:bg-red-100 font-medium transition flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        Eliminar Reto
                    </button>
                </div>
            </div>
        `;

        this.querySelector('#titulo-activo').textContent = `Detalles del Reto`;
        this.querySelector('#desc-activa').innerHTML = `Visualizando configuración.`;

        const btnEditar = displayArea.querySelector('#btn-editar-reto-actual');
        if (btnEditar) {
            btnEditar.addEventListener('click', () => {
                this.abrirModalEdicionReto(reto);
            });
        }

        const btnEliminar = displayArea.querySelector('#btn-eliminar-reto-actual');
        if (btnEliminar) {
            btnEliminar.addEventListener('click', () => {
                const retoId = reto._id || reto.id;
                this.eliminarReto(retoId);
            });
        }
    }

    // --- LÓGICA DE EDICIÓN DE RETO ---
    abrirModalEdicionReto(reto) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-[70] flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in';
        
        // Determinar tipo de reto
        const tipoReto = reto.preguntas && reto.preguntas[0] ? reto.preguntas[0].tipo : 'abierta';
        const pregunta = reto.preguntas && reto.preguntas[0] ? reto.preguntas[0] : null;
        const respuestas = pregunta && pregunta.respuestas ? pregunta.respuestas : [];

        modal.innerHTML = `
            <div class="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div class="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10 rounded-t-xl">
                    <h2 class="text-xl font-bold text-gray-800">Editar Reto</h2>
                    <button id="modal-cerrar-reto" class="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-gray-100">✕</button>
                </div>

                <form id="form-editar-reto" class="p-6 space-y-5">
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-1">Título del Reto *</label>
                        <input 
                            id="edit-reto-titulo" 
                            type="text" 
                            value="${reto.titulo || ''}" 
                            required
                            class="w-full p-3 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition" 
                            placeholder="Ej: Quiz Rápido"
                        />
                    </div>
                    
                    <div>
                        <label class="block text-sm font-bold text-gray-700 mb-1">Pregunta/Descripción *</label>
                        <textarea 
                            id="edit-reto-descripcion" 
                            required
                            class="w-full p-3 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition resize-none" 
                            rows="3" 
                            placeholder="Escribe la pregunta o descripción del reto..."
                        >${reto.descripcion || ''}</textarea>
                    </div>

                    ${tipoReto === 'opcion_multiple' ? `
                    <div class="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <label class="block text-sm font-bold text-blue-800 mb-3">Opciones de Respuesta</label>
                        
                        <div class="flex gap-2 mb-3">
                            <input id="input-nueva-opcion" type="text" class="flex-1 p-2 border border-blue-200 rounded-lg" placeholder="Nueva opción...">
                            <button type="button" id="btn-agregar-opcion" class="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700 font-bold transition">+</button>
                        </div>

                        <div id="lista-opciones-edit" class="space-y-2">
                            ${respuestas.map((resp, idx) => `
                                <div class="flex items-center gap-2 bg-white p-3 rounded-lg border border-blue-100 opciones-item" data-index="${idx}">
                                    <input type="radio" name="correcta" value="${idx}" class="h-4 w-4 text-primary-600 cursor-pointer" ${resp.es_correcta ? 'checked' : ''}>
                                    <input type="text" value="${resp.contenido}" class="flex-1 text-sm text-gray-700 border-0 focus:outline-none bg-transparent opcion-texto" />
                                    <button type="button" class="btn-eliminar-opcion text-red-400 hover:text-red-600 font-bold px-2">×</button>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}

                    <div class="flex justify-end gap-3 pt-4 border-t">
                        <button type="button" id="modal-cancelar-reto" class="px-6 py-2 text-gray-600 hover:bg-gray-200 rounded-lg font-medium transition">
                            Cancelar
                        </button>
                        <button type="submit" class="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 shadow-md font-medium transition flex items-center gap-2">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(modal);

        // Event listeners
        const cerrar = () => document.body.removeChild(modal);
        modal.querySelector('#modal-cerrar-reto').addEventListener('click', cerrar);
        modal.querySelector('#modal-cancelar-reto').addEventListener('click', cerrar);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) cerrar();
        });

        // Agregar nueva opción
        const btnAgregar = modal.querySelector('#btn-agregar-opcion');
        if (btnAgregar) {
            btnAgregar.addEventListener('click', () => {
                const input = modal.querySelector('#input-nueva-opcion');
                const texto = input.value.trim();
                if (!texto) return;

                const lista = modal.querySelector('#lista-opciones-edit');
                const nuevoIdx = lista.children.length;
                const nuevoItem = document.createElement('div');
                nuevoItem.className = 'flex items-center gap-2 bg-white p-3 rounded-lg border border-blue-100 opciones-item';
                nuevoItem.dataset.index = nuevoIdx;
                nuevoItem.innerHTML = `
                    <input type="radio" name="correcta" value="${nuevoIdx}" class="h-4 w-4 text-primary-600 cursor-pointer">
                    <input type="text" value="${texto}" class="flex-1 text-sm text-gray-700 border-0 focus:outline-none bg-transparent opcion-texto" />
                    <button type="button" class="btn-eliminar-opcion text-red-400 hover:text-red-600 font-bold px-2">×</button>
                `;
                
                nuevoItem.querySelector('.btn-eliminar-opcion').addEventListener('click', () => {
                    nuevoItem.remove();
                });

                lista.appendChild(nuevoItem);
                input.value = '';
            });
        }

        // Eliminar opciones existentes
        modal.querySelectorAll('.btn-eliminar-opcion').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.target.closest('.opciones-item').remove();
            });
        });

        // Submit form
        modal.querySelector('#form-editar-reto').addEventListener('submit', (e) => {
            e.preventDefault();
            this.guardarEdicionReto(reto, modal);
        });
    }

    async guardarEdicionReto(retoOriginal, modal) {
        const form = modal.querySelector('#form-editar-reto');
        const btnSubmit = form.querySelector('button[type="submit"]');
        const textoOriginal = btnSubmit.innerHTML;

        try {
            btnSubmit.disabled = true;
            btnSubmit.innerHTML = `
                <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Guardando...
            `;

            const nuevoTitulo = form.querySelector('#edit-reto-titulo').value.trim();
            const nuevaDescripcion = form.querySelector('#edit-reto-descripcion').value.trim();

            if (!nuevoTitulo || !nuevaDescripcion) {
                throw new Error('Título y descripción son requeridos');
            }

            // Construir datos actualizados
            const datosActualizados = {
                titulo: nuevoTitulo,
                descripcion: nuevaDescripcion,
                lecciones: [this.leccionId]
            };

            // Si es opción múltiple, obtener las opciones
            const listaOpciones = form.querySelector('#lista-opciones-edit');
            if (listaOpciones) {
                const items = listaOpciones.querySelectorAll('.opciones-item');
                const respuestas = [];
                
                items.forEach((item, idx) => {
                    const radio = item.querySelector('input[type="radio"]');
                    const textoInput = item.querySelector('.opcion-texto');
                    
                    respuestas.push({
                        contenido: textoInput.value.trim(),
                        es_correcta: radio.checked
                    });
                });

                if (respuestas.length < 2) {
                    throw new Error('Debes tener al menos 2 opciones de respuesta');
                }

                const tieneCorrecta = respuestas.some(r => r.es_correcta);
                if (!tieneCorrecta) {
                    throw new Error('Debes marcar una respuesta como correcta');
                }

                datosActualizados.preguntas = [{
                    contenido: nuevaDescripcion,
                    tipo: 'opcion_multiple',
                    respuestas: respuestas
                }];
            } else {
                // Reto abierto
                datosActualizados.preguntas = [{
                    contenido: nuevaDescripcion,
                    tipo: 'abierta',
                    respuestas: []
                }];
            }

            console.log('Actualizando reto:', datosActualizados);

            const retoId = retoOriginal._id || retoOriginal.id;
            await RetoAPI.actualizarReto(retoId, datosActualizados);

            document.body.removeChild(modal);
            this.mostrarNotificacion('✅ Reto actualizado exitosamente', 'success');
            this.connectedCallback(); // Recargar vista

        } catch (error) {
            console.error('Error al actualizar reto:', error);
            this.mostrarNotificacion('❌ ' + error.message, 'error');
            btnSubmit.innerHTML = textoOriginal;
            btnSubmit.disabled = false;
        }
    }

    // --- LÓGICA DE ELIMINAR RETO ---
    async eliminarReto(retoId) {
        if(!confirm("¿Eliminar este reto permanentemente?")) return;
        try {
            await RetoAPI.eliminarReto(retoId);
            this.connectedCallback();
        } catch(e) {
            alert("Error al eliminar: " + e.message);
        }
    }

    disconnectedCallback() {
        // Limpiar todos los event listeners
        this.listeners.forEach(({ element, event, handler }) => {
            if (element && element.removeEventListener) {
                element.removeEventListener(event, handler);
            }
        });
        this.listeners = [];
    }

    addListener(element, event, handler) {
        if (element && element.addEventListener) {
            element.addEventListener(event, handler);
            this.listeners.push({ element, event, handler });
        }
    }
}

if (!customElements.get('vista-leccion')) {
    customElements.define('vista-leccion', VistaLeccion);
}

export default VistaLeccion;
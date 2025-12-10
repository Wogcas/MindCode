import { LeccionService } from '../api/LeccionService.js';

class VistaLeccion extends HTMLElement {
    constructor() {
        super();
        this.leccionActual = null; 
    }

    async connectedCallback() {
        this.cursoId = this.getAttribute('cursoId');
        this.leccionId = this.getAttribute('leccionId');

        console.log(" > IDs recibidos:", this.cursoId, this.leccionId);

        // Loader inicial
        this.innerHTML = `
            <div class="flex flex-col items-center justify-center h-screen bg-gray-50">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
                <p class="text-gray-500">Cargando editor de lección...</p>
            </div>
        `;

        try {
            // 1. Obtener datos
            const respuesta = await LeccionService.getByCursoId(this.cursoId);
            const listaLecciones = respuesta.data || respuesta || [];

            // 2. Buscar la lección específica
            if (Array.isArray(listaLecciones)) {
                this.leccionActual = listaLecciones.find(
                    x => (x.id || x._id).toString() === this.leccionId.toString()
                );
            }

            // 3. Renderizar layout
            if (this.leccionActual) {
                console.log("%c [EXITO] Editor cargado para:", "color: green", this.leccionActual.titulo);
                this.renderLayout();
            } else {
                this.innerHTML = `<div class="p-10 text-center text-red-500"><h1>Error 404: Lección no encontrada</h1><button onclick="window.history.back()">Regresar</button></div>`;
            }

        } catch (error) {
            console.error("ERROR FATAL:", error);
            this.innerHTML = `<h1 style="color:red">Error JS: ${error.message}</h1>`;
        }
    }

    renderLayout() {
        const leccion = this.leccionActual;
        const retos = leccion.retos || [];

        this.innerHTML = `
        <div class="font-sans min-h-screen bg-gray-50 pb-10">
            
            <div class="bg-white border-b px-6 py-4 flex flex-col md:flex-row justify-between items-center sticky top-0 z-20 shadow-sm gap-4">
                
                <div class="flex items-center gap-3 w-full md:w-auto">
                    <button onclick="window.history.back()" class="text-gray-500 hover:text-primary-600 transition p-2 rounded-full hover:bg-gray-100" title="Cancelar y Volver">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                    </button>
                    <div>
                        <p class="text-xs text-gray-400 uppercase font-bold tracking-wider">Modo Edición</p>
                        <h1 class="font-bold text-gray-800 text-lg truncate max-w-md">${leccion.titulo}</h1>
                    </div>
                </div>
                
                <div class="flex items-center gap-3 w-full md:w-auto justify-end">
                    <button onclick="alert('Próximamente: Modal para crear reto')" class="text-primary-700 bg-primary-50 hover:bg-primary-100 border border-primary-200 px-4 py-2 rounded-lg text-sm font-bold transition flex items-center gap-2">
                        <span>+ Reto</span>
                    </button>

                    <button id="btn-guardar" class="bg-gray-800 hover:bg-black text-white px-6 py-2 rounded-lg text-sm font-bold transition flex items-center gap-2 shadow-lg hover:shadow-xl transform active:scale-95">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                        <span>Guardar y Volver</span>
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
                    <span class="text-gray-300 group-hover:text-primary-500 transition">✏️</span>
                </button>
            </div>
        `).join('');
    }

    setupListeners(retos) {
        // 1. Botón "Guardar y Volver"
        const btnGuardar = this.querySelector('#btn-guardar');
        if (btnGuardar) {
            btnGuardar.addEventListener('click', () => {
                // AQUÍ AGREGARÍAS LA LLAMADA AL BACKEND PARA GUARDAR
                // await LeccionService.update(this.leccionId, datosNuevos);
                
                // Simulación visual
                btnGuardar.innerHTML = `
                    <svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                    <span>Guardando...</span>
                `;
                
                setTimeout(() => {
                    // Regresar a la pantalla anterior
                    window.history.back();
                }, 800);
            });
        }

        // 2. Botón Ver Lección
        this.querySelector('#btn-ver-leccion').addEventListener('click', () => {
            this.mostrarInfoLeccion();
        });

        // 3. Botones de Retos
        retos.forEach((reto, index) => {
            const btn = this.querySelector(`#btn-reto-${index}`);
            if (btn) btn.addEventListener('click', () => this.mostrarInfoReto(reto, index));
        });
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
            contentHTML = `
                <div class="flex flex-col items-center justify-center h-full bg-slate-900 text-white p-10 text-center min-h-[400px]">
                    <div class="text-6xl mb-4">📺</div>
                    <h2 class="text-3xl font-bold mb-2">Configuración de Video</h2>
                    <p class="opacity-60 max-w-md">Aquí se mostrará el video de la lección. Actualmente no hay video asignado o el formato no es compatible.</p>
                </div>`;
        }
        displayArea.innerHTML = contentHTML;

        this.querySelector('#titulo-activo').textContent = `Editando: ${leccion.titulo}`;
        this.querySelector('#desc-activa').innerHTML = leccion.descripcion || '<span class="italic text-gray-400">Sin descripción</span>';
    }

    mostrarInfoReto(reto, index) {
        const displayArea = this.querySelector('#main-display-area');

        displayArea.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full bg-yellow-50 p-10 text-center min-h-[400px] animate-fade-in">
                <div class="bg-yellow-100 p-6 rounded-full mb-6 text-5xl shadow-sm">🏆</div>
                <h2 class="text-3xl font-bold text-gray-800 mb-2">Reto #${index + 1}: ${reto.titulo}</h2>
                <div class="bg-white p-6 rounded-xl shadow-sm border border-yellow-100 max-w-lg w-full mt-4 text-left">
                    <p class="text-xs text-yellow-600 uppercase font-bold mb-2 tracking-wider">Instrucciones</p>
                    <p class="text-gray-700 text-base leading-relaxed">${reto.instrucciones || 'Sin instrucciones definidas.'}</p>
                </div>
                
                <div class="flex gap-4 mt-8">
                    <button class="px-6 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-medium transition shadow-sm" onclick="alert('Abrir modal editar reto')">
                        ✏️ Editar Contenido
                    </button>
                    <button class="px-6 py-2 bg-red-50 text-red-600 border border-red-100 rounded-lg hover:bg-red-100 font-medium transition" onclick="alert('Confirmar borrar reto')">
                        🗑️ Eliminar
                    </button>
                </div>
            </div>
        `;

        this.querySelector('#titulo-activo').textContent = `Detalles del Reto #${index + 1}`;
        this.querySelector('#desc-activa').innerHTML = `
            <div class="flex gap-4 mt-2">
                <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Puntos: ${reto.puntos || 0} XP</span>
                <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">Tipo: ${reto.tipo || 'General'}</span>
            </div>
        `;
    }
}

if (!customElements.get('vista-leccion')) {
    customElements.define('vista-leccion', VistaLeccion);
}

export default VistaLeccion;
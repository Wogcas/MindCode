import { cursoService } from '../api/CursoService.js';

class CrearCurso extends HTMLElement {
    constructor() {
        super();
        this.visibilidad = 'Público';
        this.imagenPreview = null;
        this.isLoading = false;
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.innerHTML = `
            <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 font-sans">
                <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-fade-in-up">
                    
                    <div class="flex justify-between items-center px-6 py-5 border-b border-gray-200">
                        <h2 class="text-3xl font-bold text-gray-800">Crear curso</h2>
                        <button id="closeBtn" class="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>

                    <div class="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar">
                        
                        <div class="mb-6">
                            <label class="block text-sm font-bold text-gray-700 mb-2">
                                Nombre del curso
                            </label>
                            <input 
                                type="text" 
                                id="nombreCurso"
                                placeholder="Ej. Introducción a JavaScript"
                                class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-all"
                            />
                        </div>

                        <div class="mb-6">
                            <label class="block text-sm font-bold text-gray-700 mb-2">
                                Descripción del curso
                            </label>
                            <textarea 
                                id="descripcionCurso"
                                placeholder="¿Qué aprenderán los estudiantes en este curso?"
                                rows="4"
                                class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-all resize-none"
                            ></textarea>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            <div>
                                <label class="block text-sm font-bold text-gray-700 mb-2">
                                    Imagen de portada
                                </label>
                                
                                <div class="relative aspect-video bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl overflow-hidden mb-3 group cursor-pointer hover:border-primary-500 transition-colors" id="imagenContainer">
                                    <input 
                                        type="file" 
                                        id="imagenInput" 
                                        accept="image/*"
                                        class="hidden"
                                    />
                                    
                                    <div id="imagenPlaceholder" class="absolute inset-0 flex flex-col items-center justify-center text-gray-400 group-hover:text-primary-500 transition-colors">
                                        <svg class="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                        </svg>
                                        <span class="text-sm font-medium">Click para subir</span>
                                    </div>

                                    <img id="imagenPreview" class="absolute inset-0 w-full h-full object-cover hidden" />
                                    
                                    <div id="compressionLoader" class="absolute inset-0 bg-white/80 flex items-center justify-center hidden">
                                        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label class="block text-sm font-bold text-gray-700 mb-2">
                                    Visibilidad
                                </label>
                                
                                <button class="visibilidad-option w-full flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl p-3 mb-3 transition-all hover:bg-primary-50 active" data-visibilidad="publico">
                                    <div class="p-2 bg-primary-100 rounded-lg text-primary-600">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                                    </div>
                                    <div class="flex-1 text-left">
                                        <span class="block font-semibold text-gray-900 text-sm">Público</span>
                                        <span class="block text-xs text-gray-500">Visible para todos</span>
                                    </div>
                                    <div class="radio-button"><div class="radio-inner"></div></div>
                                </button>

                                <button class="visibilidad-option w-full flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl p-3 transition-all hover:bg-primary-50" data-visibilidad="privado">
                                    <div class="p-2 bg-gray-100 rounded-lg text-gray-600">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                                    </div>
                                    <div class="flex-1 text-left">
                                        <span class="block font-semibold text-gray-900 text-sm">Privado</span>
                                        <span class="block text-xs text-gray-500">Solo con invitación</span>
                                    </div>
                                    <div class="radio-button"><div class="radio-inner"></div></div>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="flex gap-3 px-6 py-5 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                        <button id="cancelarBtn" class="flex-1 px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-all">
                            Cancelar
                        </button>
                        <button id="crearBtn" class="flex-1 px-6 py-2.5 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-all shadow-sm flex items-center justify-center gap-2">
                            <span id="btnText">Crear Curso</span>
                            <svg id="btnLoader" class="hidden animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <style>
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in-up { animation: fadeInUp 0.3s ease-out; }
                
                .radio-button { width: 20px; height: 20px; border-radius: 50%; border: 2px solid #D1D5DB; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
                .radio-inner { width: 10px; height: 10px; border-radius: 50%; background-color: #4F75C2; transform: scale(0); transition: all 0.2s; }
                
                .visibilidad-option.active { background-color: #EFF6FF; border-color: #BFDBFE; }
                .visibilidad-option.active .radio-button { border-color: #4F75C2; }
                .visibilidad-option.active .radio-inner { transform: scale(1); }
                
                /* Scrollbar personalizada */
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 3px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #9CA3AF; }
            </style>
        `;
    }

    setupEventListeners() {
        const closeBtn = this.querySelector('#closeBtn');
        const cancelarBtn = this.querySelector('#cancelarBtn');
        
        closeBtn.addEventListener('click', () => this.cerrarModal());
        cancelarBtn.addEventListener('click', () => this.cerrarModal());

        const crearBtn = this.querySelector('#crearBtn');
        crearBtn.addEventListener('click', () => this.crearCurso());

        // Lógica de visibilidad
        const visibilidadOptions = this.querySelectorAll('.visibilidad-option');
        visibilidadOptions.forEach(option => {
            option.addEventListener('click', () => {
                visibilidadOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                this.visibilidad = option.dataset.visibilidad === 'publico' ? 'Público' : 'Privado';
            });
        });

        // Lógica de Imagen (Mejorada con compresión)
        const imagenInput = this.querySelector('#imagenInput');
        const imagenContainer = this.querySelector('#imagenContainer');
        
        imagenContainer.addEventListener('click', () => imagenInput.click());

        imagenInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                // Mostrar loader de imagen
                this.querySelector('#compressionLoader').classList.remove('hidden');
                
                try {
                    // AQUÍ ESTÁ LA MAGIA: Comprimimos antes de guardar
                    const imagenComprimida = await this.comprimirImagen(file);
                    
                    this.imagenPreview = imagenComprimida;
                    const preview = this.querySelector('#imagenPreview');
                    const placeholder = this.querySelector('#imagenPlaceholder');
                    
                    preview.src = this.imagenPreview;
                    preview.classList.remove('hidden');
                    placeholder.classList.add('hidden');
                } catch (error) {
                    this.mostrarAlerta('Error al procesar la imagen', 'error');
                } finally {
                    this.querySelector('#compressionLoader').classList.add('hidden');
                }
            }
        });

        // Cerrar al dar click fuera
        this.querySelector('.fixed').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) this.cerrarModal();
        });
    }

    /**
     * Función Maestra para comprimir imágenes
     * Reduce tamaño (Max 800px) y Calidad (0.7)
     */
    comprimirImagen(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 800; // Ancho máximo
                    const scaleSize = MAX_WIDTH / img.width;
                    
                    // Si la imagen es más pequeña que el máximo, no redimensionar
                    const newWidth = (img.width > MAX_WIDTH) ? MAX_WIDTH : img.width;
                    const newHeight = (img.width > MAX_WIDTH) ? (img.height * scaleSize) : img.height;

                    canvas.width = newWidth;
                    canvas.height = newHeight;

                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, newWidth, newHeight);

                    // Convertir a JPEG con calidad 0.7 (70%)
                    // Esto reduce un archivo de 5MB a ~100KB
                    const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
                    resolve(dataUrl);
                };
                img.onerror = (error) => reject(error);
            };
            reader.onerror = (error) => reject(error);
        });
    }

    async crearCurso() {
        if (this.isLoading) return;

        const nombre = this.querySelector('#nombreCurso').value.trim();
        const descripcion = this.querySelector('#descripcionCurso').value.trim();

        if (!nombre || nombre.length < 3) {
            this.mostrarAlerta('El nombre es muy corto', 'error');
            return;
        }

        if (!descripcion || descripcion.length < 10) {
            this.mostrarAlerta('La descripción es muy corta', 'error');
            return;
        }

        try {
            this.setLoading(true);
            const usuario = JSON.parse(localStorage.getItem('usuario'));

            if (!usuario || !usuario.id) throw new Error('Usuario no identificado');

            const cursoData = {
                titulo: nombre,
                descripcion: descripcion,
                id_maestro: usuario.id,
                visibilidad: this.visibilidad,
                // Usamos la imagen comprimida o una por defecto
                imagen: this.imagenPreview || 'https://via.placeholder.com/800x450?text=Curso+MindCode'
            };

            const resultado = await cursoService.createCourse(cursoData);

            if (resultado.success) {
                // Evento para actualizar la lista sin recargar
                this.dispatchEvent(new CustomEvent('curso-creado', {
                    detail: { ...resultado.curso, ...cursoData },
                    bubbles: true,
                    composed: true
                }));

                this.mostrarAlerta('Curso creado exitosamente', 'success');
                setTimeout(() => this.cerrarModal(), 1500);
            }
        } catch (error) {
            console.error(error);
            this.mostrarAlerta('Error al crear el curso', 'error');
        } finally {
            this.setLoading(false);
        }
    }

    setLoading(loading) {
        this.isLoading = loading;
        const btn = this.querySelector('#crearBtn');
        const loader = this.querySelector('#btnLoader');
        const text = this.querySelector('#btnText');
        
        btn.disabled = loading;
        if(loading) {
            btn.classList.add('opacity-75', 'cursor-not-allowed');
            loader.classList.remove('hidden');
            text.textContent = 'Creando...';
        } else {
            btn.classList.remove('opacity-75', 'cursor-not-allowed');
            loader.classList.add('hidden');
            text.textContent = 'Crear Curso';
        }
    }

    mostrarAlerta(mensaje, tipo = 'info') {
        const colores = { success: 'bg-green-500', error: 'bg-red-500', info: 'bg-primary-500' };
        const alerta = document.createElement('div');
        alerta.className = `fixed top-4 left-1/2 transform -translate-x-1/2 z-[100] ${colores[tipo]} text-white px-6 py-3 rounded-lg shadow-xl font-medium animate-fade-in-up flex items-center gap-2`;
        alerta.innerHTML = `<span>${mensaje}</span>`;
        this.appendChild(alerta);
        setTimeout(() => alerta.remove(), 3000);
    }

    cerrarModal() {
        this.remove();
    }
}

customElements.define('crear-curso', CrearCurso);
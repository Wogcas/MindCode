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
            <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                    
                    <!-- Header -->
                    <div class="flex justify-between items-center px-6 py-5 border-b border-gray-200">
                        <h2 class="text-3xl font-semibold text-gray-900">Crear curso</h2>
                        <button id="closeBtn" class="text-gray-500 hover:text-gray-700 transition-colors">
                            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>

                    <!-- Content -->
                    <div class="flex-1 overflow-y-auto px-6 py-6">
                        
                        <!-- Nombre del curso -->
                        <div class="mb-6">
                            <label class="block text-base font-medium text-gray-900 mb-3">
                                Nombre del curso
                            </label>
                            <input 
                                type="text" 
                                id="nombreCurso"
                                placeholder="Ingrese el nombre del curso"
                                class="w-full px-4 py-3.5 bg-[#E8EFF7] border-0 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#4F75C2] focus:outline-none transition-all"
                            />
                        </div>

                        <!-- Descripción del curso -->
                        <div class="mb-6">
                            <label class="block text-base font-medium text-gray-900 mb-3">
                                Descripción del curso
                            </label>
                            <textarea 
                                id="descripcionCurso"
                                placeholder="Ingrese la descripción del curso"
                                rows="5"
                                class="w-full px-4 py-3.5 bg-[#E8EFF7] border-0 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#4F75C2] focus:outline-none transition-all resize-none"
                            ></textarea>
                        </div>

                        <!-- Imagen y Visibilidad (Grid responsive) -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            
                            <!-- Sección de Imagen -->
                            <div>
                                <label class="block text-base font-medium text-gray-900 mb-3">
                                    Imagen
                                </label>
                                
                                <div class="relative aspect-square bg-[#E8EFF7] rounded-xl overflow-hidden mb-3 group cursor-pointer" id="imagenContainer">
                                    <input 
                                        type="file" 
                                        id="imagenInput" 
                                        accept="image/*"
                                        class="hidden"
                                    />
                                    <div id="imagenPlaceholder" class="absolute inset-0 flex flex-col items-center justify-center">
                                        <svg class="w-16 h-16 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                        </svg>
                                    </div>
                                    <img id="imagenPreview" class="absolute inset-0 w-full h-full object-cover hidden" />
                                </div>
                                
                                <button id="subirImagenBtn" class="w-full text-[#4F75C2] font-medium text-sm hover:text-[#3d5a96] transition-colors">
                                    Subir imagen
                                </button>
                            </div>

                            <!-- Sección de Visibilidad -->
                            <div>
                                <label class="block text-base font-medium text-gray-900 mb-3">
                                    Seleccionar visibilidad
                                </label>
                                
                                <!-- Opción Público -->
                                <button 
                                    class="visibilidad-option w-full flex items-center gap-3 bg-[#E8EFF7] rounded-xl p-4 mb-3 transition-all hover:bg-[#d8e5f3] active"
                                    data-visibilidad="publico"
                                >
                                    <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                                    </svg>
                                    <span class="flex-1 text-left font-medium text-gray-900">Público</span>
                                    <div class="radio-button">
                                        <div class="radio-inner"></div>
                                    </div>
                                </button>

                                <!-- Opción Privado -->
                                <button 
                                    class="visibilidad-option w-full flex items-center gap-3 bg-[#E8EFF7] rounded-xl p-4 transition-all hover:bg-[#d8e5f3]"
                                    data-visibilidad="privado"
                                >
                                    <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                    </svg>
                                    <div class="flex-1 text-left">
                                        <div class="font-medium text-gray-900">Privado</div>
                                        <div class="text-xs text-gray-500 mt-0.5">Acceso mediante link</div>
                                    </div>
                                    <div class="radio-button">
                                        <div class="radio-inner"></div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Footer con botones -->
                    <div class="flex gap-3 px-6 py-5 border-t border-gray-200">
                        <button 
                            id="cancelarBtn"
                            class="flex-1 px-6 py-3 border-2 border-[#4F75C2] text-[#4F75C2] font-semibold rounded-full hover:bg-[#4F75C2] hover:text-white transition-all"
                        >
                            Cancelar
                        </button>
                        <button 
                            id="crearBtn"
                            class="flex-1 px-6 py-3 bg-[#4F75C2] text-white font-semibold rounded-full hover:bg-[#3d5a96] transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            <span id="btnText">Crear</span>
                            <svg id="btnLoader" class="hidden animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <style>
                .radio-button {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    border: 2px solid #D1D5DB;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    transition: all 0.2s;
                }

                .radio-inner {
                    width: 14px;
                    height: 14px;
                    border-radius: 50%;
                    background-color: #22C55E;
                    opacity: 0;
                    transform: scale(0);
                    transition: all 0.2s;
                }

                .visibilidad-option.active .radio-button {
                    border-color: #22C55E;
                }

                .visibilidad-option.active .radio-inner {
                    opacity: 1;
                    transform: scale(1);
                }

                .visibilidad-option svg {
                    color: #6B7280;
                    transition: color 0.2s;
                }

                .visibilidad-option.active svg {
                    color: #4F75C2;
                }
            </style>
        `;
    }

    setupEventListeners() {
        // Cerrar modal
        const closeBtn = this.querySelector('#closeBtn');
        const cancelarBtn = this.querySelector('#cancelarBtn');

        closeBtn.addEventListener('click', () => this.cerrarModal());
        cancelarBtn.addEventListener('click', () => this.cerrarModal());

        // Crear curso
        const crearBtn = this.querySelector('#crearBtn');
        crearBtn.addEventListener('click', () => this.crearCurso());

        // Selección de visibilidad
        const visibilidadOptions = this.querySelectorAll('.visibilidad-option');
        visibilidadOptions.forEach(option => {
            option.addEventListener('click', () => {
                visibilidadOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                this.visibilidad = option.dataset.visibilidad === 'publico' ? 'Público' : 'Privado';
            });
        });

        // Subir imagen
        const imagenInput = this.querySelector('#imagenInput');
        const subirImagenBtn = this.querySelector('#subirImagenBtn');
        const imagenContainer = this.querySelector('#imagenContainer');

        subirImagenBtn.addEventListener('click', () => imagenInput.click());
        imagenContainer.addEventListener('click', () => imagenInput.click());

        imagenInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.imagenPreview = event.target.result;
                    const preview = this.querySelector('#imagenPreview');
                    const placeholder = this.querySelector('#imagenPlaceholder');
                    preview.src = this.imagenPreview;
                    preview.classList.remove('hidden');
                    placeholder.classList.add('hidden');
                };
                reader.readAsDataURL(file);
            }
        });

        // Cerrar al hacer clic fuera del modal
        this.querySelector('.fixed').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.cerrarModal();
            }
        });
    }

    async crearCurso() {
        if (this.isLoading) return;

        const nombre = this.querySelector('#nombreCurso').value.trim();
        const descripcion = this.querySelector('#descripcionCurso').value.trim();

        // Validaciones
        if (!nombre) {
            this.mostrarAlerta('Por favor ingresa el nombre del curso', 'error');
            return;
        }

        if (nombre.length < 3) {
            this.mostrarAlerta('El nombre del curso debe tener al menos 3 caracteres', 'error');
            return;
        }

        if (!descripcion) {
            this.mostrarAlerta('Por favor ingresa la descripción del curso', 'error');
            return;
        }

        if (descripcion.length < 10) {
            this.mostrarAlerta('La descripción debe tener al menos 10 caracteres', 'error');
            return;
        }

        try {
            this.setLoading(true);

            // Obtener el ID del maestro del localStorage
            const usuario = JSON.parse(localStorage.getItem('usuario'));
            
            if (!usuario || !usuario.id) {
                throw new Error('No se encontró información del usuario');
            }

            // Preparar datos del curso para el backend
            const cursoData = {
                titulo: nombre,
                descripcion: descripcion,
                id_maestro: usuario.id,
                visibilidad: this.visibilidad,
                imagen: this.imagenPreview || 'https://via.placeholder.com/800x450?text=Sin+Imagen'
            };

            // Crear curso en el backend
            const resultado = await cursoService.createCourse(cursoData);

            if (resultado.success) {
                // Disparar evento con los datos del curso creado
                const eventoDetalle = {
                    ...resultado.curso,
                    imagen: this.imagenPreview || 'https://via.placeholder.com/800x450?text=Sin+Imagen',
                    participantes: 0,
                    estado: this.visibilidad
                };

                this.dispatchEvent(new CustomEvent('curso-creado', {
                    detail: eventoDetalle,
                    bubbles: true,
                    composed: true
                }));

                this.mostrarAlerta('¡Curso creado exitosamente!', 'success');
                
                // Cerrar modal después de un breve delay
                setTimeout(() => {
                    this.cerrarModal();
                }, 1500);
            }
        } catch (error) {
            console.error('Error al crear curso:', error);
            this.mostrarAlerta(
                error.message || 'Error al crear el curso. Por favor intenta nuevamente.',
                'error'
            );
        } finally {
            this.setLoading(false);
        }
    }

    setLoading(loading) {
        this.isLoading = loading;
        const crearBtn = this.querySelector('#crearBtn');
        const btnText = this.querySelector('#btnText');
        const btnLoader = this.querySelector('#btnLoader');
        const nombreInput = this.querySelector('#nombreCurso');
        const descripcionInput = this.querySelector('#descripcionCurso');

        if (loading) {
            crearBtn.disabled = true;
            btnText.textContent = 'Creando...';
            btnLoader.classList.remove('hidden');
            nombreInput.disabled = true;
            descripcionInput.disabled = true;
        } else {
            crearBtn.disabled = false;
            btnText.textContent = 'Crear';
            btnLoader.classList.add('hidden');
            nombreInput.disabled = false;
            descripcionInput.disabled = false;
        }
    }

    mostrarAlerta(mensaje, tipo = 'info') {
        // Eliminar alertas anteriores
        const alertaAnterior = this.querySelector('.alerta-flotante');
        if (alertaAnterior) alertaAnterior.remove();

        const colores = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            info: 'bg-blue-500'
        };

        const iconos = {
            success: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                      </svg>`,
            error: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>`,
            info: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                   </svg>`
        };

        const alerta = document.createElement('div');
        alerta.className = `alerta-flotante fixed top-4 left-1/2 transform -translate-x-1/2 z-[60] ${colores[tipo]} text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slide-down`;
        alerta.innerHTML = `
            ${iconos[tipo]}
            <span class="font-medium">${mensaje}</span>
        `;

        this.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 4000);
    }

    cerrarModal() {
        this.remove();
    }
}

customElements.define('crear-curso', CrearCurso);
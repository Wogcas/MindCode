import { client } from '../api/apiClient.js';

class CrearCurso extends HTMLElement {
    constructor() {
        super();
        this.visibilidad = 'publico';
        this.imagenPreview = null; 
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.innerHTML = `
            <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                    
                    <div class="flex justify-between items-center px-6 py-5 border-b border-gray-200">
                        <h2 class="text-3xl font-semibold text-gray-900">Crear curso</h2>
                        <button id="closeBtn" class="text-gray-500 hover:text-gray-700 transition-colors">
                            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>

                    <div class="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Nombre del curso</label>
                            <input type="text" id="nombreCurso" placeholder="Ej. Introducción a JavaScript" 
                                class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all">
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                            <textarea id="descripcionCurso" rows="4" placeholder="Describe brevemente el contenido del curso..." 
                                class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"></textarea>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Portada del curso</label>
                            <div class="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer relative" id="dropZone">
                                <input type="file" id="imagenCurso" accept="image/*" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer">
                                <div id="previewContainer" class="hidden h-40 w-full flex justify-center items-center overflow-hidden rounded-lg mb-2">
                                    <img id="imgPreview" class="h-full object-cover">
                                </div>
                                <div id="uploadText">
                                    <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <p class="mt-1 text-sm text-gray-600">Click para subir imagen o arrastra aquí</p>
                                    <p class="mt-1 text-xs text-gray-500">PNG, JPG hasta 5MB</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Visibilidad</label>
                            <div class="flex gap-4">
                                <button type="button" class="visibilidad-btn flex-1 py-3 px-4 rounded-xl border-2 border-blue-600 bg-blue-50 text-blue-700 font-medium transition-all" data-value="publico">
                                    Público
                                </button>
                                <button type="button" class="visibilidad-btn flex-1 py-3 px-4 rounded-xl border-2 border-gray-200 text-gray-600 hover:bg-gray-50 transition-all" data-value="privado">
                                    Privado
                                </button>
                            </div>
                        </div>

                    </div>

                    <div class="px-6 py-5 border-t border-gray-200 flex justify-end gap-3">
                        <button id="cancelBtn" class="px-6 py-2.5 rounded-full text-gray-700 hover:bg-gray-100 font-medium transition-colors">
                            Cancelar
                        </button>
                        <button id="guardarBtn" class="px-8 py-2.5 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 hover:shadow-xl transform active:scale-95 transition-all font-medium">
                            Crear Curso
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        this.querySelector('#closeBtn').addEventListener('click', () => this.cerrarModal());
        this.querySelector('#cancelBtn').addEventListener('click', () => this.cerrarModal());

        const btns = this.querySelectorAll('.visibilidad-btn');
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                btns.forEach(b => {
                    b.classList.remove('border-blue-600', 'bg-blue-50', 'text-blue-700');
                    b.classList.add('border-gray-200', 'text-gray-600');
                });
                btn.classList.remove('border-gray-200', 'text-gray-600');
                btn.classList.add('border-blue-600', 'bg-blue-50', 'text-blue-700');
                this.visibilidad = btn.dataset.value;
            });
        });

        const fileInput = this.querySelector('#imagenCurso');
        fileInput.addEventListener('change', (e) => this.procesarImagen(e));

        this.querySelector('#guardarBtn').addEventListener('click', () => this.crearCurso());
    }

    async procesarImagen(event) {
        const file = event.target.files[0];
        if (!file) return;
        this.querySelector('#uploadText p').textContent = "Procesando imagen...";

        const reader = new FileReader();
        reader.onload = async (e) => {
            const base64Original = e.target.result;
            
            try {
                const base64Comprimida = await this.comprimirImagen(base64Original, 800, 0.7);
                
                this.imagenPreview = base64Comprimida;
                
                const imgPreview = this.querySelector('#imgPreview');
                imgPreview.src = base64Comprimida;
                this.querySelector('#previewContainer').classList.remove('hidden');
                this.querySelector('#uploadText').classList.add('hidden');
                
            } catch (error) {
                console.error("Error al comprimir:", error);
                alert("Error al procesar la imagen");
            }
        };
        reader.readAsDataURL(file);
    }
    async comprimirImagen(base64, maxWidth = 800, quality = 0.7) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = base64;
            img.onload = () => {
                let width = img.width;
                let height = img.height;

                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                const dataUrl = canvas.toDataURL('image/jpeg', quality);
                resolve(dataUrl);
            };
            img.onerror = (err) => reject(err);
        });
    }

    async crearCurso() {
        const nombre = this.querySelector('#nombreCurso').value.trim();
        const descripcion = this.querySelector('#descripcionCurso').value.trim();
        const btnGuardar = this.querySelector('#guardarBtn');

        if (!nombre || !descripcion) {
            alert('Por favor completa nombre y descripción');
            return;
        }

        btnGuardar.disabled = true;
        btnGuardar.textContent = "Creando...";

        const nuevoCurso = {
            titulo: nombre,
            descripcion: descripcion,
            imagen: this.imagenPreview, 
            publico: this.visibilidad === 'publico'
        };

        try {
            const respuesta = await client.request('/cursos/agregar', {
                method: 'POST',
                body: JSON.stringify(nuevoCurso)
            });

            if (respuesta.success) {
                this.dispatchEvent(new CustomEvent('curso-creado', {
                    bubbles: true,
                    composed: true
                }));
                this.cerrarModal();
                alert('Curso creado exitosamente');
            } else {
                alert('Error: ' + (respuesta.message || 'Error desconocido'));
            }
        } catch (error) {
            console.error(error);
            alert('Error de conexión al crear curso');
        } finally {
            btnGuardar.disabled = false;
            btnGuardar.textContent = "Crear Curso";
        }
    }

    cerrarModal() {
        this.remove();
    }
}

customElements.define('crear-curso', CrearCurso);
import { client } from '../api/apiClient.js';

class EditarPerfil extends HTMLElement {
    constructor() {
        super();
        this.usuarioOriginal = null;
        this.isEditing = false;
        this.selectedImage = null;
        this.hasChanges = false;
    }

    connectedCallback() {
        this.loadUserData();
    }

    async loadUserData() {
        // Verificar autenticación
        const usuarioStr = localStorage.getItem('usuario');
        const token = localStorage.getItem('token');
        
        if (!usuarioStr || !token) {
            this.showError('No se encontró información del usuario. Por favor, inicia sesión nuevamente.');
            setTimeout(() => {
                window.location.href = '/src/login/index.html';
            }, 2000);
            return;
        }

        try {
            // Obtener datos frescos del servidor
            const response = await client.request('/usuarios/perfil/mi-perfil', {
                method: 'GET'
            });

            if (response.success) {
                this.usuarioOriginal = response.data;
                // Actualizar localStorage con datos frescos
                localStorage.setItem('usuario', JSON.stringify(response.data));
                this.render();
                this.attachEventListeners();
            }
        } catch (error) {
            console.error('Error al cargar datos del perfil:', error);
            // Usar datos del localStorage como fallback
            this.usuarioOriginal = JSON.parse(usuarioStr);
            this.render();
            this.attachEventListeners();
        }
    }

    render() {
        const usuario = this.usuarioOriginal;
        
        // El backend usa 'correo', asegurarnos de tenerlo
        const correo = usuario.correo || usuario.email || 'No disponible';
        const nombre = usuario.nombre || 'Usuario';
        const tipo = usuario.tipo || 'Alumno';
        const sobreMi = usuario.sobreMi || usuario.bio || '';
        const fotoPerfil = usuario.fotoPerfil || '';
        
        // Determinar la imagen a mostrar
        let avatarContent;
        if (fotoPerfil) {
            avatarContent = `<img src="${fotoPerfil}" alt="Foto de perfil" class="w-full h-full object-cover rounded-full">`;
        } else {
            avatarContent = `<span class="text-3xl font-bold">${nombre.charAt(0).toUpperCase()}</span>`;
        }
        
        this.innerHTML = `
            <div class="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-6">
                
                <!-- Alerta de mensajes -->
                <div id="alert-container" class="hidden"></div>
                
                <div class="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
                    <div class="flex justify-between items-center">
                        <div>
                            <h2 class="text-2xl font-bold text-gray-800">Mi Perfil</h2>
                            <p class="text-sm text-gray-500 mt-1">Administra tu información personal</p>
                        </div>
                        <div class="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                            ${tipo}
                        </div>
                    </div>
                </div>

                <div class="p-8 space-y-8">
                    
                    <!-- Foto de Perfil -->
                    <div class="flex flex-col sm:flex-row items-center gap-6">
                        <div class="relative w-28 h-28 group" id="avatar-container">
                            <div class="w-full h-full rounded-full bg-gradient-to-br from-green-400 to-green-600 border-4 border-white shadow-md flex items-center justify-center overflow-hidden text-white">
                                ${avatarContent}
                            </div>
                            
                            <label for="file-upload" class="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full shadow-lg hover:bg-green-700 transition-colors border-2 border-white cursor-pointer">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                            </label>
                            <input type="file" id="file-upload" accept="image/*" class="hidden">
                        </div>

                        <div class="text-center sm:text-left">
                            <h3 class="text-lg font-semibold text-gray-900">Foto de perfil</h3>
                            <p class="text-sm text-gray-500 mb-2">Esta imagen será visible en tu perfil.</p>
                            <p class="text-xs text-gray-400">JPG, PNG o GIF. Máximo 2MB.</p>
                        </div>
                    </div>

                    <!-- Formulario de datos -->
                    <form id="profile-form" class="grid grid-cols-1 gap-6">
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Nombre Completo *</label>
                            <input type="text" 
                                   id="input-nombre"
                                   name="nombre"
                                   value="${nombre}" 
                                   required
                                   class="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all">
                            <span class="text-xs text-red-600 hidden" id="error-nombre"></span>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                            <input type="email" 
                                   id="input-correo"
                                   value="${correo}" 
                                   disabled
                                   class="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed">
                            <span class="text-xs text-gray-500">El correo no se puede modificar</span>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Sobre mí</label>
                            <textarea rows="4" 
                                      id="input-sobreMi"
                                      name="sobreMi"
                                      placeholder="Cuéntanos sobre ti..."
                                      class="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all resize-none">${sobreMi}</textarea>
                        </div>

                    </form>

                    <!-- Botones de acción -->
                    <div class="flex items-center justify-end gap-4 pt-6 border-t border-gray-100">
                        <button id="cancel-btn" class="px-6 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium text-sm">
                            Cancelar
                        </button>
                        <button id="save-btn" class="px-6 py-2.5 bg-green-600 text-white rounded-lg shadow-sm hover:bg-green-700 transition-colors font-medium text-sm flex items-center gap-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            Guardar Cambios
                        </button>
                    </div>

                </div>
            </div>
        `;
    }

    attachEventListeners() {
        const saveBtn = this.querySelector('#save-btn');
        const cancelBtn = this.querySelector('#cancel-btn');
        const fileUpload = this.querySelector('#file-upload');
        const nombreInput = this.querySelector('#input-nombre');
        const sobreMiInput = this.querySelector('#input-sobreMi');

        saveBtn?.addEventListener('click', () => this.handleSave());
        cancelBtn?.addEventListener('click', () => this.handleCancel());
        fileUpload?.addEventListener('change', (e) => this.handleFileSelect(e));
        
        // Detectar cambios en los inputs
        nombreInput?.addEventListener('input', () => this.detectChanges());
        sobreMiInput?.addEventListener('input', () => this.detectChanges());
        
        // Inicializar estado del botón
        this.updateSaveButton();
    }

    detectChanges() {
        const nombreActual = this.querySelector('#input-nombre')?.value.trim() || '';
        const sobreMiActual = this.querySelector('#input-sobreMi')?.value.trim() || '';
        
        const nombreOriginal = this.usuarioOriginal?.nombre || '';
        const sobreMiOriginal = this.usuarioOriginal?.sobreMi || this.usuarioOriginal?.bio || '';
        
        this.hasChanges = 
            nombreActual !== nombreOriginal ||
            sobreMiActual !== sobreMiOriginal ||
            this.selectedImage !== null;
        
        this.updateSaveButton();
    }

    updateSaveButton() {
        const saveBtn = this.querySelector('#save-btn');
        if (saveBtn) {
            saveBtn.disabled = !this.hasChanges;
            if (!this.hasChanges) {
                saveBtn.classList.add('opacity-50', 'cursor-not-allowed');
            } else {
                saveBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        }
    }

    handleFileSelect(event) {
        const file = event.target.files[0];
        
        if (!file) return;

        // Validar tipo de archivo
        if (!file.type.startsWith('image/')) {
            this.showError('Por favor selecciona una imagen válida (JPG, PNG, GIF)');
            return;
        }

        // Validar tamaño (2MB máximo)
        if (file.size > 2 * 1024 * 1024) {
            this.showError('La imagen no puede ser mayor a 2MB');
            return;
        }

        // Convertir a base64
        const reader = new FileReader();
        reader.onload = (e) => {
            this.selectedImage = e.target.result;
            // Actualizar preview
            const avatarContainer = this.querySelector('#avatar-container div');
            avatarContainer.innerHTML = `<img src="${this.selectedImage}" alt="Preview" class="w-full h-full object-cover rounded-full">`;
            this.showInfo('Imagen cargada. Haz clic en "Guardar Cambios" para aplicar.');
            this.detectChanges();
        };
        reader.readAsDataURL(file);
    }

    async handleSave() {
        // Verificar si hay cambios
        if (!this.hasChanges) {
            this.showInfo('No hay cambios para guardar');
            return;
        }

        const nombre = this.querySelector('#input-nombre').value.trim();
        const sobreMi = this.querySelector('#input-sobreMi').value.trim();

        // Validaciones
        if (!nombre) {
            this.showFieldError('nombre', 'El nombre es requerido');
            return;
        }

        if (nombre.length < 3) {
            this.showFieldError('nombre', 'El nombre debe tener al menos 3 caracteres');
            return;
        }

        // Mostrar loading
        const saveBtn = this.querySelector('#save-btn');
        const originalText = saveBtn.innerHTML;
        saveBtn.disabled = true;
        saveBtn.innerHTML = `
            <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Guardando...
        `;

        try {
            // Preparar datos a enviar - SIEMPRE incluir todos los campos editables
            const datosActualizados = {
                nombre: nombre,
                sobreMi: sobreMi
            };

            // Agregar foto solo si se seleccionó una nueva
            if (this.selectedImage) {
                datosActualizados.fotoPerfil = this.selectedImage;
            }

            // Actualizar en el backend usando el endpoint específico de perfil
            const response = await client.request('/usuarios/perfil/actualizar', {
                method: 'PUT',
                body: JSON.stringify(datosActualizados)
            });

            if (response.success) {
                // Actualizar localStorage con los datos retornados por el servidor
                const usuarioActualizado = {
                    ...this.usuarioOriginal,
                    ...response.data
                };
                
                localStorage.setItem('usuario', JSON.stringify(usuarioActualizado));
                this.usuarioOriginal = usuarioActualizado;
                this.selectedImage = null;
                this.hasChanges = false;

                this.showSuccess('✓ Perfil actualizado exitosamente');
                
                // Actualizar la vista
                setTimeout(() => {
                    this.render();
                    this.attachEventListeners();
                }, 1500);
            }
        } catch (error) {
            console.error('Error al actualizar perfil:', error);
            this.showError(error.message || 'Error al actualizar el perfil. Por favor intenta de nuevo.');
        } finally {
            saveBtn.disabled = false;
            saveBtn.innerHTML = originalText;
            this.updateSaveButton();
        }
    }

    handleCancel() {
        // Restaurar valores originales
        this.querySelector('#input-nombre').value = this.usuarioOriginal.nombre || '';
        this.querySelector('#input-sobreMi').value = this.usuarioOriginal.sobreMi || this.usuarioOriginal.bio || '';
        
        // Restaurar imagen original
        this.selectedImage = null;
        const avatarContainer = this.querySelector('#avatar-container div');
        const fotoPerfil = this.usuarioOriginal.fotoPerfil;
        const nombre = this.usuarioOriginal.nombre || 'Usuario';
        
        if (fotoPerfil) {
            avatarContainer.innerHTML = `<img src="${fotoPerfil}" alt="Foto de perfil" class="w-full h-full object-cover rounded-full">`;
        } else {
            avatarContainer.innerHTML = `<span class="text-3xl font-bold">${nombre.charAt(0).toUpperCase()}</span>`;
        }
        
        // Resetear estado de cambios
        this.hasChanges = false;
        this.updateSaveButton();
        
        this.showInfo('Cambios descartados');
    }

    showFieldError(fieldName, message) {
        const errorEl = this.querySelector(`#error-${fieldName}`);
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.classList.remove('hidden');
            setTimeout(() => errorEl.classList.add('hidden'), 3000);
        }
    }

    showSuccess(message) {
        this.showAlert(message, 'success');
    }

    showError(message) {
        this.showAlert(message, 'error');
    }

    showInfo(message) {
        this.showAlert(message, 'info');
    }

    showAlert(message, type = 'info') {
        const container = this.querySelector('#alert-container');
        if (!container) return;

        const bgColors = {
            success: 'bg-green-100 border-green-400 text-green-700',
            error: 'bg-red-100 border-red-400 text-red-700',
            info: 'bg-blue-100 border-blue-400 text-blue-700'
        };

        container.className = `${bgColors[type]} border-l-4 p-4 mb-4`;
        container.innerHTML = `
            <div class="flex items-center">
                <p class="font-medium">${message}</p>
            </div>
        `;
        container.classList.remove('hidden');

        setTimeout(() => {
            container.classList.add('hidden');
        }, 3000);
    }
}

customElements.define('editar-perfil', EditarPerfil);
export default EditarPerfil;
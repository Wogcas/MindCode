class EditarPerfil extends HTMLElement {
    connectedCallback() {
        // Obtenemos datos del usuario o usamos valores por defecto seguros
        const usuario = JSON.parse(localStorage.getItem('usuario') || '{"nombre": "Estudiante", "email": "estudiante@mindcode.com", "ubicacion": "Ciudad Obregón, Sonora"}');
        
        this.innerHTML = `
            <div class="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-6">
                
                <div class="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
                    <h2 class="text-2xl font-bold text-gray-800">Mi Perfil</h2>
                    <p class="text-sm text-gray-500 mt-1">Administra tu información personal</p>
                </div>

                <div class="p-8 space-y-8">
                    
                    <div class="flex flex-col sm:flex-row items-center gap-6">
                        <div class="relative w-28 h-28 group cursor-pointer">
                            <div class="w-full h-full rounded-full bg-gray-200 border-4 border-white shadow-md flex items-center justify-center overflow-hidden text-gray-400">
                                <svg class="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            
                            <div class="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-primary-600 transition-colors border-2 border-white">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            </div>
                        </div>

                        <div class="text-center sm:text-left">
                            <h3 class="text-lg font-semibold text-gray-900">Foto de perfil</h3>
                            <p class="text-sm text-gray-500 mb-3">Esta imagen será visible para tus instructores.</p>
                            <button class="text-primary-600 hover:text-primary-700 text-sm font-medium hover:underline transition-colors">
                                Subir nueva imagen
                            </button>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 gap-6">
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                            <input type="text" value="${usuario.nombre}" 
                                   class="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                            <input type="email" value="${usuario.email}" disabled
                                   class="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed">
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
                            <input type="text" value="${usuario.ubicacion || ''}" 
                                   class="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all">
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Sobre mí</label>
                            <textarea rows="4" 
                                      class="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none">Estudiante apasionado por la tecnología y el desarrollo web.</textarea>
                        </div>

                    </div>

                    <div class="flex items-center justify-end gap-4 pt-6 border-t border-gray-100">
                        <button class="px-6 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium text-sm">
                            Cancelar
                        </button>
                        <button class="px-6 py-2.5 bg-primary text-white rounded-lg shadow-sm hover:bg-primary-600 transition-colors font-medium text-sm">
                            Guardar Cambios
                        </button>
                    </div>

                </div>
            </div>
        `;
    }
}

customElements.define('editar-perfil', EditarPerfil);
export default EditarPerfil;
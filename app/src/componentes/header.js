class AppHeader extends HTMLElement {
    connectedCallback() {
        const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
        const esMaestro = usuario.tipo === 'Maestro';
        const homeLink = esMaestro ? '#/dashboard-maestro' : '#/dashboard-alumno';

        this.innerHTML = `
        <header class="bg-white shadow-sm font-sans h-16 sticky top-0 z-50">
            <div class="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4">

                <a href="${homeLink}" class="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0">
                    <img src="../../assets/images/logoMindCode.png" class="h-8 w-auto" alt="Logo"/>
                    <span class="font-Colmeak font-semibold text-xl text-gray-800 hidden md:block tracking-tight">MindCode</span>
                </a>


                <div class="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                    
                    <button class="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                    </button>

                    ${esMaestro ? `
                    <button onclick="document.querySelector('dashboard-maestro').abrirModalCrearCurso()" class="hidden lg:flex bg-gray-900 hover:bg-black text-white px-4 py-1.5 rounded-lg text-sm font-medium transition items-center gap-2 shadow-sm">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                        <span>Crear</span>
                    </button>
                    ` : ''}


                    <div class="h-6 w-px bg-gray-200 mx-1 hidden sm:block"></div>

                    <div class="flex items-center gap-2">
                        <a href="#/perfil" class="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200">
                            <div class="h-8 w-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm">
                                ${usuario.nombre ? usuario.nombre.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <span class="text-sm font-medium text-gray-700 hidden lg:block max-w-[100px] truncate">
                                ${usuario.nombre || 'Usuario'}
                            </span>
                        </a>
                        
                        <button id="btn-logout" class="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors" title="Cerrar sesión">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                        </button>
                    </div>

                </div>
            </div>
        </header>
        `;

        this.setupEventListeners();
    }

    setupEventListeners() {
        // Logout
        this.querySelector('#btn-logout')?.addEventListener('click', () => {
            if(confirm('¿Cerrar sesión?')) {
                localStorage.clear();
                window.location.href = '../login/index.html';
            }
        });

        // Foco en barra con la tecla "/"
        document.addEventListener('keydown', (e) => {
            if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
                e.preventDefault();
                this.querySelector('#global-search')?.focus();
            }
        });

        // Listener del input de búsqueda
        const searchInput = this.querySelector('#global-search');
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    // Aquí conectarías con tu lógica de búsqueda
                    alert('Buscando: ' + searchInput.value);
                }
            });
        }
    }
}

customElements.define("app-header", AppHeader);
export default AppHeader;
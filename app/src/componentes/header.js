class AppHeader extends HTMLElement {
    constructor() {
        super();
        this.listeners = [];
    }

    connectedCallback() {
        const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
        const esMaestro = usuario.tipo === 'Maestro';
        const homeVista = esMaestro ? 'dashboardMaestro' : 'dashboardAlumno';
        const cursosVista = esMaestro ? 'cursosMaestro' : 'cursosAlumno';

        this.innerHTML = `
        <header class="bg-white shadow-sm font-sans h-16 sticky top-0 z-50">
            <div class="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4">

                <a href="?vista=${homeVista}" class="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0">
                    <img src="../../assets/images/logoMindCode.png" class="h-8 w-auto" alt="Logo"/>
                    <span class="font-Colmeak font-semibold text-xl text-gray-800 hidden md:block tracking-tight">MindCode</span>
                </a>

                <nav class="hidden md:flex items-center gap-1 ml-8">
                    <a href="?vista=${homeVista}" class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors">
                        Inicio
                    </a>
                    <a href="?vista=${cursosVista}" class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors">
                        Mis Cursos
                    </a>
                </nav>

                <div class="flex items-center gap-2 sm:gap-4 flex-shrink-0 ml-auto">
                    
                    ${esMaestro ? `
                    <button id="btn-crear-global" class="hidden lg:flex bg-gray-900 hover:bg-black text-white px-4 py-1.5 rounded-lg text-sm font-medium transition items-center gap-2 shadow-sm">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                        <span>Crear</span>
                    </button>
                    ` : ''}

                    <button class="relative p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-full transition-colors group">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                        <span class="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                    </button>

                    <div class="h-6 w-px bg-gray-200 mx-1 hidden sm:block"></div>

                    <div class="flex items-center gap-2">
                        <a href="?vista=perfil" class="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200">
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
        // 1. LOGOUT
        this.querySelector('#btn-logout')?.addEventListener('click', () => {
            if(confirm('¿Cerrar sesión?')) {
                localStorage.clear();
                window.location.href = '../login/index.html';
            }
        });

        // 2. BUSQUEDA (Enter)
        const searchInput = this.querySelector('#global-search');
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    console.log("Buscando:", searchInput.value);
                    // Aquí puedes redirigir: window.location.hash = `#/buscar/${searchInput.value}`;
                }
            });
        }

        // 3. BOTÓN CREAR CURSO (NUEVO)
        const btnCrear = this.querySelector('#btn-crear-global');
        if (btnCrear) {
            btnCrear.addEventListener('click', () => {
                // Importamos dinámicamente el componente CrearCurso para asegurar que exista
                import('../crear-curso/CrearCurso.js').then(() => {
                    const modal = document.createElement('crear-curso');
                    
                    // Si se crea un curso, recargamos la página para verlo
                    modal.addEventListener('curso-creado', () => {
                        window.location.reload();
                    });

                    document.body.appendChild(modal);
                }).catch(err => console.error("Error cargando el modal de crear curso:", err));
            });
        }
    }

    disconnectedCallback() {
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

customElements.define("app-header", AppHeader);
export default AppHeader;
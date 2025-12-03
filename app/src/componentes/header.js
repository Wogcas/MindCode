class AppHeader extends HTMLElement {
    constructor() {
        super();
        this.usuario = null;
    }

    async connectedCallback() {
        // Esperar a que window.app esté disponible (fue asignado en shell.js)
        let intentos = 0;
        while (!window.app && intentos < 20) {
            await new Promise(resolve => setTimeout(resolve, 100));
            intentos++;
        }

        if (window.app) {
            this.usuario = window.app.usuario;
        }

        this.render();
        this.setupEventListeners();
    }

    render() {
        const nombreUsuario = this.usuario?.nombre || 'Usuario';
        const iniciales = this.usuario?.nombre 
            ?.split(' ')
            ?.map(n => n[0])
            ?.join('')
            ?.toUpperCase() || 'U';

        this.innerHTML = `
        <header class="bg-white shadow-sm sticky top-0 z-50 font-sans">
            <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    
                    <div class="flex-shrink-0 flex items-center cursor-pointer">
                            <img src="../../assets/images/logoMindCode.png" class="h-10"/>
                            <span class="font-Colmeak hidden md:block font-semibold text-xl tracking-tight text-gray-800 ml-2">MindCode</span>
                    </div>

                    <div class="flex-1 flex items-center justify-end md:justify-between mx-2 md:mx-8">
                         <div class="flex-1 max-w-md mr-2 md:mr-0">
                            <div class="relative text-gray-500 focus-within:text-gray-600">
                                <input type="text" name="search" id="search" placeholder="Explorar Cursos" class="block w-full h-10 pl-4 pr-10 py-2 leading-5 font-medium text-gray-700 placeholder-gray-500 bg-blue-100/50 border-transparent rounded-full focus:outline-none focus:bg-blue-100 focus:ring-0 sm:text-sm transition-colors duration-200">
                                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <nav class="hidden md:flex space-x-4 lg:space-x-8 ml-4">
                            <a href="#" class="text-gray-900 font-semibold px-3 py-2 text-sm hover:text-primary-600 transition-colors">Inicio</a>
                            <a href="#" class="text-gray-600 font-medium px-3 py-2 text-sm hover:text-primary-600 transition-colors">Cursos</a>
                            <a href="#" class="text-gray-600 font-medium px-3 py-2 text-sm hover:text-primary-600 transition-colors">Retos</a>
                            <a href="#" class="text-gray-600 font-medium px-3 py-2 text-sm hover:text-primary-600 transition-colors">Foros</a>
                        </nav>
                    </div>

                    <div class="flex items-center space-x-1 sm:space-x-3">
                        
                        <button id="perfilBtn" type="button" class="flex p-1 rounded-full text-gray-600 hover:text-primary-600 hover:bg-gray-100 focus:outline-none transition-colors relative group">
                             <span class="sr-only">Abrir perfil</span>
                             <div class="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center text-sm font-semibold flex items-center justify-center">
                                ${iniciales}
                             </div>
                             
                             <!-- Dropdown Menu -->
                             <div class="absolute right-0 mt-48 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                                <div class="px-4 py-2 border-b">
                                    <p class="font-semibold text-gray-900">${nombreUsuario}</p>
                                    <p class="text-xs text-gray-500">${this.usuario?.email || 'email@ejemplo.com'}</p>
                                    <p class="text-xs text-gray-500 mt-1">
                                        ${this.usuario?.tipo === 'maestro' ? '👨‍🏫 Maestro' : '👨‍🎓 Alumno'}
                                    </p>
                                </div>
                                <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm">Mi Perfil</a>
                                <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm">Configuración</a>
                                <button id="logoutBtn" class="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 text-sm">Cerrar Sesión</button>
                             </div>
                         </button>

                        <button type="button" class="p-1 rounded-full text-gray-600 hover:text-primary-600 hover:bg-gray-100 focus:outline-none transition-colors">
                            <span class="sr-only">Ver notificaciones</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                            </svg>
                        </button>

                        <button type="button" class="md:hidden p-1 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none transition-colors">
                             <span class="sr-only">Abrir menú</span>
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-7 h-7">
                               <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                             </svg>
                         </button>
                    </div>
                </div>
            </div>
        </header>
        `;
    }

    setupEventListeners() {
        const logoutBtn = this.querySelector('#logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        }
    }

    logout() {
        if (window.app && window.app.logout) {
            window.app.logout();
        } else {
            // Fallback si window.app no está disponible
            localStorage.removeItem('token');
            window.location.href = '../../LogIn/SignIn/index.html';
        }
    }
}

customElements.define('app-header', AppHeader);
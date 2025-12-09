class AppHeader extends HTMLElement {
  connectedCallback() {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    const esMaestro = usuario.tipo === 'Maestro';
    
    this.innerHTML = `
      <header class="bg-white shadow-sm font-sans h-16 flex items-center">
        <div class="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">

            <a href="?vista=${esMaestro ? 'dashboardMaestro' : 'dashboardAlumno'}" 
               class="flex items-center gap-2 hover:opacity-80 transition-opacity">
               <img src="../../assets/images/logoMindCode.png" class="h-8 w-auto" alt="Logo"/>
               <span class="font-Colmeak font-semibold text-xl text-gray-800 hidden md:block">MindCode</span>
            </a>

            <nav class="hidden md:flex space-x-6">
                <a href="?vista=${esMaestro ? 'dashboardMaestro' : 'dashboardAlumno'}" 
                   class="text-gray-600 hover:text-primary font-medium text-sm transition-colors">Inicio</a>
                
                ${esMaestro ? `
                  <a href="?vista=cursos" class="text-gray-600 hover:text-primary font-medium text-sm transition-colors">Mis Cursos</a>
                  <a href="?vista=retos" class="text-gray-600 hover:text-primary font-medium text-sm transition-colors">Retos</a>
                ` : `
                  <a href="?vista=cursosAlumno" class="text-gray-600 hover:text-primary font-medium text-sm transition-colors">Mis Cursos</a>
                  <a href="?vista=explorar" class="text-gray-600 hover:text-primary font-medium text-sm transition-colors">Explorar</a>
                `}
            </nav>

            <div class="flex items-center gap-4">
               <a href="?vista=perfil"
                 class="flex p-1 rounded-full text-gray-600 hover:text-primary hover:bg-gray-100 transition-colors">
                 <span class="sr-only">Abrir perfil</span>
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                   stroke-width="1.5" fill="none" stroke="currentColor" class="w-7 h-7">
                   <path stroke-linecap="round" stroke-linejoin="round"
                     d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                 </svg>
               </a>
               
               <button id="btn-logout" class="text-gray-400 hover:text-red-500 transition-colors">
                 <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
               </button>
            </div>

        </div>
      </header>
    `;

    this.querySelector('#btn-logout')?.addEventListener('click', () => {
        localStorage.clear();
        window.location.href = '../login/index.html';
    });
  }
}
customElements.define("app-header", AppHeader);
export default AppHeader;
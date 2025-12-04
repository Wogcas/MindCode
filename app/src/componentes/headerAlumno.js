class HeaderAlumno extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <header class="bg-white shadow-sm sticky top-0 z-50 font-sans">
          <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
  
              <!-- Logo -->
              <div onclick="location.href='index.html?vista=dashboardAlumno'" 
                   class="flex-shrink-0 flex items-center cursor-pointer">
                <img src="../../assets/images/logoMindCode.png" class="h-10"/>
                <span class="font-Colmeak hidden md:block font-semibold text-xl tracking-tight text-gray-800 ml-2">
                  MindCode
                </span>
              </div>
  
              <!-- Search -->
              <div class="flex-1 max-w-md mx-4">
                <div class="relative text-gray-500 focus-within:text-gray-600">
                  <input type="text" placeholder="Explorar"
                    class="block w-full h-10 pl-4 pr-10 leading-5 font-medium text-gray-700
                           placeholder-gray-500 bg-blue-100/50 border-transparent rounded-full
                           focus:outline-none focus:bg-blue-100 transition-colors">
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                      fill="none" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                  </div>
                </div>
              </div>
  
              <!-- Nav Links -->
              <nav class="hidden md:flex space-x-6 mr-6">
                <a href="index.html?vista=dashboardAlumno" 
                   class="text-gray-900 font-semibold px-3 py-2 text-sm hover:text-blue-600">
                   Inicio
                </a>
  
                <a href="index.html?vista=miAprendizaje"
                   class="text-gray-600 font-medium px-3 py-2 text-sm hover:text-blue-600">
                   Mi aprendizaje
                </a>
              </nav>
  
              <!-- Iconos -->
              <div class="flex items-center gap-4">
  
                <!-- Favoritos -->
                <button class="p-1 rounded-full text-gray-600 hover:text-blue-600 hover:bg-gray-100">
                  <span class="sr-only">Favoritos</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                    stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                    <path stroke-linecap="round" stroke-linejoin="round" 
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                </button>
  
                <!-- Notificaciones -->
                <button class="p-1 rounded-full text-gray-600 hover:text-blue-600 hover:bg-gray-100">
                  <span class="sr-only">Ver notificaciones</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                    stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                    class="w-7 h-7">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022m5.455 1.31a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"/>
                  </svg>
                </button>
  
                <!-- Perfil -->
                <button onclick="location.href='index.html?vista=perfilAlumno'"
                  class="flex p-1 rounded-full text-gray-600 hover:text-blue-600 hover:bg-gray-100">
                  <span class="sr-only">Abrir perfil</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                    stroke-width="1.5" fill="none" stroke="currentColor" 
                    class="w-7 h-7 sm:w-8 sm:h-8">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>
      `;
    }
  }
  
  customElements.define("header-alumno", HeaderAlumno);
  export default HeaderAlumno;
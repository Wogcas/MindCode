class AppHeader extends HTMLElement {
  connectedCallback() {
      this.innerHTML = `
      <header class="w-full bg-white px-4 py-3 shadow flex items-center justify-between">

        <div class="flex items-center gap-2">
        <img src="../componentes/logoMindCode.png" class="w-9 h-9 object-contain" alt="MindCode Logo">
        <span class="font-semibold text-gray-800 text-[18px] ml-1">MindCode</span>
        </div>
        <div class="flex items-center bg-[#DCE8F7] rounded-full px-4 py-2 w-40 mx-2">
          <input
            type="text"
            placeholder=" "
            class="bg-transparent w-full outline-none text-gray-700 placeholder-gray-400 text-sm" />
          <svg xmlns="http://www.w3.org/2000/svg"
               fill="none" 
               viewBox="0 0 24 24"
               stroke="currentColor"
               class="w-4 h-4 text-gray-600">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>

        <!-- Iconos -->
        <div class="flex items-center gap-4">

          <!-- Usuario -->
          <svg xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke-width="1.5" 
          stroke="currentColor" 
          class="h-6 w-6 text-gray-700">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>

          <!-- Campana -->
          <svg xmlns="http://www.w3.org/2000/svg" 
            class="h-6 w-6 text-gray-700" 
            fill="none"
            viewBox="0 0 24 24" 
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" 
            class="h-7 w-7 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>
      </header>
    `;
  }
}
customElements.define("app-header", AppHeader);

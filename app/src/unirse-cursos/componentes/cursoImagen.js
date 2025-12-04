class CursoImagen extends HTMLElement {
    connectedCallback() {
      const src = this.getAttribute('src') || '';
      const alt = this.getAttribute('alt') || 'Curso';
  
      this.innerHTML = `
        <div class="aspect-video bg-gradient-to-br from-purple-900 to-red-900 relative overflow-hidden rounded-t-xl flex items-center justify-center">
          ${src ? `
            <img src="${src}" 
                 alt="${alt}" 
                 class="w-full h-full object-cover"
                 onerror="this.style.display='none'">
          ` : `
            <svg class="w-24 h-24 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
          `}
        </div>
      `;
    }
  }
  
  customElements.define("curso-imagen", CursoImagen);
  export default CursoImagen;
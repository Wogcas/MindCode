class CursoCard extends HTMLElement {
  connectedCallback() {
    const id = this.getAttribute('id'); 
    const title = this.getAttribute('title') || 'Curso';
    const image = this.getAttribute('image');
    
    // VALIDACIÓN ROBUSTA: Si no hay imagen, usa el placeholder AZUL
    let imagenSrc = 'https://placehold.co/600x400/2A6BBF/ffffff?text=Curso';
    
    if (image && image !== 'undefined' && image !== 'null' && image.trim() !== '') {
        imagenSrc = image;
    }

    this.innerHTML = `
      <div 
        onclick="window.location.href='/app/src/curso/detalle.html?id=${id}'"
        class="bg-primary rounded-3xl overflow-hidden shadow-lg w-[280px] min-w-32 h-[270px] flex-shrink-0 flex flex-col cursor-pointer hover:scale-105 transition-transform duration-200"
      >
        <div class="p-4">
          <div class="bg-gray-200 rounded-2xl overflow-hidden h-44 flex items-center justify-center relative">
             <img 
                src="${imagenSrc}" 
                alt="${title}" 
                class="w-full h-full object-cover"
                onerror="this.onerror=null; this.src='https://placehold.co/600x400/2A6BBF/ffffff?text=Sin+Imagen';"
             >
          </div>
        </div>
        <div class="px-6 pb-6 text-white text-center flex-grow flex items-center justify-center">
          <p class="text-sm leading-relaxed font-normal line-clamp-2">${title}</p>
        </div>
      </div>
    `;
  }
}
customElements.define('curso-card', CursoCard);
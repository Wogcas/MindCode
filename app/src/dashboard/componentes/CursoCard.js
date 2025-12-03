class CursoCard extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute('title') || 'Curso';
    const image = this.getAttribute('image') || '';
    const type = this.getAttribute('type') || 'general';

    this.innerHTML = `
      <div class="bg-primary rounded-3xl overflow-hidden shadow-lg w-[280px] min-w-32 h-[270px] min-h-27 flex-shrink-0 flex flex-col">
        <div class="p-4">
          <div class="bg-gradient-to-br from-purple-900 to-red-900 rounded-2xl overflow-hidden h-44 flex items-center justify-center">
            ${type === 'general' ? `
              <img src="${image}" alt="${title}" class="w-full h-full object-cover">
            ` : `
              
            `}
          </div>
        </div>
        <div class="px-6 pb-6 text-white text-center flex-grow flex items-center justify-center">
          <p class="text-sm leading-relaxed font-normal">${title}</p>
        </div>
      </div>
    `;
  }
}

customElements.define('curso-card', CursoCard);
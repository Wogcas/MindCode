// Componente de tarjeta de lección con checkbox

class LessonCard extends HTMLElement {
  connectedCallback() {
    const leccionId = this.getAttribute('leccionId');
    const titulo = this.getAttribute('titulo') || 'Lección';
    const completada = this.getAttribute('completada') === 'true';
    const tipo = this.getAttribute('tipo') || 'texto';
    const activa = this.getAttribute('activa') === 'true';

    const iconos = {
      video: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>`,
      reto: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
             </svg>`,
      texto: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>`
    };

    this.innerHTML = `
      <button 
        class="lesson-card-btn w-full px-4 py-3 flex items-center gap-3 
               hover:bg-gray-50 transition-colors cursor-pointer text-left
               ${activa ? 'bg-primary-50 border-l-4 border-primary' : ''}"
        data-leccion-id="${leccionId}">
        
        <div class="flex-shrink-0">
          <div class="${completada ? 'bg-primary text-white' : 'bg-gray-200 text-gray-400'} 
                      w-5 h-5 rounded flex items-center justify-center transition-colors">
            ${completada ? `
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
              </svg>
            ` : ''}
          </div>
        </div>

        <div class="flex-shrink-0 text-gray-500">
          ${iconos[tipo]}
        </div>

        <span class="flex-1 text-sm font-medium text-gray-700 line-clamp-2">
          ${titulo}
        </span>
      </button>
    `;

    this.setupEventListeners();
  }

  setupEventListeners() {
    const btn = this.querySelector('.lesson-card-btn');
    btn.addEventListener('click', () => {
      const leccionId = this.getAttribute('leccionId');
      this.dispatchEvent(new CustomEvent('lesson-clicked', {
        detail: { leccionId },
        bubbles: true,
        composed: true
      }));
    });
  }
}

customElements.define('lesson-card', LessonCard);

// Componente de opción de quiz/reto

class QuizOption extends HTMLElement {
  connectedCallback() {
    const id = this.getAttribute('id');
    const texto = this.getAttribute('texto') || '';
    const checked = this.getAttribute('checked') === 'true';
    const disabled = this.getAttribute('disabled') === 'true';
    const estado = this.getAttribute('estado');

    this.innerHTML = `
      <label class="quiz-option-label block cursor-pointer ${disabled ? 'cursor-not-allowed' : ''}">
        <div class="border-2 rounded-2xl p-4 transition-all duration-200
                    ${this.getEstilosEstado(checked, estado, disabled)}"
             data-option-id="${id}">
          
          <div class="flex items-start gap-3">
            <div class="flex-shrink-0 mt-0.5">
              <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center
                          ${checked ? 'border-primary bg-primary' : 'border-gray-300 bg-white'}
                          ${disabled ? 'opacity-50' : ''}
                          transition-all">
                ${checked ? `<div class="w-2.5 h-2.5 bg-white rounded-full"></div>` : ''}
              </div>
            </div>

            <div class="flex-1">
              <span class="text-gray-700 leading-relaxed">
                <strong>${id})</strong> ${texto}
              </span>
            </div>

            ${this.renderIconoEstado(estado)}
          </div>
        </div>
        
        <input type="radio" 
               name="quiz-option" 
               value="${id}" 
               ${checked ? 'checked' : ''}
               ${disabled ? 'disabled' : ''}
               class="sr-only">
      </label>
    `;

    if (!disabled) {
      this.setupEventListeners();
    }
  }

  getEstilosEstado(checked, estado, disabled) {
    if (disabled && estado === 'correcta') return 'border-green-500 bg-green-50';
    if (disabled && estado === 'incorrecta') return 'border-red-500 bg-red-50';
    if (checked) return 'border-primary bg-primary-50';
    return 'border-gray-200 hover:border-primary hover:bg-gray-50';
  }

  renderIconoEstado(estado) {
    if (estado === 'correcta') {
      return `
        <div class="flex-shrink-0">
          <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
      `;
    }
    if (estado === 'incorrecta') {
      return `
        <div class="flex-shrink-0">
          <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
      `;
    }
    return '';
  }

  setupEventListeners() {
    const label = this.querySelector('.quiz-option-label');
    const radio = this.querySelector('input[type="radio"]');

    label.addEventListener('click', () => {
      if (!radio.disabled) {
        this.dispatchEvent(new CustomEvent('option-selected', {
          detail: { id: this.getAttribute('id') },
          bubbles: true,
          composed: true
        }));
      }
    });
  }

  marcarEstado(estado) {
    this.setAttribute('estado', estado);
    this.setAttribute('disabled', 'true');
    this.connectedCallback();
  }
}

customElements.define('quiz-option', QuizOption);

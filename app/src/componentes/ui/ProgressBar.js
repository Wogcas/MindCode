// Componente de barra de progreso reutilizable

class ProgressBar extends HTMLElement {
  connectedCallback() {
    const progreso = this.getAttribute('progreso') || 0;
    const color = this.getAttribute('color') || 'bg-primary';
    const height = this.getAttribute('height') || 'h-2';
    const showLabel = this.getAttribute('showLabel') === 'true';

    this.innerHTML = `
      <div class="progress-bar-container">
        ${showLabel ? `
          <div class="flex justify-between items-center mb-1">
            <span class="text-xs text-gray-600">Progreso</span>
            <span class="text-xs font-semibold text-gray-700">${progreso}%</span>
          </div>
        ` : ''}
        <div class="w-full bg-gray-200 rounded-full ${height} overflow-hidden">
          <div class="${color} ${height} rounded-full transition-all duration-500 ease-out" 
               style="width: ${progreso}%"
               role="progressbar"
               aria-valuenow="${progreso}"
               aria-valuemin="0"
               aria-valuemax="100">
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('progress-bar', ProgressBar);

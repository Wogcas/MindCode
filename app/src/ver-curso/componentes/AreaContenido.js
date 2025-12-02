// Área de contenido con estilo de las imágenes compartidas
import '../../componentes/ui/VideoPlayer.js';

class AreaContenido extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const tipo = this.getAttribute('tipo') || 'texto';
    const titulo = this.getAttribute('titulo') || 'Curso';
    const fecha = this.getAttribute('fecha') || '';
    const descripcion = this.getAttribute('descripcion') || '';
    const imagen = this.getAttribute('imagen') || '';
    const videoUrl = this.getAttribute('videoUrl') || '';
    const profesorNombre = this.getAttribute('profesorNombre') || 'Profesor';
    const profesorAvatar = this.getAttribute('profesorAvatar') || '';

    this.innerHTML = `
      <div class="area-contenido flex-1 bg-white overflow-y-auto">
        
        <!-- Área de contenido principal -->
        <div class="max-w-5xl mx-auto p-6 sm:p-10">
          
          <!-- Media: Logo grande de iOS (o video) -->
          ${this.renderMedia(tipo, videoUrl, imagen, titulo)}
          
          <!-- Info del curso con estilo de las imágenes -->
          <div class="bg-white rounded-2xl">
            <h1 class="text-3xl sm:text-4xl font-normal text-gray-900 mb-4">
              ${titulo}
            </h1>
            
            ${fecha ? `
              <div class="flex items-center gap-4 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-100">
                <div class="flex items-center gap-2">
                  ${profesorAvatar ? `
                    <img src="${profesorAvatar}" 
                         class="w-10 h-10 rounded-full" 
                         alt="${profesorNombre}">
                  ` : `
                    <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-sm font-semibold">
                      ${profesorNombre.charAt(0).toUpperCase()}
                    </div>
                  `}
                  <span class="font-medium text-gray-800">${profesorNombre}</span>
                </div>
                <span class="text-gray-300">•</span>
                <div class="flex items-center gap-1.5">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  <span>Publicado el: ${fecha}</span>
                </div>
              </div>
            ` : ''}
            
            ${descripcion ? `
              <div class="prose max-w-none">
                <p class="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                  ${descripcion}
                </p>
              </div>
            ` : ''}
          </div>

          <!-- Botones de navegación con diseño de las imágenes -->
          <div class="flex justify-between items-center mt-10 pt-6">
            <button class="btn-anterior px-6 py-3 border-2 border-gray-300 text-gray-700 
                           rounded-full font-medium hover:bg-gray-50 transition-all
                           disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled>
              <span class="flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
                Anterior
              </span>
            </button>
            
            <button class="btn-siguiente px-8 py-3 bg-primary text-white 
                           rounded-full font-semibold hover:bg-primary-600 transition-all
                           shadow-md hover:shadow-lg
                           disabled:opacity-50 disabled:cursor-not-allowed">
              <span class="flex items-center gap-2">
                Siguiente
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    `;

    this.setupEventListeners();
  }

  renderMedia(tipo, videoUrl, imagen, titulo) {
    if (tipo === 'video' && videoUrl) {
      return `
        <div class="mb-8">
          <video-player videoUrl="${videoUrl}" height="h-[400px] sm:h-[500px]"></video-player>
        </div>
      `;
    }
    
    // Logo grande como en las imágenes compartidas
    if (imagen) {
      return `
        <div class="mb-8">
          <div class="bg-white rounded-2xl h-80 sm:h-96 flex items-center justify-center overflow-hidden">
            <img src="${imagen}" 
                 class="max-w-full max-h-full object-contain p-8" 
                 alt="${titulo}"
                 onerror="this.style.display='none';">
          </div>
        </div>
      `;
    }
    
    return '';
  }

  setupEventListeners() {
    const btnAnterior = this.querySelector('.btn-anterior');
    const btnSiguiente = this.querySelector('.btn-siguiente');

    btnAnterior?.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('navegar-anterior', { bubbles: true }));
    });

    btnSiguiente?.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('navegar-siguiente', { bubbles: true }));
    });
  }
}

customElements.define('area-contenido', AreaContenido);

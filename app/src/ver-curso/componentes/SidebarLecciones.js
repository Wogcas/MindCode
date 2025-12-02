// Sidebar de lecciones - DERECHA con diseño de las imágenes
import '../../componentes/ui/LessonCard.js';

class SidebarLecciones extends HTMLElement {
  constructor() {
    super();
    this.modulosExpandidos = new Set();
  }

  connectedCallback() {
    try {
      this.modulos = JSON.parse(this.getAttribute('modulos') || '[]');
      this.leccionActual = this.getAttribute('leccionActual') || null;
      
      if (this.leccionActual) {
        const moduloActual = this.modulos.find(m => 
          m.lecciones.some(l => l.id === this.leccionActual)
        );
        if (moduloActual) {
          this.modulosExpandidos.add(moduloActual.id);
        }
      } else if (this.modulos.length > 0) {
        this.modulosExpandidos.add(this.modulos[0].id);
      }
      
      this.render();
      this.setupEventListeners();
    } catch (error) {
      console.error('Error en SidebarLecciones:', error);
    }
  }

  render() {
    this.innerHTML = `
      <aside class="sidebar-lecciones w-full lg:w-96 bg-white border-l border-gray-200 
                    flex flex-col max-h-screen lg:h-screen">
        
        <!-- Header fijo con scroll up arrow -->
        <div class="flex-shrink-0 bg-white p-6 border-b border-gray-100">
          <div class="flex items-center justify-between mb-2">
            <h2 class="font-normal text-lg text-gray-700">Contenido:</h2>
            <button class="scroll-top-btn p-1 hover:bg-gray-100 rounded-full transition-colors" 
                    title="Volver arriba">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Acordeón scrollable -->
        <div class="accordion-container flex-1 overflow-y-auto">
          ${this.renderModulos()}
        </div>
      </aside>
    `;
  }

  renderModulos() {
    return this.modulos.map((modulo, index) => {
      const isOpen = this.modulosExpandidos.has(modulo.id);
      
      return `
        <div class="modulo-item">
          <!-- Header del acordeón con diseño verde claro -->
          <button class="accordion-header w-full px-6 py-4 flex justify-between items-center 
                         transition-all text-left
                         ${isOpen ? 'bg-primary-100' : 'bg-white hover:bg-gray-50'}"
                  data-modulo-id="${modulo.id}">
            <span class="font-medium ${isOpen ? 'text-primary-700' : 'text-gray-800'} pr-2 line-clamp-2 text-base">
              ${modulo.titulo}
            </span>
            <svg class="w-5 h-5 flex-shrink-0 transform transition-transform duration-200 
                        ${isOpen ? 'rotate-180 text-primary-600' : 'text-gray-400'}" 
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          
          <!-- Contenido del acordeón -->
          <div class="accordion-content transition-all duration-300 ease-in-out overflow-hidden
                      ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}" 
               data-modulo-id="${modulo.id}">
            <div class="bg-gray-50">
              ${this.renderLecciones(modulo.lecciones)}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  renderLecciones(lecciones) {
    return lecciones.map(leccion => `
      <lesson-card
        leccionId="${leccion.id}"
        titulo="${leccion.titulo}"
        completada="${leccion.completada}"
        tipo="${leccion.tipo}"
        activa="${leccion.id === this.leccionActual}"
      ></lesson-card>
    `).join('');
  }

  setupEventListeners() {
    // Scroll to top
    const scrollBtn = this.querySelector('.scroll-top-btn');
    const container = this.querySelector('.accordion-container');
    
    scrollBtn?.addEventListener('click', () => {
      container?.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Toggle acordeón
    this.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', (e) => {
        const moduloId = e.currentTarget.dataset.moduloId;
        this.toggleModulo(moduloId);
      });
    });

    // Delegación de eventos para lecciones
    this.addEventListener('lesson-clicked', (e) => {
      e.stopPropagation();
      this.dispatchEvent(new CustomEvent('cambiar-leccion', {
        detail: { leccionId: e.detail.leccionId },
        bubbles: true,
        composed: true
      }));
    });
  }

  toggleModulo(moduloId) {
    if (this.modulosExpandidos.has(moduloId)) {
      this.modulosExpandidos.delete(moduloId);
    } else {
      this.modulosExpandidos.add(moduloId);
    }
    
    const content = this.querySelector(`[data-modulo-id="${moduloId}"].accordion-content`);
    const header = this.querySelector(`[data-modulo-id="${moduloId}"].accordion-header`);
    const icon = header.querySelector('svg');
    
    if (this.modulosExpandidos.has(moduloId)) {
      content.classList.remove('max-h-0', 'opacity-0');
      content.classList.add('max-h-[2000px]', 'opacity-100');
      header.classList.remove('bg-white', 'hover:bg-gray-50');
      header.classList.add('bg-primary-100');
      header.querySelector('span').classList.add('text-primary-700');
      header.querySelector('span').classList.remove('text-gray-800');
      icon.classList.add('rotate-180', 'text-primary-600');
      icon.classList.remove('text-gray-400');
    } else {
      content.classList.add('max-h-0', 'opacity-0');
      content.classList.remove('max-h-[2000px]', 'opacity-100');
      header.classList.add('bg-white', 'hover:bg-gray-50');
      header.classList.remove('bg-primary-100');
      header.querySelector('span').classList.remove('text-primary-700');
      header.querySelector('span').classList.add('text-gray-800');
      icon.classList.remove('rotate-180', 'text-primary-600');
      icon.classList.add('text-gray-400');
    }
  }

  actualizarLeccionActual(nuevaLeccionId) {
    this.leccionActual = nuevaLeccionId;
    const moduloNuevo = this.modulos.find(m => 
      m.lecciones.some(l => l.id === nuevaLeccionId)
    );
    if (moduloNuevo && !this.modulosExpandidos.has(moduloNuevo.id)) {
      this.toggleModulo(moduloNuevo.id);
    }
    this.render();
    this.setupEventListeners();
  }
}

customElements.define('sidebar-lecciones', SidebarLecciones);

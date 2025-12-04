import './CursoCard.js';
import { cursoService } from '../../api/CursoService.js';

class CursoCarrousel extends HTMLElement {
  constructor() {
    super();
    this.cursos = [];
    this.loading = true;
  }

  async connectedCallback() {
    await this.cargarCursosPublicos();
    this.render();
    this.initDragScroll();
  }

  async cargarCursosPublicos() {
    try {
      this.loading = true;
      const resultado = await cursoService.fetchAvailableCourses({ limit: 10 });
      
      if (resultado.success) {
        this.cursos = resultado.cursos;
      }
    } catch (error) {
      console.error('Error al cargar cursos disponibles:', error);
      this.cursos = [];
    } finally {
      this.loading = false;
    }
  }

  render() {
    if (this.loading) {
      this.innerHTML = `
        <div class="mb-8">
          <div class="flex gap-4 overflow-x-auto pb-4">
            <div class="flex items-center justify-center w-full py-10">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </div>
        </div>
      `;
      return;
    }

    if (this.cursos.length === 0) {
      this.innerHTML = `
        <div class="mb-8">
          <div class="flex items-center justify-center py-10 bg-gray-100 rounded-2xl">
            <p class="text-gray-500">No hay cursos disponibles en este momento</p>
          </div>
        </div>
      `;
      return;
    }

    this.innerHTML = `
      <div class="mb-8">
        <div id="slider" class="flex gap-4 overflow-x-auto pb-4 scrollbar-hide cursor-grab select-none">
          ${this.cursos.map(curso => `
            <curso-card
              title="${curso.titulo || 'Sin título'}"
              image="${curso.imagen || 'https://via.placeholder.com/400x300?text=Curso'}"
              cursoId="${curso.id}"
              visibilidad="${curso.visibilidad || 'Privado'}"
              type="general">
            </curso-card>
          `).join('')}
        </div>
      </div>
      
      <style>
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        
        /* Estilos para cuando se está arrastrando */
        .cursor-grab { cursor: grab; }
        .cursor-grabbing { cursor: grabbing !important; }
      </style>
    `;
  }

  initDragScroll() {
    const slider = this.querySelector('#slider');
    let isDown = false;
    let isDragging = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
      if (e.target.closest('curso-card')) {
        isDown = true;
        isDragging = false;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      }
    });

    slider.addEventListener('mouseleave', () => {
      isDown = false;
      isDragging = false;
      slider.classList.remove('cursor-grabbing');
    });

    slider.addEventListener('mouseup', (e) => {
      isDown = false;
      slider.classList.remove('cursor-grabbing');
      
      if (isDragging) {
        e.preventDefault();
        e.stopPropagation();
        isDragging = false;
      }
    });

    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();

      const x = e.pageX - slider.offsetLeft;
      const walk = x - startX;
      
      if (Math.abs(walk) > 5) {
        isDragging = true;
        slider.classList.add('cursor-grabbing');
        slider.scrollLeft = scrollLeft - walk;
      }
    });
  }
}

customElements.define('curso-carrousel', CursoCarrousel);
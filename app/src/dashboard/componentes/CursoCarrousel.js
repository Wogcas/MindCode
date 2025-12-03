import './CursoCard.js';

class CursoCarrousel extends HTMLElement {
  async connectedCallback() {
    let cursos = [];

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/cursos', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const json = await response.json();

        const data = json.data || json;

        cursos = data;
      }
    } catch (error) {
      console.error("Error cargando cursos en dashboard:", error);
    }

    this.innerHTML = `
      <div class="relative w-full overflow-hidden">
        <div 
          id="slider" 
          class="flex gap-6 overflow-x-auto scroll-smooth pb-8 w-full cursor-grab active:cursor-grabbing scrollbar-hide"
        >
          ${cursos.length > 0 ? cursos.map(curso => `
    <curso-card
      id="${curso._id}"  title="${curso.titulo}" 
      image="${curso.imagen || ''}" 
      type="general">
      </curso-card>
      `).join('') : '<p class="text-gray-500">No tienes cursos todavía.</p>'}
        </div>
      </div>
      
      <style>
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .cursor-grab { cursor: grab; }
        .cursor-grabbing { cursor: grabbing !important; }
      </style>
    `;

    this.initDragScroll();
  }

  initDragScroll() {
    const slider = this.querySelector('#slider');
    if (!slider) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.classList.add('cursor-grabbing');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('cursor-grabbing');
    });

    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('cursor-grabbing');
    });

    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    });
  }
}

customElements.define('curso-carrousel', CursoCarrousel);
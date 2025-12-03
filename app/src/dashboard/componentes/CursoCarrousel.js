import './CursoCard.js';

class CursoCarrousel extends HTMLElement {
  connectedCallback() {
    const cursos = [
      {
        title: 'Todo lo que tienes que saber de los Fundamentos',
        image: 'https://s1.significados.com/foto/software-og.jpg',
        type: 'general'
      },
      {
        title: 'Todo lo que tienes que saber de React',
        image: '',
        type: 'react'
      },
      {
        title: 'Todo lo que tienes que saber de CSS Moderno',
        image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&q=80&w=1000',
        type: 'css'
      },
      {
        title: 'Todo lo que tienes que saber de Node.js',
        image: 'https://antonio-richaud.com/blog/imagenes/archivo/14-node-js/nodejs.png',
        type: 'backend'
      },
      {
        title: 'Todo lo que tienes que saber de TypeScript',
        image: 'https://www.rabitsolutions.com/wp-content/uploads/2023/09/typescript-cover-cropped-1300x600.jpeg',
        type: 'typescript'
      }
    ];

    this.innerHTML = `
      <div class="mb-8">
        <div id="slider" class="flex gap-4 overflow-x-auto pb-4 scrollbar-hide cursor-grab select-none">
          ${cursos.map(curso => `
            <curso-card
              class="pointer-events-none" 
              title="${curso.title}"
              image="${curso.image}"
              type="${curso.type}">
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

    this.initDragScroll();
  }

  initDragScroll() {
    const slider = this.querySelector('#slider');
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
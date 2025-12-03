// Componente de Card de Curso para Alumnos
import { navigateTo } from '../../utils/router-estudiante.js';
import '../../componentes/ui/ProgressBar.js';

class CursoCardAlumno extends HTMLElement {
  connectedCallback() {
    const cursoId = this.getAttribute('cursoId');
    const titulo = this.getAttribute('titulo') || 'Curso';
    const imagen = this.getAttribute('imagen') || '';
    const progreso = this.getAttribute('progreso') || 0;
    const participantes = this.getAttribute('participantes') || '0/0';

    this.innerHTML = `
      <div class="curso-card-alumno bg-primary rounded-3xl p-4 shadow-lg 
                  hover:shadow-xl hover:-translate-y-1 transition-all duration-300 
                  flex flex-col h-full cursor-pointer"
           data-curso-id="${cursoId}">
        
        <!-- Imagen del curso -->
        <div class="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl 
                    h-40 mb-4 overflow-hidden flex items-center justify-center">
          ${imagen ? `
            <img src="${imagen}" 
                 class="w-full h-full object-cover" 
                 alt="${titulo}"
                 onerror="this.style.display='none'">
          ` : `
            <svg class="w-16 h-16 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
          `}
        </div>
        
        <!-- Título -->
        <h3 class="text-white font-medium text-lg mb-3 px-2 line-clamp-2 flex-grow">
          ${titulo}
        </h3>
        
        <!-- Barra de progreso -->
        <div class="px-2 mb-3">
          <progress-bar progreso="${progreso}" color="bg-white" height="h-2"></progress-bar>
        </div>
        
        <!-- Participantes -->
        <p class="text-white text-sm px-2 mb-4 opacity-90">
          Participantes: ${participantes}
        </p>
        
        <!-- Botón Ver -->
        <button class="ver-curso-btn mt-auto bg-white text-primary font-semibold 
                       py-2.5 px-6 rounded-full w-full hover:bg-gray-100 
                       transition-colors shadow-md">
          Ver
        </button>
      </div>
    `;

    this.setupClickHandler();
  }

  setupClickHandler() {
    const btn = this.querySelector('.ver-curso-btn');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const cursoId = this.getAttribute('cursoId');
      navigateTo(`/curso/${cursoId}/leccion-1-1`);
    });
  }
}

customElements.define('curso-card-alumno', CursoCardAlumno);

// Vista de Mis Cursos del Estudiante - Integrada con el diseño existente
import { cursosEstudiante } from '../data/mockData.js';
import './componentes/CursoCardAlumno.js';

class MisCursosAlumno extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <section class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
        
        <!-- Header con título y enlace -->
        <div class="flex justify-between items-center mb-10">
          <h1 class="text-4xl font-normal text-gray-900 tracking-tight">
            Mis cursos
          </h1>
          
          <a href="#/explorar" 
             class="text-primary font-medium flex items-center gap-2 
                    hover:text-primary-600 transition-colors group">
            <span>Todos los cursos</span>
            <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
        
        <!-- Grid de cursos -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${this.renderCursos()}
        </div>

        <!-- Mensaje si no hay cursos -->
        ${cursosEstudiante.length === 0 ? this.renderMensajeVacio() : ''}
      </section>
    `;
  }

  renderCursos() {
    return cursosEstudiante.map(curso => `
      <curso-card-alumno
        cursoId="${curso.id}"
        titulo="${curso.titulo}"
        imagen="${curso.imagen}"
        progreso="${curso.progreso}"
        participantes="${curso.participantes}"
      ></curso-card-alumno>
    `).join('');
  }

  renderMensajeVacio() {
    return `
      <div class="col-span-full flex flex-col items-center justify-center py-20">
        <svg class="w-24 h-24 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
        </svg>
        <h3 class="text-xl font-medium text-gray-700 mb-2">No tienes cursos inscritos</h3>
        <p class="text-gray-500 mb-6">Explora nuestro catálogo y comienza a aprender</p>
        <a href="#/explorar" 
           class="bg-primary text-white px-8 py-3 rounded-full font-semibold 
                  hover:bg-primary-600 transition-colors">
          Explorar Cursos
        </a>
      </div>
    `;
  }
}

customElements.define('mis-cursos-alumno', MisCursosAlumno);

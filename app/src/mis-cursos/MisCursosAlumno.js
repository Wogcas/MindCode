import './componentes/CursoCardAlumno.js';
import { cursoService } from '../api/CursoService.js';

class MisCursosAlumno extends HTMLElement {
  async connectedCallback() {
    await this.render();
  }

  async render() {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    
    // Mostrar loader
    this.innerHTML = `
      <div class="max-w-7xl mx-auto px-6 pt-8 pb-6 min-h-screen flex items-center justify-center">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p class="text-gray-500">Cargando tus cursos...</p>
        </div>
      </div>
    `;

    try {
      // Obtener cursos inscritos del alumno
      const resultado = await cursoService.fetchStudentCourses();
      const misCursos = resultado.cursos || [];

      this.innerHTML = `
        <div class="max-w-7xl mx-auto px-6 pt-8 pb-6 animate-fade-in">
          
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                  <h1 class="text-3xl font-bold text-gray-800">Mis Cursos</h1>
                  <p class="text-gray-500 mt-1">Continúa donde te quedaste</p>
              </div>
              
              ${misCursos.length > 2 ? `
              <div class="relative w-full md:w-72">
                  <input type="text" id="search-input" placeholder="Buscar en mis cursos..." 
                         class="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all">
                  <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
              </div>
              ` : ''}
          </div>

          ${misCursos.length > 0 
            ? `<div id="cursos-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  ${misCursos.map(curso => {
                    const cursoId = curso.id || curso._id;
                    const progreso = curso.progreso?.porcentaje || 0;
                    return `
                      <curso-card-alumno 
                          id="${cursoId}"
                          titulo="${curso.titulo}"
                          progreso="${progreso}"
                          imagen="${curso.imagen || 'https://via.placeholder.com/400x300?text=Curso'}"
                          participantes="${curso.participantes || 0}"
                      ></curso-card-alumno>
                    `;
                  }).join('')}
               </div>`
            : `<div class="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                  <div class="inline-flex bg-white p-4 rounded-full shadow-sm mb-4">
                      <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                      </svg>
                  </div>
                  <h3 class="text-lg font-medium text-gray-900">Aún no tienes cursos</h3>
                  <p class="text-gray-500 mb-6">¡Explora el catálogo y empieza a aprender!</p>
                  <a href="?vista=dashboardAlumno" class="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition">
                    Ver Sugerencias
                  </a>
               </div>`
          }
        </div>
      `;

      // Agregar funcionalidad de búsqueda si hay cursos
      if (misCursos.length > 2) {
        this.setupSearch(misCursos);
      }

    } catch (error) {
      console.error("Error cargando cursos del alumno:", error);
      this.innerHTML = `
        <div class="max-w-7xl mx-auto px-6 pt-8 pb-6 min-h-screen flex items-center justify-center">
          <div class="text-center">
            <svg class="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Error al cargar tus cursos</h3>
            <p class="text-gray-500 mb-4">${error.message || 'Intenta nuevamente más tarde'}</p>
            <button onclick="window.location.reload()" class="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition">
              Reintentar
            </button>
          </div>
        </div>
      `;
    }
  }

  setupSearch(cursos) {
    const searchInput = this.querySelector('#search-input');
    const grid = this.querySelector('#cursos-grid');
    
    if (!searchInput || !grid) return;

    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const cards = grid.querySelectorAll('curso-card-alumno');
      
      cards.forEach(card => {
        const titulo = card.getAttribute('titulo').toLowerCase();
        if (titulo.includes(searchTerm)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }
}

customElements.define('mis-cursos-alumno', MisCursosAlumno);
export default MisCursosAlumno;
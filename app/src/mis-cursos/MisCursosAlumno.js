// Vista de Mis Cursos del Estudiante - Integrada con Backend
import './componentes/CursoCardAlumno.js';
import { cursoService } from '../api/CursoService.js';

class MisCursosAlumno extends HTMLElement {
  constructor() {
    super();
    this.cursos = [];
    this.loading = true;
    this.error = null;
  }

  async connectedCallback() {
    this.render();
    await this.cargarCursos();
  }

  async cargarCursos() {
    try {
      this.loading = true;
      this.mostrarEstadoCarga();

      const resultado = await cursoService.fetchStudentCourses();
      
      if (resultado.success) {
        this.cursos = resultado.cursos;
        this.error = null;
      }
    } catch (error) {
      console.error('Error al cargar cursos:', error);
      this.error = error.message || 'Error al cargar los cursos';
    } finally {
      this.loading = false;
      this.actualizarVista();
    }
  }

  mostrarEstadoCarga() {
    const cursosGrid = this.querySelector('#cursosGrid');
    if (cursosGrid) {
      cursosGrid.innerHTML = `
        <div class="col-span-full flex justify-center items-center py-20">
          <div class="text-center">
            <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p class="mt-4 text-gray-600">Cargando tus cursos...</p>
          </div>
        </div>
      `;
    }
  }

  actualizarVista() {
    const cursosGrid = this.querySelector('#cursosGrid');
    if (cursosGrid) {
      cursosGrid.innerHTML = this.renderCursos();
    }
  }

  render() {
    this.innerHTML = `
      <section class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
        
        <!-- Header con título y enlace -->
        <div class="flex justify-between items-center mb-10">
          <h1 class="text-4xl font-normal text-gray-900 tracking-tight">
            Mis cursos
          </h1>
          
          <a href="index.html?vista=explorar" 
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
        <div id="cursosGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${this.renderCursos()}
        </div>
      </section>
    `;
  }

  renderCursos() {
    if (this.loading) {
      return `
        <div class="col-span-full flex justify-center items-center py-20">
          <div class="text-center">
            <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p class="mt-4 text-gray-600">Cargando tus cursos...</p>
          </div>
        </div>
      `;
    }

    if (this.error) {
      return `
        <div class="col-span-full flex justify-center items-center py-20">
          <div class="text-center">
            <svg class="mx-auto h-12 w-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
            <p class="mt-4 text-gray-700 font-medium">${this.error}</p>
            <button onclick="location.reload()" class="mt-4 bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-600">
              Reintentar
            </button>
          </div>
        </div>
      `;
    }

    if (this.cursos.length === 0) {
      return this.renderMensajeVacio();
    }

    return this.cursos.map(curso => {
      const progreso = curso.progreso?.porcentaje || 0;
      
      return `
        <curso-card-alumno
          cursoId="${curso.id}"
          titulo="${curso.titulo || 'Sin título'}"
          imagen="${curso.imagen || 'https://via.placeholder.com/400x250?text=Curso'}"
          progreso="${progreso}"
          participantes="${curso.participantes || 0}"
        ></curso-card-alumno>
      `;
    }).join('');
  }

  renderMensajeVacio() {
    return `
      <div class="col-span-full flex flex-col items-center justify-center py-20">
        <svg class="w-24 h-24 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
        </svg>
        <h3 class="text-xl font-medium text-gray-700 mb-2">No tienes cursos inscritos</h3>
        <p class="text-gray-500 mb-6">Explora nuestro catálogo y comienza a aprender</p>
        <a href="index.html?vista=explorar" 
           class="bg-primary text-white px-8 py-3 rounded-full font-semibold 
                  hover:bg-primary-600 transition-colors">
          Explorar Cursos
        </a>
      </div>
    `;
  }
}

customElements.define('mis-cursos-alumno', MisCursosAlumno);

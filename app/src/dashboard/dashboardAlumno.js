import './componentes/bienvenida.js';
import './componentes/CursoCarrousel.js';
import './componentes/SugerenciasCard.js';
import { cursoService } from '../api/CursoService.js'; 

class DashboardAlumno extends HTMLElement {
  constructor() {
    super();
    this.listeners = [];
    this.abortController = null;
    console.log('[DashboardAlumno] Constructor ejecutado');
  }

  async connectedCallback() {
    console.log('[DashboardAlumno] connectedCallback ejecutado - COMPONENTE MONTADO');
    
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    const nombreUsuario = usuario.nombre || 'Estudiante';

    console.log('[DashboardAlumno] Iniciando carga...', { usuario: usuario.nombre, tipo: usuario.tipo });

    // 1. Render inicial con loader
    this.innerHTML = `
      <div class="min-h-screen bg-gray-50 px-10 pt-8 pb-10 font-sans sm:px-20 sm:pt-10 flex flex-col items-center justify-center">
         <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
         <p class="text-gray-500 mt-4">Cargando tu dashboard...</p>
      </div>
    `;

    try {
      console.log('[DashboardAlumno] Obteniendo cursos...');
      
      // 2. Obtener cursos inscritos y disponibles
      const [cursosInscritos, todosLosCursos] = await Promise.all([
        cursoService.fetchStudentCourses().catch(err => {
          console.error('[DashboardAlumno] Error fetchStudentCourses:', err);
          return { cursos: [] };
        }),
        cursoService.fetchAllCourses().catch(err => {
          console.error('[DashboardAlumno] Error fetchAllCourses:', err);
          return { cursos: [] };
        })
      ]);

      console.log('[DashboardAlumno] Datos recibidos:', { 
        cursosInscritos: cursosInscritos.cursos?.length || 0, 
        todosLosCursos: todosLosCursos.cursos?.length || 0 
      });

      const misCursos = cursosInscritos.cursos || [];
      const cursos = todosLosCursos.cursos || [];

      // 3. Filtrar cursos disponibles (no inscritos y no propios)
      const cursosInscritosIds = new Set(misCursos.map(c => c.id || c._id));
      const cursosDisponibles = cursos.filter(c => {
        const cursoId = c.id || c._id;
        return !cursosInscritosIds.has(cursoId) && c.id_maestro !== usuario.id;
      });

      // 4. Seleccionar curso sugerido aleatorio
      let cursoSugerido = null;
      if (cursosDisponibles.length > 0) {
        const randomIndex = Math.floor(Math.random() * cursosDisponibles.length);
        cursoSugerido = cursosDisponibles[randomIndex];
      }

      const idSugerido = cursoSugerido ? (cursoSugerido._id || cursoSugerido.id) : '';
      const tituloSugerido = cursoSugerido ? cursoSugerido.titulo : 'Explora nuevos cursos';
      const imagenSugerido = cursoSugerido && cursoSugerido.imagen ? cursoSugerido.imagen : 'https://assets.pluhe.com/blog/small/JqxsAtj7G5bc4D8vfE5LKrGjLhm2dgYi7aRtEXBd.jpg';
      const descSugerido = cursoSugerido ? cursoSugerido.descripcion : 'Descubre contenido increíble para potenciar tus habilidades.';

      console.log('[DashboardAlumno] Preparando render final con:', { 
        misCursos: misCursos.length, 
        cursosDisponibles: cursosDisponibles.length,
        cursoSugerido: !!cursoSugerido 
      });

      // Escapar el JSON para evitar problemas con comillas
      const cursosJSON = JSON.stringify(misCursos).replace(/'/g, "\\'");

      // 5. Render final con datos reales
      this.innerHTML = `
        <div class="min-h-screen bg-gray-50 px-10 pt-8 pb-10 font-sans sm:px-20 sm:pt-10">
          
          <bienvenida-usuario 
            nombre="${nombreUsuario}"
            class="flex items-center"
          >
          </bienvenida-usuario>
          
          ${misCursos.length > 0 ? `
            <h2 class="text-xl font-light text-primary-text mb-6">Continúa aprendiendo</h2>
            <curso-carrousel cursos='${cursosJSON}'></curso-carrousel>
          ` : ''}
          
          ${cursosDisponibles.length > 0 ? `
            <h2 class="text-xl font-light text-primary-text mb-6 ${misCursos.length > 0 ? 'mt-10' : ''}">
              ${misCursos.length > 0 ? 'Explora más cursos' : 'Cursos disponibles para ti'}
            </h2>
            <div class="mb-8">
              <div id="slider-disponibles" class="flex gap-4 overflow-x-auto pb-4 scrollbar-hide cursor-grab select-none">
                ${cursosDisponibles.slice(0, 10).map(curso => {
                  const cursoId = curso.id || curso._id;
                  return `
                    <div class="curso-card-disponible bg-white rounded-2xl overflow-hidden shadow-lg w-[280px] min-w-[280px] flex-shrink-0 flex flex-col cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-200" data-id="${cursoId}">
                      <div class="p-4">
                        <div class="bg-gradient-to-br from-primary to-primary-700 rounded-xl overflow-hidden h-44 flex items-center justify-center">
                          <img src="${curso.imagen || 'https://via.placeholder.com/400x300?text=Curso'}" alt="${curso.titulo}" class="w-full h-full object-cover">
                        </div>
                      </div>
                      <div class="px-6 pb-6 flex-grow flex flex-col justify-between">
                        <h3 class="text-sm font-bold text-gray-800 leading-tight mb-3 line-clamp-2">${curso.titulo}</h3>
                        <button class="w-full bg-primary text-white py-2 rounded-lg text-sm font-semibold hover:bg-primary-600 transition">
                          Ver Curso
                        </button>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          ` : ''}
          
          ${misCursos.length === 0 && cursosDisponibles.length === 0 ? `
            <div class="bg-white rounded-xl p-8 mb-6 text-center border border-gray-200">
              <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
              <h3 class="text-lg font-semibold text-gray-700 mb-2">No hay cursos disponibles</h3>
              <p class="text-gray-500">Los maestros aún no han creado cursos. Vuelve pronto.</p>
            </div>
          ` : ''}
          
          ${cursoSugerido ? `
            <h2 class="text-xl font-light text-primary-text mb-6 mt-10">Sugerencia especial para ti</h2>
            <sugerencias-card 
              id="${idSugerido}"
              title="${tituloSugerido}"
              image="${imagenSugerido}"
              description="${descSugerido}"
            ></sugerencias-card>
          ` : ''}
          
        </div>
        
        <style>
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        </style>
      `;

      console.log('[DashboardAlumno] Render completado. Configurando eventos...');

      // Agregar eventos a las tarjetas de cursos disponibles
      const cardsDisponibles = this.querySelectorAll('.curso-card-disponible');
      console.log('[DashboardAlumno] Tarjetas encontradas:', cardsDisponibles.length);
      
      cardsDisponibles.forEach(card => {
        const handler = () => {
          const cursoId = card.dataset.id;
          console.log('[DashboardAlumno] Click en curso:', cursoId);
          window.location.href = `?vista=unirseACurso&id=${cursoId}`;
        };
        card.addEventListener('click', handler);
        this.addListener(card, 'click', handler);
      });

      console.log('[DashboardAlumno] ✅ Dashboard cargado exitosamente');

    } catch (error) {
      console.error("Error cargando dashboard:", error);
      this.innerHTML = `
        <div class="min-h-screen bg-gray-50 p-10 flex flex-col items-center justify-center">
          <svg class="w-16 h-16 text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <p class="text-red-500 font-semibold">Error cargando tu dashboard</p>
          <p class="text-gray-500 mt-2">${error.message || 'Intenta nuevamente más tarde'}</p>
          <button onclick="window.location.reload()" class="mt-4 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition">
            Reintentar
          </button>
        </div>
      `;
    }
  }

  disconnectedCallback() {
    // Cancelar peticiones pendientes
    if (this.abortController) {
      this.abortController.abort();
    }
    
    // Limpiar listeners
    this.listeners.forEach(({ element, event, handler }) => {
      if (element && element.removeEventListener) {
        element.removeEventListener(event, handler);
      }
    });
    this.listeners = [];
  }

  addListener(element, event, handler) {
    if (element && element.addEventListener) {
      element.addEventListener(event, handler);
      this.listeners.push({ element, event, handler });
    }
  }
}

customElements.define('dashboard-alumno', DashboardAlumno);
import './componentes/bienvenida.js';
import './componentes/CursoCarrousel.js';
import './componentes/SugerenciasCard.js';
import { cursoService } from '../api/CursoService.js'; 

class DashboardAlumno extends HTMLElement {
  async connectedCallback() {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    const nombreUsuario = usuario.nombre || 'Estudiante';

    // 1. Render inicial (con loaders o esqueletos si quisieras)
    this.innerHTML = `
      <div class="min-h-screen bg-gray-50 pl-10 p-10 pt-5 font-sans sm:p-20 sm:pt-10 flex flex-col items-center justify-center">
         <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    `;

    try {
      // 2. Traer cursos reales
      const respuesta = await cursoService.fetchStudentCourses(); // O fetchAllCourses() según tu servicio
      const cursos = respuesta.data || respuesta || [];

      // 3. Elegir un curso para sugerir (Ej: Uno aleatorio)
      let cursoSugerido = null;
      if (cursos.length > 0) {
        const randomIndex = Math.floor(Math.random() * cursos.length);
        cursoSugerido = cursos[randomIndex];
      }

      // Datos para la tarjeta (con fallbacks por si faltan datos)
      const idSugerido = cursoSugerido ? (cursoSugerido._id || cursoSugerido.id) : '';
      const tituloSugerido = cursoSugerido ? cursoSugerido.titulo : 'Explora nuevos cursos';
      const imagenSugerido = cursoSugerido && cursoSugerido.imagen ? cursoSugerido.imagen : 'https://assets.pluhe.com/blog/small/JqxsAtj7G5bc4D8vfE5LKrGjLhm2dgYi7aRtEXBd.jpg';
      const descSugerido = cursoSugerido ? cursoSugerido.descripcion : 'Descubre contenido increíble para potenciar tus habilidades.';

      // 4. Render Final con datos reales
      this.innerHTML = `
        <div class="min-h-screen bg-gray-50 pl-10 p-10 pt-5 font-sans sm:p-20 sm:pt-10">
          
          <bienvenida-usuario 
            nombre="${nombreUsuario}"
            class="flex items-center"
          >
          </bienvenida-usuario>
          
          <h2 class="text-xl font-light text-primary-text mb-6">¿Qué aprender ahora?</h2>
          
          <curso-carrousel></curso-carrousel>
          
          <h2 class="text-xl font-light text-primary-text mb-6 mt-10">Nuestras sugerencias para ti</h2>
          
          ${cursoSugerido ? `
            <sugerencias-card 
              id="${idSugerido}"
              title="${tituloSugerido}"
              image="${imagenSugerido}"
              description="${descSugerido}"
            ></sugerencias-card>
          ` : `
            <p class="text-gray-500">No hay sugerencias disponibles por el momento.</p>
          `}
          
        </div>
      `;

    } catch (error) {
      console.error("Error cargando dashboard:", error);
      this.innerHTML = `<div class="p-10 text-red-500">Error cargando información.</div>`;
    }
  }
}

customElements.define('dashboard-alumno', DashboardAlumno);
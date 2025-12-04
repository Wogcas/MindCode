import "../componentes/headerAlumno.js";
import "./componentes/cursoImagen.js";
import "./componentes/cursoInfo.js";
import "./componentes/botonUnirse.js";
import "../componentes/modalAlerta.js";

class UnirseACurso extends HTMLElement {
  connectedCallback() {
    this.cursoId = new URLSearchParams(window.location.search).get('curso');
    this.render();
    this.init();
  }

  render() {
    this.innerHTML = `
      <header-alumno></header-alumno>
      
      <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
        <div class="max-w-4xl mx-auto">
          
          <h1 class="text-3xl font-light text-gray-900 mb-8">
            Unirse a curso - Estudiante
          </h1>

          <div class="bg-white rounded-xl shadow-sm overflow-hidden">
            
            <!-- Imagen del curso -->
            <curso-imagen 
              id="imagenCurso"
              src="../../assets/images/js-course.jpg"
              alt="Curso de JavaScript">
            </curso-imagen>

            <!-- Info del curso -->
            <curso-info id="infoCurso"></curso-info>

            <!-- Botón Unirse -->
            <boton-unirse id="botonUnirse"></boton-unirse>

          </div>
        </div>
      </div>
    `;
  }

  init() {
    this.cargarCurso();
    this.setupEventListeners();
  }

  setupEventListeners() {
    const botonUnirse = this.querySelector('#botonUnirse');
    const btn = botonUnirse.querySelector('#btnUnirse');
    
    btn.addEventListener('click', async () => {
      await this.unirseAlCurso();
    });
  }

  async cargarCurso() {
    if (!this.cursoId) {
      console.warn('No se proporcionó ID de curso');
      this.mostrarAlerta('No se encontró el curso');
      return;
    }

    try {
      // TODO: Conectar con API real
      // const curso = await CursoAPI.obtenerCursoPorId(this.cursoId);
      
      // Datos de ejemplo mientras conectas el backend
      const cursoEjemplo = {
        id: this.cursoId,
        titulo: 'Curso conceptos básicos de JavaScript',
        descripcion: '¡Hola! 👋 Soy Luke, tu profesor, y me emociona mucho que te unas a este curso. Si siempre has querido entender cómo funcionan las páginas web interactivas y estás listo para dar tus primeros pasos en el desarrollo, este es el lugar perfecto para empezar.',
        fecha_creacion: '2025-09-17',
        imagen: '../../assets/images/js-course.jpg'
      };

      this.renderizarCurso(cursoEjemplo);
      
    } catch (error) {
      console.error('Error al cargar curso:', error);
      this.mostrarAlerta('Error al cargar el curso');
    }
  }

  renderizarCurso(curso) {
    // Actualizar imagen
    const imagenCurso = this.querySelector('#imagenCurso');
    if (curso.imagen) {
      imagenCurso.setAttribute('src', curso.imagen);
    }

    // Actualizar info
    const infoCurso = this.querySelector('#infoCurso');
    infoCurso.setData(curso);
  }

  async unirseAlCurso() {
    const botonUnirse = this.querySelector('#botonUnirse');
    
    try {
      botonUnirse.setLoading(true);

      // TODO: Conectar con API real
      // await CursoAPI.inscribirseACurso(this.cursoId);
      
      console.log('Uniéndose al curso:', this.cursoId);
      
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      this.mostrarAlerta('¡Te has unido al curso exitosamente!', () => {
        window.location.href = 'index.html?vista=miAprendizaje';
      });
      
    } catch (error) {
      console.error('Error al unirse al curso:', error);
      this.mostrarAlerta('Error al unirse al curso. Intenta nuevamente.');
    } finally {
      botonUnirse.setLoading(false);
    }
  }

  mostrarAlerta(texto, callback) {
    const modal = document.createElement("modal-alerta");
    modal.setAttribute("mensaje", texto);
    document.body.appendChild(modal);

    modal.addEventListener("aceptar", () => {
      if (callback) callback();
    });
  }
}

customElements.define("unirse-a-curso", UnirseACurso);
export default UnirseACurso;
import "./componentes/cursoImagen.js";
import "./componentes/cursoInfo.js";
import "./componentes/botonUnirse.js";
import "../componentes/modalAlerta.js";
import { cursoService } from '../api/CursoService.js';

class UnirseACurso extends HTMLElement {
  connectedCallback() {
    this.cursoId = new URLSearchParams(window.location.search).get('id');
    this.render();
    this.init();
  }

  render() {
    this.innerHTML = `
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
      this.mostrarAlerta('No se encontró el curso');
      return;
    }

    try {
      const resultado = await cursoService.fetchCourseWithParticipants(this.cursoId);
      
      if (resultado.success) {
        this.renderizarCurso(resultado.curso);
      }
      
    } catch (error) {
      console.error('Error al cargar curso:', error);
      this.mostrarAlerta(error.message || 'Error al cargar el curso');
    }
  }

  renderizarCurso(curso) {
    // Actualizar imagen
    const imagenCurso = this.querySelector('#imagenCurso');
    if (curso.imagen) {
      imagenCurso.setAttribute('src', curso.imagen);
      imagenCurso.setAttribute('alt', curso.titulo);
    }

    // Actualizar info
    const infoCurso = this.querySelector('#infoCurso');
    const cursoData = {
      id: curso.id,
      titulo: curso.titulo,
      descripcion: curso.descripcion,
      fecha_creacion: curso.createdAt ? new Date(curso.createdAt).toLocaleDateString('es-ES') : 'N/A',
      imagen: curso.imagen,
      participantes: curso.participantes || 0,
      visibilidad: curso.visibilidad
    };
    infoCurso.setData(cursoData);

    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const botonUnirse = this.querySelector('#botonUnirse');
    if (usuario && curso.id_maestro === usuario.id) {
      botonUnirse.style.display = 'none';
      const mensaje = document.createElement('p');
      mensaje.className = 'text-center text-yellow-400 font-semibold mt-4';
      mensaje.textContent = 'Este es tu curso';
      this.querySelector('.max-w-4xl').appendChild(mensaje);
    }
  }

  async unirseAlCurso() {
    const botonUnirse = this.querySelector('#botonUnirse');
    
    try {
      botonUnirse.setLoading(true);

      const resultado = await cursoService.enrollInCourse(this.cursoId);
      
      if (resultado.success) {
        this.mostrarAlerta('¡Te has inscrito exitosamente al curso!', () => {
          window.location.href = '?vista=cursosAlumno';
        });
      }
      
    } catch (error) {
      console.error('Error al inscribirse al curso:', error);
      const mensaje = error.message || 'Error al inscribirse al curso. Intenta nuevamente.';
      this.mostrarAlerta(mensaje);
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
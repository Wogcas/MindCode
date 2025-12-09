// Vista del Player de Lección con sidebar a la DERECHA
import { cursosDetalles } from '../data/mockData.js';
//import { navigateTo } from '../utils/router-estudiante.js';
import './componentes/SidebarLecciones.js';
import './componentes/AreaContenido.js';

class VisorLeccion extends HTMLElement {
  connectedCallback() {
    this.cursoId = this.getAttribute('cursoId');
    this.leccionId = this.getAttribute('leccionId');
    
    this.cursoDatos = cursosDetalles[this.cursoId];
    
    if (!this.cursoDatos) {
      console.error(`Curso ${this.cursoId} no encontrado`);
      navigateTo('/404');
      return;
    }

    if (!this.leccionId && this.cursoDatos.modulos.length > 0) {
      this.leccionId = this.cursoDatos.modulos[0].lecciones[0].id;
    }

    this.render();
    this.setupEventListeners();
  }

  render() {
    const leccionActual = this.obtenerLeccionActual();
    
    if (!leccionActual) {
      console.error(`Lección ${this.leccionId} no encontrada`);
      return;
    }

    // Si es reto, redirigir
    if (leccionActual.tipo === 'reto') {
      navigateTo(`/reto/${this.leccionId}`);
      return;
    }

    this.innerHTML = `
      <div class="visor-leccion flex flex-col lg:flex-row min-h-screen bg-white">
        
        <!-- Contenido principal a la IZQUIERDA -->
        <area-contenido
          class="flex-1 order-2 lg:order-1"
          tipo="${leccionActual.tipo}"
          titulo="${this.cursoDatos.titulo}"
          fecha="${this.cursoDatos.fechaPublicacion}"
          descripcion="${this.cursoDatos.descripcion}"
          imagen="${this.cursoDatos.imagen}"
          videoUrl="${leccionActual.contenido?.videoUrl || ''}"
          profesorNombre="${this.cursoDatos.profesor.nombre}"
          profesorAvatar="${this.cursoDatos.profesor.avatar}"
        ></area-contenido>
        
        <!-- Sidebar a la DERECHA -->
        <sidebar-lecciones 
          class="order-1 lg:order-2"
          modulos='${JSON.stringify(this.cursoDatos.modulos)}'
          leccionActual="${this.leccionId}"
        ></sidebar-lecciones>
      </div>
    `;
  }

  obtenerLeccionActual() {
    for (const modulo of this.cursoDatos.modulos) {
      const leccion = modulo.lecciones.find(l => l.id === this.leccionId);
      if (leccion) return leccion;
    }
    return null;
  }

  obtenerLeccionSiguiente() {
    let encontrada = false;
    for (const modulo of this.cursoDatos.modulos) {
      for (const leccion of modulo.lecciones) {
        if (encontrada) return leccion;
        if (leccion.id === this.leccionId) encontrada = true;
      }
    }
    return null;
  }

  obtenerLeccionAnterior() {
    let leccionAnterior = null;
    for (const modulo of this.cursoDatos.modulos) {
      for (const leccion of modulo.lecciones) {
        if (leccion.id === this.leccionId) return leccionAnterior;
        leccionAnterior = leccion;
      }
    }
    return null;
  }

  setupEventListeners() {
    this.addEventListener('cambiar-leccion', (e) => {
      const nuevaLeccionId = e.detail.leccionId;
      
      if (nuevaLeccionId !== this.leccionId) {
        this.leccionId = nuevaLeccionId;
        const leccionActual = this.obtenerLeccionActual();
        
        if (leccionActual && leccionActual.tipo === 'reto') {
          navigateTo(`/reto/${this.leccionId}`);
        } else {
          window.location.hash = `/curso/${this.cursoId}/${this.leccionId}`;
          this.render();
          this.setupEventListeners();
          
          const sidebar = this.querySelector('sidebar-lecciones');
          if (sidebar && sidebar.actualizarLeccionActual) {
            sidebar.actualizarLeccionActual(this.leccionId);
          }
        }
      }
    });

    // Navegación con botones
    this.addEventListener('navegar-siguiente', () => {
      const siguiente = this.obtenerLeccionSiguiente();
      if (siguiente) {
        this.dispatchEvent(new CustomEvent('cambiar-leccion', {
          detail: { leccionId: siguiente.id },
          bubbles: true
        }));
      }
    });

    this.addEventListener('navegar-anterior', () => {
      const anterior = this.obtenerLeccionAnterior();
      if (anterior) {
        this.dispatchEvent(new CustomEvent('cambiar-leccion', {
          detail: { leccionId: anterior.id },
          bubbles: true
        }));
      }
    });
  }
}

customElements.define('visor-leccion', VisorLeccion);

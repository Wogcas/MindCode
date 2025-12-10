import './componentes/bienvenida.js';
import './componentes/CursoCarrousel.js';
import './componentes/SugerenciasCard.js';
import './componentes/AccionesRapidas.js';
// Importamos el componente de creación (asegúrate de que la ruta sea correcta)
import '../crear-curso/CrearCurso.js'; 

class DashboardMaestro extends HTMLElement {
    connectedCallback() {
        // 1. Obtener usuario real
        const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
        const nombreUsuario = usuario.nombre || 'Maestro';

        this.innerHTML = `
      <div class="min-h-screen bg-gray-50 pl-10 p-10 pt-5 font-sans sm:p-20 sm:pt-10 relative">
        
        <bienvenida-usuario 
          nombre="${nombreUsuario}"
          class="flex items-center"
          >
        </bienvenida-usuario>
        <h2 class="text-2xl font-semibold mt-8 mb-4">Tus Cursos</h2>
        <curso-carrousel></curso-carrousel>
        
      </div>
    `;

    }

    abrirModalCrearCurso() {
        // Creamos la instancia del componente
        const modal = document.createElement('crear-curso');
        
        // Escuchamos cuando se crea un curso para refrescar la lista (opcional pero recomendado)
        modal.addEventListener('curso-creado', (e) => {
            console.log("Nuevo curso creado:", e.detail);
            // Aquí podrías recargar el carrusel:
            // const carrousel = this.querySelector('curso-carrousel');
            // if(carrousel) carrousel.cargarCursos(); 
            // O simplemente recargar la página:
            setTimeout(() => window.location.reload(), 1000);
        });

        // Lo agregamos al cuerpo del documento (para que cubra todo)
        document.body.appendChild(modal);
    }
}

customElements.define('dashboard-maestro', DashboardMaestro);
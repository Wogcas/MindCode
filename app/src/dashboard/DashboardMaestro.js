import './componentes/bienvenida.js';
import './componentes/CursoCarrousel.js';
import './componentes/SugerenciasCard.js';
import './componentes/AccionesRapidas.js';

class DashboardMaestro extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
      <div class="min-h-screen bg-gray-50 pl-10 p-10 pt-5 font-sans sm:p-20 sm:pt-10">
        <bienvenida-usuario 
          nombre="Esmeralda Molina"
          class="flex items-center"
          >
        </bienvenida-usuario>
        <h2 class="text-xl font-light text-primary-text mb-6">Acciones rápidas</h2>
        <acciones-rapidas></acciones-rapidas>
        <h2 class="text-xl font-light text-primary-text mb-6">Mis cursos</h2>
        <curso-carrousel></curso-carrousel>
        
      </div>
    `;
    }
}

customElements.define('dashboard-maestro', DashboardMaestro);
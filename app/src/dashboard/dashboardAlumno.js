import './componentes/bienvenida.js';
import '../componentes/cursoCard.js';

class DashboardAlumno extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="p-6">
        <bienvenida-usuario 
          text="Te damos la bienvenida, Esmeralda Molina"
          profile="https://definicion.de/wp-content/uploads/2010/11/curso-1.jpg">
        </bienvenida-usuario>

        <curso-card
          title="Curso de HTML"
          image="https://definicion.de/wp-content/uploads/2010/11/curso-1.jpg">
        </curso-card>
      </div>
    `;
  }
}

customElements.define('dashboard-alumno', DashboardAlumno);
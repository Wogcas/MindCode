import './componentes/bienvenida.js';
import './componentes/CursoCarrousel.js';
import './componentes/SugerenciasCard.js';

class DashboardAlumno extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="min-h-screen bg-gray-50 pl-10 p-10 pt-5 font-sans sm:p-20 sm:pt-10">
        <bienvenida-usuario 
          nombre="Esmeralda Molina"
          class="flex items-center"
          >
        </bienvenida-usuario>
        <h2 class="text-xl font-light text-primary-text mb-6">¿Qué aprender ahora?</h2>
        <curso-carrousel></curso-carrousel>
         <h2 class="text-xl font-light text-primary-text mb-6">Nuestras sugerencias para ti</h2>
        <sugerencias-card 
          title="Curso conceptos básicos de JavaScript"
          image="https://assets.pluhe.com/blog/small/JqxsAtj7G5bc4D8vfE5LKrGjLhm2dgYi7aRtEXBd.jpg"
          description="Ready to transform your digital dresence? Let's create magic together! book our services now!"
        />
      </div>
    `;
  }
}

customElements.define('dashboard-alumno', DashboardAlumno);
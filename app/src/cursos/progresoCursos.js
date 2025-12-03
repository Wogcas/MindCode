import "./componentes/cursoProgresoCard.js";

class ProgresoCursos extends HTMLElement {

  connectedCallback() {

    this.innerHTML = `
      <div class="min-h-screen px-6 py-10 sm:px-20 bg-gradient-to-b from-white to-blue-50">

        <h1 class="text-3xl font-light text-black mb-10">
          Progresión de cursos
        </h1>

        <div class="grid gap-6">

          <curso-progreso-card
            titulo="Todo lo que tienes que saber de iOS"
            progreso="100"
            boton="Repasar">
          </curso-progreso-card>

          <curso-progreso-card
            titulo="Todo lo que tienes que saber de iOS"
            progreso="95"
            boton="Continuar">
          </curso-progreso-card>

          <curso-progreso-card
            titulo="Todo lo que tienes que saber de React"
            progreso="67"
            boton="Continuar">
          </curso-progreso-card>

          <curso-progreso-card
            titulo="Todo lo que tienes que saber de React"
            progreso="32"
            boton="Continuar">
          </curso-progreso-card>

        </div>
      </div>
    `;
  }
}

customElements.define("progreso-cursos", ProgresoCursos);
export default ProgresoCursos;

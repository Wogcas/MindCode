import "./componentes/retoTipoCard.js";
import "./componentes/botonPrimario.js";

class CrearRetoMenu extends HTMLElement {

  connectedCallback() {
    this.innerHTML = `
      <div class="min-h-screen bg-white px-4 py-6 sm:px-20 sm:py-10 font-sans">

        <header class="mb-8">
          <h1 class="text-3xl font-light text-black">Centro de retos</h1>
          <p class="text-sm text-gray-500">Elige el tipo de reto que deseas crear</p>
        </header>

        <section class="p-6 rounded-2xl shadow-sm border space-y-3">

          <reto-tipo-card
            title="Reto de código"
            description="El alumno escribe y ejecuta código"
            color="#64A85F"
            onclick="window.location.href='retos.html?tipo=codigo'"
          ></reto-tipo-card>

          <reto-tipo-card
            title="Opción múltiple"
            description="Preguntas con varias opciones"
            color="#A0CDFE"
            onclick="window.location.href='retos.html?tipo=multiple'"
          ></reto-tipo-card>

          <reto-tipo-card
            title="Preguntas abiertas"
            description="Respuestas escritas por el estudiante"
            color="#E7C0FF"
            onclick="window.location.href='retos.html?tipo=abierto'"
          ></reto-tipo-card>
        
          <div class="flex justify-end mt-4">
            <boton-primario texto="Agregar nuevo reto"></boton-primario>
          </div>

        </section>
      </div>
    `;
  }
}

customElements.define("crear-reto-menu", CrearRetoMenu);
export default CrearRetoMenu;

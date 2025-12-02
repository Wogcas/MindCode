import "./componentes/campoNombre.js";
import "./componentes/campoDescripcion.js";
import "./componentes/botonPrimario.js";

class RetoAbierto extends HTMLElement {

  connectedCallback() {
    this.innerHTML = `
      <div class="min-h-screen bg-white px-4 py-6 sm:px-20 sm:py-10 font-sans">

        <!-- Título -->
        <h1 class="text-3xl font-light text-black mb-10">Detalles del reto</h1>

        <section class="space-y-6">

          <!-- Nombre -->
          <campo-nombre></campo-nombre>

          <!-- Descripción -->
          <campo-descripcion></campo-descripcion>

          <!-- Pregunta dinámica -->
          <div>
            <label class="text-sm font-normal text-black">Crea cuestionario de múltiples respuestas</label>

            <div class="flex justify-between items-center mt-2">
              <input
                id="preguntaInput"
                placeholder="Pregunta"
                class="w-2/3 px-4 py-2 rounded-md bg-[#D9E8F5] outline-none border border-transparent focus:border-[#64A85F] transition"
              />

              <button
                id="btnAgregarPregunta"
                class="px-4 py-2 rounded-full text-white text-sm shadow-md font-medium ml-4"
                style="background-color:#64A85F">
                + Agregar pregunta
              </button>
            </div>
          </div>

          <!-- Contenedor de preguntas -->
          <div id="preguntasContainer" class="space-y-3"></div>

          <!-- Opción de respuestas -->
          <div>
            <label class="text-sm font-normal text-black">Opción de Respuestas</label>
            <textarea
              class="w-full mt-2 px-4 py-3 h-24 rounded-md bg-[#D9E8F5] 
                     resize-none outline-none border border-transparent 
                     focus:border-[#64A85F] transition"
            ></textarea>
          </div>

          <!-- Botones -->
          <div class="mt-10 flex justify-center gap-6">
            <boton-primario texto="Cancelar"></boton-primario>
            <boton-primario texto="Agregar Reto"></boton-primario>
          </div>

        </section>
      </div>
    `;

    this.initPreguntas();
  }

  initPreguntas() {
    const input = this.querySelector("#preguntaInput");
    const boton = this.querySelector("#btnAgregarPregunta");
    const container = this.querySelector("#preguntasContainer");

    boton.addEventListener("click", () => {
      if (!input.value.trim()) return;

      const textarea = document.createElement("textarea");
      textarea.placeholder = input.value.trim();
      textarea.className =
        "w-full px-4 py-3 h-20 rounded-md bg-[#D9E8F5] resize-none outline-none border border-transparent focus:border-[#64A85F] transition";

      container.appendChild(textarea);
      input.value = "";
    });
  }
}

customElements.define("reto-abierto", RetoAbierto);
export default RetoAbierto;

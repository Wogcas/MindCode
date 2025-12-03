import "./componentes/campoNombre.js";
import "./componentes/campoDescripcion.js";
import "../componentes/modalAlerta.js";
import "./componentes/botonPrimario.js";
import RetoAPI from "../api/RetoAPI.js";  

class RetoAbierto extends HTMLElement {

  connectedCallback() {
    this.render();
    this.init();
  }

  render() {
    this.innerHTML = `
      <div class="min-h-screen bg-white px-4 py-6 sm:px-20 sm:py-10 font-sans">
        <h1 class="text-3xl font-light text-black mb-10">Detalles del reto</h1>

        <section class="space-y-6">

          <campo-nombre></campo-nombre>
          <campo-descripcion></campo-descripcion>

          <div>
            <label class="text-sm text-black">Preguntas del cuestionario</label>

            <div class="flex justify-between items-center mt-2">
              <input
                id="preguntaInput"
                placeholder="Escribe una pregunta..."
                class="w-2/3 px-4 py-2 rounded-md bg-[#D9E8F5] outline-none"
              />

              <button
                id="btnAgregarPregunta"
                class="px-4 py-2 rounded-full text-white shadow-md ml-4"
                style="background-color:#64A85F">
                + Agregar
              </button>
            </div>
          </div>

          <div id="preguntasContainer" class="space-y-3"></div>

          <div class="mt-10 flex justify-center gap-6">
            <boton-primario id="btnCancelar" texto="Cancelar"></boton-primario>
            <boton-primario id="btnGuardar" texto="Agregar Reto"></boton-primario>
          </div>

        </section>
      </div>
    `;
  }

  init() {
    const cancelar = this.querySelector("#btnCancelar button");
    const guardar = this.querySelector("#btnGuardar button");
    const input = this.querySelector("#preguntaInput");
    const addBtn = this.querySelector("#btnAgregarPregunta");
    const container = this.querySelector("#preguntasContainer");

    addBtn.addEventListener("click", () => {
      const texto = input.value.trim();
      if (!texto) return this.mostrarAlerta("Ingresa una pregunta");

      const textarea = document.createElement("textarea");
      textarea.placeholder = texto;
      textarea.className =
        "w-full px-4 py-3 h-20 rounded-md bg-[#D9E8F5] resize-none outline-none";

      container.appendChild(textarea);
      input.value = "";
    });

    cancelar.addEventListener("click", () => {
      this.mostrarConfirmacion("¿Seguro? Se perderán los cambios.", () => {
        window.location.href = "index.html?vista=retos";
      });
    });

    guardar.addEventListener("click", () => this.guardarReto());  
  }

  async guardarReto() {
    try {
      const nombre = this.querySelector("campo-nombre input")?.value.trim();
      const descripcion = this.querySelector("campo-descripcion textarea")?.value.trim();
      const container = this.querySelector("#preguntasContainer");

      const preguntas = [...container.querySelectorAll("textarea")]
        .map(t => t.placeholder.trim())
        .filter(Boolean);

      if (!nombre) return this.mostrarAlerta("Por favor ingresa el nombre del reto");
      if (!descripcion) return this.mostrarAlerta("Por favor ingresa la descripción del reto");
      if (preguntas.length === 0) return this.mostrarAlerta("Agrega al menos una pregunta");

      const retoData = {
        titulo: nombre,
        descripcion,
        preguntas: preguntas.map(p => ({
          contenido: p,
          tipo: "abierta",
          respuestas: [] 
        })),
        lecciones: []
      };

      console.log("Enviando reto abierto:", retoData);

      const respuesta = await RetoAPI.crearReto(retoData);

      console.log("Respuesta del servidor:", respuesta);

      this.mostrarAlerta("¡Reto guardado correctamente!", () => {
        window.location.href = "index.html?vista=retos";
      });

    } catch (error) {
      console.error("Error guardando reto:", error);
      this.mostrarAlerta(`Error: ${error.message}`);
    }
  }

  mostrarAlerta(texto, callback) {
    const modal = document.createElement("modal-alerta");
    modal.setAttribute("mensaje", texto);
    document.body.appendChild(modal);

    modal.addEventListener("aceptar", () => callback && callback());
  }

  mostrarConfirmacion(texto, onConfirm) {
    const modal = document.createElement("modal-alerta");
    modal.setAttribute("mensaje", texto);
    modal.setAttribute("tipo", "confirmacion");
    document.body.appendChild(modal);

    modal.addEventListener("aceptar", onConfirm);
  }
}

customElements.define("reto-abierto", RetoAbierto);
export default RetoAbierto;
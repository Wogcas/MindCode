import "./componentes/foroCampoNombre.js";
import "./componentes/foroCampoDescripcion.js";
import "./componentes/foroCampoEtiqueta.js";
import "./componentes/foroListaEtiquetas.js";
import "../retos/componentes/botonPrimario.js";

class CrearForo extends HTMLElement {

  connectedCallback() {
    this.render();
    this.inicializarEtiquetaListener();
    this.insertarEtiquetasIniciales(); 
  }

  render() {
    this.innerHTML = `
      <div class="min-h-screen bg-white px-4 py-6 sm:px-20 sm:py-10 font-sans">

        <!-- Título -->
        <h1 class="text-3xl text-black mb-10 font-light">
          Crear Foro
        </h1>

        <section class="space-y-6">

          <foro-campo-nombre></foro-campo-nombre>
          <foro-campo-descripcion></foro-campo-descripcion>
          <foro-campo-etiqueta></foro-campo-etiqueta>

          <foro-lista-etiquetas id="listaEtiquetas"></foro-lista-etiquetas>

          <div class="mt-10 flex justify-center gap-6">
            <button onclick="window.history.back()"
              class="px-10 py-4 rounded-full shadow-md font-medium text-white"
              style="background-color:#2A6BBF">
              Cancelar
            </button>

            <button
              class="px-10 py-4 rounded-full shadow-md font-medium text-white"
              style="background-color:#2A6BBF">
              Agregar Foro
            </button>
          </div>

        </section>
      </div>
    `;
  }

  inicializarEtiquetaListener() {
    const campo = this.querySelector("foro-campo-etiqueta");
    const lista = this.querySelector("#listaEtiquetas");

    if (!campo || !lista) return;

    const input = campo.querySelector("#inputEtiqueta");
    const boton = campo.querySelector("#btnAgregarEtiqueta");

    if (!input || !boton) return;

    boton.addEventListener("click", () => {
      if (input.value.trim()) {
        lista.agregarEtiqueta(input.value.trim());
        input.value = "";
      }
    });
  }

  insertarEtiquetasIniciales() {
    const lista = this.querySelector("#listaEtiquetas");

    if (!lista) return;

    setTimeout(() => {
      lista.agregarEtiqueta("Programación");
      lista.agregarEtiqueta("JavaScript");
      lista.agregarEtiqueta("Código");
    }, 50);
  }
}

customElements.define("crear-foro", CrearForo);
export default CrearForo;

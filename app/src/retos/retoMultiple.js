import "./componentes/campoNombre.js";
import "./componentes/campoDescripcion.js";
import "./componentes/listaOpciones.js";
import "./componentes/botonPrimario.js";

class RetoMultiple extends HTMLElement {

  connectedCallback() {
    this.innerHTML = `
      <div class="min-h-screen bg-white px-4 py-6 sm:px-20 sm:py-10 font-sans">

        <h1 class="text-3xl font-light text-black mb-10">Detalles del reto</h1>

        <section class="space-y-6">

          <campo-nombre></campo-nombre>
          <campo-descripcion></campo-descripcion>
          <lista-opciones></lista-opciones>

          <div class="flex justify-center gap-6 pt-6">
            <boton-primario texto="Cancelar"></boton-primario>
            <boton-primario texto="Agregar Reto"></botonPrimario>
          </div>

        </section>
      </div>
    `;
  }
}

customElements.define("reto-multiple", RetoMultiple);
export default RetoMultiple;

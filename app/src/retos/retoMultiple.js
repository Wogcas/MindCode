import "./componentes/campoNombre.js";
import "./componentes/campoDescripcion.js";
import "./componentes/listaOpciones.js";
import "./componentes/botonPrimario.js";
import "../componentes/modalAlerta.js";

class RetoMultiple extends HTMLElement {
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
          <lista-opciones></lista-opciones>

          <div class="flex justify-center gap-6 pt-6">
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
    const lista = this.querySelector("lista-opciones");

    cancelar.addEventListener("click", () => {
      this.mostrarConfirmacion("¿Seguro? Se perderán los cambios.", () => {
        window.location.href = "index.html?vista=retos";
      });
    });

    guardar.addEventListener("click", () => {
      const nombre = this.querySelector("campo-nombre input")?.value.trim();
      const descripcion = this.querySelector("campo-descripcion textarea")?.value.trim();

      const opciones = [...lista.querySelectorAll("input")]
        .map(e => e.value.trim())
        .filter(Boolean);

      if (!nombre) return this.mostrarAlerta("Por favor ingresa el nombre del reto");
      if (!descripcion) return this.mostrarAlerta("Por favor ingresa la descripción del reto");
      if (opciones.length === 0) return this.mostrarAlerta("Agrega al menos una opción");

      this.mostrarAlerta("¡Reto guardado correctamente!", () => {
        window.location.href = "index.html?vista=dashboardMaestro";
      });
    });
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

customElements.define("reto-multiple", RetoMultiple);
export default RetoMultiple;

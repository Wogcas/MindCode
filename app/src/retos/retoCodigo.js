import "./componentes/campoNombre.js";
import "./componentes/campoDescripcion.js";
import "./componentes/editorCodigo.js";
import "./componentes/botonPrimario.js";
import "../componentes/modalAlerta.js";

class RetoCodigo extends HTMLElement {
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
          <editor-codigo></editor-codigo>

          <div class="flex justify-center gap-6 pt-6">
            <boton-primario id="btnCancelar" texto="Cancelar"></boton-primario>
            <boton-primario id="btnGuardar" texto="Agregar Reto"></boton-primario>

        </section>
      </div>
    `;
  }

  init() {
    const cancelar = this.querySelector("#btnCancelar button");
    const guardar = this.querySelector("#btnGuardar button");

    cancelar.addEventListener("click", () => {
      this.mostrarConfirmacion("¿Seguro? Se perderán los cambios.", () => {
        window.location.href = "index.html?vista=retos";
      });
    });

    guardar.addEventListener("click", () => {
      const nombre = this.querySelector("campo-nombre input")?.value.trim();
      const descripcion = this.querySelector("campo-descripcion textarea")?.value.trim();

      if (!nombre) return this.mostrarAlerta("Por favor ingresa el nombre del reto");
      if (!descripcion) return this.mostrarAlerta("Por favor ingresa la descripción del reto");

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

    modal.addEventListener("aceptar", onConfirm);
    document.body.appendChild(modal);
  }
}

customElements.define("reto-codigo", RetoCodigo);
export default RetoCodigo;

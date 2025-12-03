import "./componentes/foroCampoNombre.js";
import "./componentes/foroCampoDescripcion.js";
import "./componentes/foroCampoEtiqueta.js";
import "./componentes/foroListaEtiquetas.js";
import "../retos/componentes/botonPrimario.js";
import "../componentes/modalAlerta.js";

class CrearForo extends HTMLElement {

  connectedCallback() {
    this.render();
    this.inicializarEtiquetaListener();
    this.insertarEtiquetasIniciales();
    this.init();
  }

  render() {
    this.innerHTML = `
      <div class="min-h-screen bg-white px-4 py-6 sm:px-20 sm:py-10 font-sans">
        <h1 class="text-3xl text-black mb-10 font-light">Crear Foro</h1>

        <section class="space-y-6">

          <foro-campo-nombre></foro-campo-nombre>
          <foro-campo-descripcion></foro-campo-descripcion>
          <foro-campo-etiqueta></foro-campo-etiqueta>

          <foro-lista-etiquetas id="listaEtiquetas"></foro-lista-etiquetas>

          <div class="mt-10 flex justify-center gap-6">
            <boton-primario id="btnCancelar" texto="Cancelar"></boton-primario>
            <boton-primario id="btnGuardar" texto="Agregar Foro"></boton-primario>
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

  init() {
    const cancelar = this.querySelector("#btnCancelar button");
    const guardar = this.querySelector("#btnGuardar button");

    cancelar.addEventListener("click", () => {
      this.mostrarConfirmacion("¿Seguro? Se perderán los cambios.", () => {
        window.location.href = "index.html?vista=foros";
      });
    });

    guardar.addEventListener("click", () => {

      const titulo = this.querySelector("foro-campo-nombre input")?.value.trim();
      const descripcion = this.querySelector("foro-campo-descripcion textarea")?.value.trim();
      const lista = this.querySelector("#listaEtiquetas");

      const etiquetas = lista?.obtenerEtiquetas?.() || [];

      if (!titulo) return this.mostrarAlerta("Por favor ingresa el título del foro");
      if (!descripcion) return this.mostrarAlerta("Por favor ingresa la descripción del foro");
      if (etiquetas.length === 0) return this.mostrarAlerta("Por favor agrega al menos una etiqueta");

      this.mostrarAlerta("¡Foro creado correctamente!", () => {
        window.location.href = "index.html?vista=foros";
      });
    });
  }

  mostrarAlerta(texto, callback) {
    const modal = document.createElement("modal-alerta");
    modal.setAttribute("mensaje", texto);
    document.body.appendChild(modal);
    modal.addEventListener("aceptar", () => callback?.());
  }

  mostrarConfirmacion(texto, onConfirm) {
    const modal = document.createElement("modal-alerta");
    modal.setAttribute("mensaje", texto);
    modal.setAttribute("tipo", "confirmacion");
    modal.addEventListener("aceptar", onConfirm);
    document.body.appendChild(modal);
  }
}

customElements.define("crear-foro", CrearForo);
export default CrearForo;

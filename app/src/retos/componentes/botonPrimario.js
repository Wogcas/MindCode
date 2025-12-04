/**
 * Botón azul reutilizable
 */

class BotonPrimario extends HTMLElement {
  connectedCallback() {
    const texto = this.getAttribute("texto") || "Guardar";

    this.innerHTML = `
      <button
        class="px-6 py-3 rounded-full shadow-md font-medium text-white"
        style="background-color:#2A6BBF">
        ${texto}
      </button>
    `;
  }
}

customElements.define("boton-primario", BotonPrimario);
export default BotonPrimario;

class PerfilCampoParrafo extends HTMLElement {
  connectedCallback() {
    const label = this.getAttribute("label");
    const valor = this.getAttribute("valor");
    const editable = this.getAttribute("editable") === "true";

    this.innerHTML = `
      <div class="max-w-lg">
        <p class="text-sm font-medium text-gray-700 mb-1">${label}</p>

        ${
          editable
            ? `<textarea class="px-3 py-2 bg-gray-100 rounded-md w-full h-28 outline-none border border-gray-300">${valor}</textarea>`
            : `<p class="text-gray-900">${valor}</p>`
        }
      </div>
    `;
  }
}

customElements.define("perfil-campo-parrafo", PerfilCampoParrafo);
export default PerfilCampoParrafo;

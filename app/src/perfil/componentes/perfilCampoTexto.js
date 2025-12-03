class PerfilCampoTexto extends HTMLElement {
  connectedCallback() {
    const label = this.getAttribute("label");
    const valor = this.getAttribute("valor");
    const editable = this.getAttribute("editable") === "true";

    this.innerHTML = `
      <div>
        <p class="text-sm font-medium text-gray-700 mb-1">${label}</p>
        
        ${
          editable
            ? `<input class="px-3 py-2 bg-gray-100 rounded-md w-64 outline-none border border-gray-300"
                      value="${valor}" />`
            : `<p class="text-gray-900 text-lg">${valor}</p>`
        }
      </div>
    `;
  }
}

customElements.define("perfil-campo-texto", PerfilCampoTexto);
export default PerfilCampoTexto;

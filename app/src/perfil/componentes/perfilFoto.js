class PerfilFoto extends HTMLElement {

  connectedCallback() {
    const tipo = this.getAttribute("tipo");
    const avatar = tipo === "maestro"
      ? "../../assets/images/fotoEstudiante.png"
      : "../../assets/images/fotoMaestro.png";

    this.innerHTML = `
      <div class="flex items-center gap-6 mb-6">
        <img src="${avatar}"
          class="w-28 h-28 object-cover rounded-lg shadow"/>

        <button class="bg-[#2A6BBF] hover:bg-[#1E4F91] text-white px-4 py-2 rounded-lg">
          Cambiar foto
        </button>
      </div>
    `;
  }
}

customElements.define("perfil-foto", PerfilFoto);
export default PerfilFoto;

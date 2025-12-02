import "./foroEtiquetaChip.js";

class ForoListaEtiquetas extends HTMLElement {

  connectedCallback() {
    this.innerHTML = `
      <div id="tagContainer" class="flex flex-wrap gap-3 mt-4"></div>
    `;
  }

  agregarEtiqueta(nombre) {
    const chip = document.createElement("foro-etiqueta");
    chip.setAttribute("texto", nombre);
    this.querySelector("#tagContainer").appendChild(chip);
  }
}

customElements.define("foro-lista-etiquetas", ForoListaEtiquetas);
export default ForoListaEtiquetas;

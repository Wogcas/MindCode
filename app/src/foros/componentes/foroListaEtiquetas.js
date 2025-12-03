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

    chip.classList.add("chip");

    this.querySelector("#tagContainer").appendChild(chip);
  }

  obtenerEtiquetas() {
    return [...this.querySelectorAll(".chip")].map(chip =>
      chip.textContent.trim()
    );
  }
}

customElements.define("foro-lista-etiquetas", ForoListaEtiquetas);
export default ForoListaEtiquetas;

import "./leccionBloque.js";

class CursoListaLecciones extends HTMLElement {

  connectedCallback() {
    const titulo = this.getAttribute("titulo") ?? "Contenido del curso";

    this.innerHTML = `
      <div class="space-y-3 h-[500px] overflow-y-auto pr-2 scrollbar-hide">
        <h3 class="font-light text-gray-800 mb-2">${titulo}</h3>
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("curso-lista-lecciones", CursoListaLecciones);
export default CursoListaLecciones;

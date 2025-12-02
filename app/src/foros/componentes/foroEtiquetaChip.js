class ForoEtiquetaChip extends HTMLElement {
    connectedCallback() {
      const texto = this.getAttribute("texto") || "Etiqueta";
      const tipo = texto.toLowerCase();
  
      let color = "#DCDCAA"; // default: código
  
      if (tipo.includes("programa")) color = "#E7C0FF";
      if (tipo.includes("javascript")) color = "#EC740A";
  
      this.innerHTML = `
        <span 
          class="px-4 py-2 rounded-full text-sm font-normal shadow text-gray-900"
          style="background:${color}">
          ${texto}
        </span>
      `;
    }
  }
  
  customElements.define("foro-etiqueta", ForoEtiquetaChip);
  export default ForoEtiquetaChip;
  
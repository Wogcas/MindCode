class LeccionBloque extends HTMLElement {
    connectedCallback() {
      const titulo = this.getAttribute("titulo") || "";
      const color = this.getAttribute("color") || "#64A85F";
      const subtareasAttr = this.getAttribute("subtareas");
      const subtareas = subtareasAttr ? JSON.parse(subtareasAttr) : [];
      const expandible = this.getAttribute("expandible") === "true";
  
      this.innerHTML = `
        <details class="rounded-lg p-3 cursor-pointer text-white"
          style="background-color:${color}">
  
          <summary class="font-medium flex justify-between items-center">
            ${titulo}
          </summary>
  
          ${expandible ? `
            <ul class="ml-4 mt-2 text-gray-800 bg-white rounded-lg p-2 space-y-1">
              ${subtareas.map(s => `
                <li class="flex items-center gap-2">
                  <input type="checkbox">
                  <span>${s}</span>
                </li>
              `).join("")}
            </ul>
          ` : ""}
        </details>
      `;
    }
  }
  customElements.define("leccion-bloque", LeccionBloque);
  export default LeccionBloque;
  
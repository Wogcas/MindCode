/**
 * Lista dinámicas para agregar inputs (opción múltiple)
 */

class ListaOpciones extends HTMLElement {

    connectedCallback() {
      this.innerHTML = `
        <div>
          <p class="text-sm font-medium text-gray-700 mb-1">Opciones de respuesta</p>
          <div id="opcionesContainer" class="space-y-2"></div>
  
          <button id="btnAgregarOpcion"
            class="mt-2 text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full hover:bg-blue-200">
            + Agregar opción
          </button>
        </div>
      `;
  
      this.setup();
    }
  
    setup() {
      const container = this.querySelector("#opcionesContainer");
      this.querySelector("#btnAgregarOpcion").addEventListener("click", () => {
        const input = document.createElement("input");
        input.placeholder = "Nueva opción";
        input.className = `w-full px-4 py-2 rounded-md bg-[#D9E8F5] 
                           outline-none focus:bg-white border focus:border-[#64A85F]`;
        container.appendChild(input);
      });
    }
  }
  
  customElements.define("lista-opciones", ListaOpciones);
  export default ListaOpciones;
  
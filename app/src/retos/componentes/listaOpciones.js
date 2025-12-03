/**
 * Lista dinámica para agregar inputs (opción múltiple)
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
      this.agregarOpcion();
    });
  }

  agregarOpcion(valor = '', esCorrecta = false) {
    const container = this.querySelector("#opcionesContainer");
    const opcionDiv = document.createElement("div");
    opcionDiv.className = "flex items-center gap-2";
    
    opcionDiv.innerHTML = `
      <input type="checkbox" class="w-4 h-4 cursor-pointer" ${esCorrecta ? 'checked' : ''}>
      <input type="text" value="${valor}" placeholder="Nueva opción"
        class="flex-1 px-4 py-2 rounded-md bg-[#D9E8F5] 
               outline-none focus:bg-white border focus:border-[#64A85F]">
      <button class="btn-eliminar text-red-500 hover:text-red-700 px-2">✕</button>
    `;

    // Eliminar opción
    opcionDiv.querySelector('.btn-eliminar').addEventListener('click', () => {
      opcionDiv.remove();
    });

    container.appendChild(opcionDiv);
  }

  // Obtener todas las opciones con su estado
  getOpciones() {
    const container = this.querySelector("#opcionesContainer");
    const opciones = [];
    
    container.querySelectorAll('div').forEach(div => {
      const checkbox = div.querySelector('input[type="checkbox"]');
      const input = div.querySelector('input[type="text"]');
      
      if (input && input.value.trim()) {
        opciones.push({
          contenido: input.value.trim(),
          es_correcta: checkbox?.checked || false
        });
      }
    });

    return opciones;
  }

  // Establecer opciones
  setOpciones(opciones) {
    const container = this.querySelector("#opcionesContainer");
    container.innerHTML = '';
    opciones.forEach(op => {
      this.agregarOpcion(op.contenido, op.es_correcta);
    });
  }
}

customElements.define("lista-opciones", ListaOpciones);
export default ListaOpciones;
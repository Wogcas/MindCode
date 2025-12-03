/**
 * Campo de texto reutilizable para Nombre del Foro
 */
class ForoCampoNombre extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <div>
          <label class="text-sm font-normal text-black">Título del foro</label>
          <input 
            class="w-full mt-2 px-4 py-3 
                   rounded-md bg-[#BACBD9] outline-none border border-transparent
                   focus:border-[#64A85F] transition font-normal"
          />
        </div>
      `;
    }
  }
  
  customElements.define("foro-campo-nombre", ForoCampoNombre);
  export default ForoCampoNombre;
  
/**
 * Campo de descripción reutilizable
 */
class ForoCampoDescripcion extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <div>
          <label class="text-sm font-normal text-black">Descripción del foro</label>
          <textarea 
            class="w-full mt-2 px-4 py-3 h-28 
                   rounded-md bg-[#BACBD9] resize-none outline-none border border-transparent
                   focus:border-[#64A85F] transition font-normal"
          ></textarea>
        </div>
      `;
    }
  }
  
  customElements.define("foro-campo-descripcion", ForoCampoDescripcion);
  export default ForoCampoDescripcion;
  
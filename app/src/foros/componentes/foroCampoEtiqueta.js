class ForoCampoEtiqueta extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <div>
          <label class="text-sm text-black font-normal">Etiquetas</label>
  
          <div class="flex justify-between items-center mt-2">
  
            <input
              id="inputEtiqueta"
              placeholder="Agrega etiquetas relacionadas con el tema del foro"
              class="w-2/3 px-4 py-3 rounded-md bg-[#BACBD9] 
                     outline-none border border-transparent
                     focus:border-[#64A85F] transition font-normal"
            />
  
            <button id="btnAgregarEtiqueta"
              class="px-5 py-2 rounded-full text-white text-sm shadow-md ml-4"
              style="background-color:#64A85F">
              + Agregar etiquetas
            </button>
  
          </div>
        </div>
      `;
    }
  }
  
  customElements.define("foro-campo-etiqueta", ForoCampoEtiqueta);
  export default ForoCampoEtiqueta;
  
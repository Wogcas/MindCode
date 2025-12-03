/**
 * Campo textarea reutilizable: descripción
 */

class CampoDescripcion extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div>
        <label class="text-sm font-normal text-black">Descripción</label>
        <textarea id="textareaDescripcion" class="w-full mt-2 px-4 py-3 rounded-md h-28 bg-[#D9E8F5] 
                          outline-none border border-transparent resize-none
                          focus:border-[#64A85F] transition"></textarea>
      </div>
    `;
  }

  // Método para obtener el valor
  getValue() {
    return this.querySelector('#textareaDescripcion')?.value.trim() || '';
  }

  // Método para establecer el valor
  setValue(value) {
    const textarea = this.querySelector('#textareaDescripcion');
    if (textarea) textarea.value = value;
  }
}

customElements.define("campo-descripcion", CampoDescripcion);
export default CampoDescripcion;
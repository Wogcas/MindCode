/**
 * Campo de entrada reutilizable: Nombre del reto
 */

class CampoNombre extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div>
        <label class="text-sm font-normal text-black">Nombre del reto</label>
        <input id="inputNombre" class="w-full mt-2 px-4 py-3 rounded-md bg-[#D9E8F5] 
                     outline-none border border-transparent 
                     focus:border-[#64A85F] transition"/>
      </div>
    `;
  }

  // Método para obtener el valor
  getValue() {
    return this.querySelector('#inputNombre')?.value.trim() || '';
  }

  // Método para establecer el valor
  setValue(value) {
    const input = this.querySelector('#inputNombre');
    if (input) input.value = value;
  }
}

customElements.define("campo-nombre", CampoNombre);
export default CampoNombre;
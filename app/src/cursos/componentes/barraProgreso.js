class BarraProgreso extends HTMLElement {
    connectedCallback() {
      const porcentaje = this.getAttribute("value") || 0;
  
      this.innerHTML = `
        <div class="w-full h-3 bg-white/30 rounded-full">
          <div class="h-full bg-white rounded-full" style="width:${porcentaje}%"></div>
        </div>
      `;
    }
  }
  customElements.define("barra-progreso", BarraProgreso);
  export default BarraProgreso;
  
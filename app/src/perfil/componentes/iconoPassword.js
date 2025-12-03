class IconoPassword extends HTMLElement {
    connectedCallback() {
      this.visible = false;
  
      this.innerHTML = `
        <div id="icono" class="cursor-pointer text-gray-600 hover:text-primary transition">
          ${this.iconoOculto()}
        </div>
      `;
  
      this.onclick = () => this.toggle();
    }
  
    iconoOculto() {
      return `
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#2A6BBF" 
             class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
          <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 ..."/>
          <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829...."/>
        </svg>
      `;
    }
  
    iconoVisible() {
      return `
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#2A6BBF"
             class="bi bi-eye-fill" viewBox="0 0 16 16">
          <path d="M16 8s-3-5.5-8-5.5S0 8 0..."/>
          <path d="M8 5a3 3 0 1 1 0 6..."/>
        </svg>
      `;
    }
  
    toggle() {
      this.visible = !this.visible;
      this.querySelector("#icono").innerHTML =
        this.visible ? this.iconoVisible() : this.iconoOculto();
  
      // lanza evento para modificar input de contraseña
      this.dispatchEvent(new CustomEvent("toggle-visibility", { bubbles: true, detail: this.visible }));
    }
  }
  
  customElements.define("icono-password", IconoPassword);
  export default IconoPassword;
  
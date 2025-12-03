class BienvenidaUsuario extends HTMLElement {
  connectedCallback() {
    const nombre = this.getAttribute('nombre') || 'Usuario';
    const iniciales = nombre.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

    this.innerHTML = `
      <div class="flex items-center gap-4 mb-8 mr-10 ">
        <div class="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-lg">
          ${iniciales}
        </div>
        <div class="text-primary-text sm:flex sm:gap-1 font-light text-md ">
          <p>Te damos la bienvenida,</p>
          <p>${nombre}</p>
        </div>
      </div>
    `;
  }
}

customElements.define('bienvenida-usuario', BienvenidaUsuario);
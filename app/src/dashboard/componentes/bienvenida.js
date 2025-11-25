class Bienvenida extends HTMLElement {
  connectedCallback() {
    const text = this.getAttribute("text") || "Título";
    const profile = this.getAttribute("profile")
      || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

    this.innerHTML = `
      <div class="flex items-center gap-4 p-4">
        <img 
          src="${profile}" 
          class="w-20 h-20 object-cover rounded-full border"
        />
        <p class="text-lg font-semibold">${text}</p>
      </div>
    `;
  }
}

customElements.define("bienvenida-usuario", Bienvenida);

class Bienvenida extends HTMLElement {
    connectedCallback() {
        const text = this.getAttribute("text") || "Titulo";
        const profile = this.getAttribute("profile") || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

        this.innerHTML = `
      <div>
        <p>${profile}</p>
        <img src="${text}" class="w-full h-40 object-cover rounded-lg" />
      </div>
    `;
    }
}

customElements.define("bienvenida", Bienvenida);

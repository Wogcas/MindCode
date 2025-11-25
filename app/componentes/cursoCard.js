class CursoCard extends HTMLElement {
    connectedCallback() {
        const title = this.getAttribute("title") || "Titulo";
        const image = this.getAttribute("image") || "https://via.placeholder.com/300";

        this.innerHTML = `
      <div class="bg-[#64A85F] shadow rounded-xl p-4 max-w-sm">
        <button>
            <img src="${image}" class="w-full h-40 object-cover rounded-lg" />
            <h3 class="text-lg mt-3 text-white">${title}</h3>
        </button>
      </div>
    `;
    }
}

customElements.define("curso-card", CursoCard);

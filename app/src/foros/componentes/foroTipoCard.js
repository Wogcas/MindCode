class ForoTipoCard extends HTMLElement {

    connectedCallback() {
      this.innerHTML = `
        <div class="cursor-pointer border rounded-xl p-4 shadow-sm hover:shadow-md
                    transition-all flex justify-between items-center">
  
          <div>
            <h2 class="text-lg font-medium">${this.getAttribute("title")}</h2>
            <p class="text-sm text-gray-500">${this.getAttribute("description")}</p>
          </div>
  
          <div class="w-8 h-8 rounded-full"
               style="background:${this.getAttribute("color")}"></div>
        </div>
      `;
    }
  }
  
  customElements.define("foro-tipo-card", ForoTipoCard);
  export default ForoTipoCard;
  
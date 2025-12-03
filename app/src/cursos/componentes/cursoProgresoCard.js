class CursoProgresoCard extends HTMLElement {

    connectedCallback() {
  
      const titulo = this.getAttribute("titulo");
      const progreso = this.getAttribute("progreso");
      const boton = this.getAttribute("boton");
  
      this.innerHTML = `
        <div class="bg-[#64A85F] rounded-2xl p-4 flex justify-between items-center text-white shadow-sm
                    hover:shadow transition">
  
          <div class="space-y-2">
            <p class="font-light text-sm">${titulo}</p>
  
            <div class="bg-white h-2 rounded-full w-52">
              <div class="bg-[#2A6BBF] h-full rounded-full transition-all"
                   style="width:${progreso}%"></div>
            </div>
          </div>
  
          <button class="px-6 py-2 bg-white text-[#2A6BBF] font-medium rounded-xl shadow-sm hover:shadow-md">
            ${boton}
          </button>
        </div>
      `;
    }
  }
  
  customElements.define("curso-progreso-card", CursoProgresoCard);
  export default CursoProgresoCard;
  
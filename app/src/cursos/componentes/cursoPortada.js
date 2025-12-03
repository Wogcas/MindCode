class CursoPortada extends HTMLElement {

    connectedCallback() {
  
      const imagen = this.getAttribute("img");
      const fecha = "Publicado el: 17/09/2025";
  
      this.innerHTML = `
        <div class="space-y-6">
  
          <img src="${imagen}"
               class="rounded-2xl shadow-lg border w-full max-w-md"/>
  
          <p class="text-xs text-gray-500">${fecha}</p>
  
          <p class="text-gray-700 text-sm leading-relaxed font-light">
            ¡Hola! Soy Luka, tu profesor y me emociona mucho que te unas a este curso.
            Vamos a trabajar juntos para aprender JavaScript con ejercicios reales y retos prácticos 👨‍💻✨
          </p>
  
          <button class="px-8 py-3 rounded-full text-white shadow-md font-medium hover:shadow-lg
                         transition active:scale-95"
                  style="background-color:#2A6BBF">
            Unirse
          </button>
  
        </div>
      `;
    }
  }
  
  customElements.define("curso-portada", CursoPortada);
  export default CursoPortada;
  
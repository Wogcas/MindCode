class MisForos extends HTMLElement {

    constructor() {
      super();
      this.foros = [
        {
          titulo: "Introducción a JavaScript",
          descripcion: "Comparte dudas y aprendizajes del lenguaje.",
          etiquetas: ["JS", "Frontend"],
        },
        {
          titulo: "Errores comunes de programación",
          descripcion: "Resolvemos bugs de principiantes juntos.",
          etiquetas: ["Debugging", "Ayuda"],
        },
        {
          titulo: "Recursos para aprender CSS",
          descripcion: "Links, tutoriales y guías.",
          etiquetas: ["CSS", "Front-End"],
        }
      ];
    }

    connectedCallback() {
      this.render();
      this.setupEvents();
    }
  
    render() {
      this.innerHTML = `
        <div class="min-h-screen px-6 sm:px-20 py-10 font-sans">

          <div class="flex justify-between items-center mb-10">
            <h1 class="text-4xl font-light text-gray-900 tracking-tight">
              Mis Foros
            </h1>

            <button id="btnCrear"
              class="px-6 py-2.5 rounded-full shadow-md font-medium text-white text-sm
                     transition-all duration-200 ease-out
                     hover:shadow-lg active:scale-95"
              style="background-color:#2A6BBF">
              + Crear Foro
            </button>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            ${this.foros.map(foro => this.cardHTML(foro)).join("")}
          </div>
        </div>
      `;
    }
  
    cardHTML(foro) {
      return `
        <div class="p-6 rounded-2xl shadow-sm border bg-white hover:shadow-md
                    transition cursor-pointer foro-card">

          <h3 class="text-lg font-semibold text-gray-900 mb-1">${foro.titulo}</h3>
          <p class="text-sm text-gray-600 mb-4">${foro.descripcion}</p>

          <div class="flex flex-wrap gap-2 mb-4">
            ${foro.etiquetas
              .map(tag => `<span class="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700">${tag}</span>`)
              .join("")}
          </div>

          <button class="text-sm font-medium underline btnAbrir"
                  style="color:#2A6BBF">
            Ver foro →
          </button>
        </div>
      `;
    }
  
    setupEvents() {
      this.querySelector("#btnCrear").addEventListener("click", () => {
        window.location.href = "index.html?vista=foros&accion=crear";
      });

      this.querySelectorAll(".btnAbrir").forEach(btn => {
        btn.addEventListener("click", () => {
          window.location.href = "index.html?vista=verForo";
        });
      });
    }
}

customElements.define("mis-foros", MisForos);
export default MisForos;

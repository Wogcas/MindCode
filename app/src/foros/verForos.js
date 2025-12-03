class VerForo extends HTMLElement {

  connectedCallback() {

    // Foro hardcodeado por ahora
    this.foro = {
      titulo: "Introducción a JavaScript",
      descripcion: "Comparte dudas y aprendizajes del lenguaje.",
      etiquetas: ["JavaScript", "Frontend"],
      comentarios: [
        "¿Cuál es la diferencia entre let y var?",
        "Recuerden usar === en lugar de == siempre."
      ]
    };

    this.render();
    this.init();
  }

  render() {
    const { titulo, descripcion, etiquetas, comentarios } = this.foro;

    this.innerHTML = `
      <div class="min-h-screen px-6 py-10 sm:px-20 font-sans bg-white">

        <!-- Título -->
        <h1 class="text-4xl font-light text-black mb-2">
          ${titulo}
        </h1>

        <p class="text-gray-600 mb-8 text-lg">
          ${descripcion}
        </p>

        <!-- Etiquetas -->
        <div class="flex gap-2 flex-wrap mb-10">
          ${etiquetas.map(e =>
            `<span class="px-4 py-1.5 text-xs rounded-full bg-[#E8EEF6] text-[#2A6BBF] font-medium">
                ${e}
            </span>`
          ).join("")}
        </div>

        <!-- Comentarios -->
        <h2 class="text-xl font-medium text-gray-800 mb-4">Comentarios</h2>

        <div id="listaComentarios" class="space-y-3 mb-8">
          ${comentarios.map(c =>
            `
              <div class="px-4 py-3 bg-[#F5F7FA] rounded-lg border border-gray-200 text-gray-800 text-sm">
                ${c}
              </div>
            `
          ).join("")}
        </div>

        <!-- Caja para nuevo comentario -->
        <textarea
          id="inputComentario"
          placeholder="Escribe tu comentario..."
          class="w-full h-28 px-4 py-3 bg-[#F5F7FA] rounded-lg outline-none border border-gray-200
                 focus:border-[#2A6BBF] resize-none mb-6 text-sm"
        ></textarea>

        <div class="flex gap-4">
          <button id="btnComentar"
            class="px-8 py-3 rounded-full text-white font-medium shadow-md hover:shadow-lg
                   transition"
            style="background-color:#2A6BBF">
            Publicar comentario
          </button>

          <button onclick="history.back()"
            class="px-8 py-3 rounded-full bg-gray-200 text-gray-700 font-medium hover:bg-gray-300
                   transition">
            Regresar
          </button>
        </div>

      </div>
    `;
  }

  init() {
    const btnComentar = this.querySelector("#btnComentar");
    const input = this.querySelector("#inputComentario");
    const lista = this.querySelector("#listaComentarios");

    btnComentar.addEventListener("click", () => {
      const texto = input.value.trim();
      if (!texto) return;

      // crear comentario visual
      const comentario = document.createElement("div");
      comentario.className =
        "px-4 py-3 bg-[#F5F7FA] rounded-lg border border-gray-200 text-gray-800 text-sm";
      comentario.textContent = texto;

      lista.appendChild(comentario);
      input.value = "";
    });
  }
}

customElements.define("ver-foro", VerForo);
export default VerForo;

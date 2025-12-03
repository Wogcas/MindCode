class ForoMenu extends HTMLElement {

  connectedCallback() {
    this.foros = JSON.parse(localStorage.getItem("foros")) || [];
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="min-h-screen bg-white px-6 py-8 sm:px-20 font-sans">

        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-light">Mis Foros</h1>

          <button
            class="px-6 py-3 rounded-full text-white font-medium shadow-md"
            style="background-color:#2A6BBF"
            onclick="location.href='index.html?vista=foros&accion=crear'">
            + Crear Foro
          </button>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          ${this.foros.length === 0
            ? `<p class="text-gray-500">Aún no has creado foros.</p>`
            : this.foros.map(f => this.cardHTML(f)).join("")
          }
        </div>
      </div>
    `;
  }

  cardHTML(f) {
    return `
      <div class="p-6 rounded-xl shadow-sm border hover:shadow-md transition">

        <h2 class="font-medium text-lg">${f.titulo}</h2>
        <p class="text-gray-500 text-sm mb-4">${f.descripcion}</p>

        <div class="flex flex-wrap gap-2 mb-4">
          ${f.etiquetas
              .map(e => `<span class='px-3 py-1 text-xs bg-gray-200 rounded-full'>${e}</span>`)
              .join("")
          }
        </div>

        <button
          class="text-primary-600 font-medium text-sm hover:underline"
          onclick="location.href='index.html?vista=verForo&id=${f.id}'"
        >
          Ver foro →
        </button>
      </div>
    `;
  }
}

customElements.define("foro-menu", ForoMenu);
export default ForoMenu;

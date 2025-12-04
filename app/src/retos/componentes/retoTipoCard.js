/**
 * Tarjeta reutilizable del menú de tipos de reto
 */

class RetoTipoCard extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute("title") || "Tipo";
    const desc = this.getAttribute("description") || "";
    const color = this.getAttribute("color") || "#64A85F";

    this.innerHTML = `
      <button class="w-full flex items-center gap-4 p-4 rounded-xl bg-white 
                     hover:bg-blue-50 shadow-sm hover:shadow-md border border-gray-100 
                     transition text-left">

        <div class="w-12 h-12 rounded-lg" style="background:${color}"></div>

        <div class="flex-1">
          <h3 class="text-sm font-semibold text-gray-800 mb-1">${title}</h3>
          <p class="text-xs text-gray-500 leading-snug">${desc}</p>
        </div>
      </button>
    `;
  }
}

customElements.define("reto-tipo-card", RetoTipoCard);
export default RetoTipoCard;

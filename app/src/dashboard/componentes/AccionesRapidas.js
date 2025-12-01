class AccionesRapidas extends HTMLElement {
    connectedCallback() {
        // Definimos los datos de los botones para generar el HTML dinámicamente
        // y mantener el código limpio.
        const botones = [
            { texto: "Crear Curso" },
            { texto: "Crear Lección" },
            { texto: "Crear Reto" },
            { texto: "Resumen" }
        ];

        const iconPlus = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-5 mr-2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        `;

        const botonesHtml = botones.map(btn => `
            <button class="group flex h-15 items-center justify-center w-full bg-white text-green-700 hover:text-green-800 hover:bg-green-50 hover:shadow-md transition-all duration-200 py-4 px-4 shadow-sm rounded-sm font-medium text-lg cursor-pointer border border-transparent">
                ${iconPlus}
                <span>${btn.texto}</span>
            </button>
        `).join('');

        this.innerHTML = `
            <div class="w-full  bg-blue-50/80 p-6 rounded-xl border border-blue-100 mb-6">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    ${botonesHtml}
                </div>
            </div>
        `;
    }
}

customElements.define('acciones-rapidas', AccionesRapidas);
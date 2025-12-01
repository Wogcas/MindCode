import './DatosCurso.js';

class CursoCardDatos extends HTMLElement {
    connectedCallback() {
        const titulo = this.getAttribute('titulo') || "Titulo";
        const imagen = this.getAttribute('imagen') || "";
        const participantes = this.getAttribute('participantes') || '0';
        const estado = this.getAttribute('estado') || 'Privado';
        const fechaPublicacion = this.getAttribute('fechaPublicacion') || '0';

        this.innerHTML = `
        <button class="group flex flex-col h-full w-full max-w-[320px] bg-blue-100/60 p-3 rounded-[2rem] hover:bg-blue-200/60 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer text-left border border-transparent hover:border-blue-200">
            
            <div class="w-full h-40 rounded-2xl overflow-hidden mb-4 relative shadow-sm">
                <img 
                    src="${imagen}" 
                    alt="${titulo}" 
                    class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                >
            </div>

            <div class="px-1 pb-2">
                <h3 class="font-sans text-lg font-medium text-gray-900 leading-snug">
                    ${titulo}
                </h3>
            </div>

            <datos-curso
                participantes=${participantes}
                estado=${estado}
                fechaPublicacion=${fechaPublicacion}
            ></datos-curso>
        </button>
        `;
    }
}

customElements.define('curso-card-datos', CursoCardDatos);
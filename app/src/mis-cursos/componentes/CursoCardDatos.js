import './DatosCurso.js';

class CursoCardDatos extends HTMLElement {
    connectedCallback() {
        const titulo = this.getAttribute('titulo') || "Titulo";
        const imagenRaw = this.getAttribute('imagen');
        
        // LOG 5: Ver qué llega al componente individual
        console.log(`🖼️ [Card] ${titulo} - Imagen recibida:`, 
            imagenRaw ? (imagenRaw.substring(0, 50) + '...') : 'NULL/UNDEFINED');

        // Lógica de validación mejorada
        let imagenValida = 'https://placehold.co/600x400/e2e8f0/475569?text=Sin+Imagen';
        
        if (imagenRaw && imagenRaw !== "undefined" && imagenRaw !== "null" && imagenRaw.trim() !== "") {
            imagenValida = imagenRaw;
        }

        this.innerHTML = `
        <button class="group flex flex-col h-full w-full max-w-[320px] bg-blue-100/60 p-3 rounded-[2rem] hover:bg-blue-200/60 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer text-left border border-transparent hover:border-blue-200">
            
            <div class="w-full h-40 rounded-2xl overflow-hidden mb-4 relative shadow-sm bg-gray-200">
                <img 
                    src="${imagenValida}" 
                    alt="${titulo}" 
                    class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    onerror="console.error('Error cargando img para ${titulo}'); this.onerror=null; this.src='https://placehold.co/600x400/ff0000/ffffff?text=Error+Carga';"
                >
            </div>

            <div class="px-1 pb-2">
                <h3 class="font-sans text-lg font-medium text-gray-900 leading-snug line-clamp-2 mb-2 group-hover:text-blue-800 transition-colors">
                    ${titulo}
                </h3>
                <datos-curso 
                    participantes="${this.getAttribute('participantes')}" 
                    estado="${this.getAttribute('estado')}" 
                    fechaPublicacion="${this.getAttribute('fechaPublicacion')}">
                </datos-curso>
            </div>
        </button>
        `;
    }
}

customElements.define('curso-card-datos', CursoCardDatos);
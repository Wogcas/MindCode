class DatosCurso extends HTMLElement {
    connectedCallback() {
        const participantes = this.getAttribute('participantes') || '0';
        const estado = this.getAttribute('estado') || 'Privado';
        const fechaPublicacion = this.getAttribute('fechaPublicacion') || '0';


        this.innerHTML = `
             <div class="bg-white mt-1 p-3 rounded-xl shadow-sm font-sans flex justify-between items-center border border-gray-100 mt-auto w-full">
                
                <!-- Participantes -->
                <div class="flex flex-col items-center text-center w-1/3 mr-2">
                    <span class="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">Participantes</span>
                    <span class="text-gray-800 text-sm font-bold">${participantes}</span>
                </div>

                <!-- Separador -->
                <div class="w-px h-8 bg-gray-200"></div>

                <!-- Estado -->
                <div class="flex flex-col items-center text-center w-1/3">
                    <span class="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">Estado</span>
                    <span class="text-gray-800 text-sm font-bold">${estado}</span>
                </div>

                <!-- Separador -->
                <div class="w-px h-8 bg-gray-200"></div>

                <!-- Fecha -->
                <div class="flex flex-col items-center text-center w-1/3">
                    <span class="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">Fecha</span>
                    <span class="text-gray-800 text-sm font-bold">${fechaPublicacion}</span>
                </div>

            </div>
        `;
    }
}

customElements.define('datos-curso', DatosCurso);
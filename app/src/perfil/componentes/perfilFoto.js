class PerfilFoto extends HTMLElement {
    connectedCallback() {
        // Obtenemos el tipo (alumno o maestro)
        const tipo = this.getAttribute("tipo") || "alumno";
        
        // Ajusta estos nombres a las imágenes que REALMENTE tengas en app/assets/images/
        // Si no estás seguro, usa un placeholder temporal
        let avatarUrl = "../../assets/images/fotoEstudiante.png"; 
        
        if (tipo === 'Maestro' || tipo === 'maestro') {
             avatarUrl = "../../assets/images/fotoMaestro.png"; 
        }

        this.innerHTML = `
            <div class="flex items-center gap-6 mb-6">
                <div class="relative w-28 h-28">
                    <img src="${avatarUrl}" 
                         alt="Foto de perfil"
                         class="w-full h-full object-cover rounded-full shadow-lg border-4 border-white"
                         onerror="this.src='https://ui-avatars.com/api/?name=User&background=random'"/> 
                         </div>
                <button class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                    Cambiar foto
                </button>
            </div>
        `;
    }
}
customElements.define("perfil-foto", PerfilFoto);
export default PerfilFoto;
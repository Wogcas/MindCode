class SugerenciasCard extends HTMLElement {
  connectedCallback() {
    // Leer atributos pasados desde el Dashboard
    const id = this.getAttribute('id') || '';
    const title = this.getAttribute('title') || 'Sugerencia';
    const image = this.getAttribute('image') || 'https://via.placeholder.com/400x200';
    const description = this.getAttribute('description') || 'Sin descripción disponible.';

    this.innerHTML = `
      <div class="mt-4 mb-10 w-full">
        <div class="bg-gradient-to-br from-primary to-primary-600 rounded-3xl overflow-hidden shadow-lg p-8 min-h-20 sm:flex sm:gap-8 items-center">
          
          <div class="sm:w-1/3">
             <h3 class="flex justify-center sm:justify-start text-white text-xl font-light mb-6 sm:text-2xl sm:font-medium sm:hidden">
                ${title}
             </h3>
             <img
                src="${image}"
                class="rounded-2xl mb-6 sm:mb-0 w-full h-48 sm:h-60 object-cover shadow-md"
                alt="${title}"
              />
          </div>
           
          <div class="flex flex-col justify-center sm:w-2/3">
             <h3 class="hidden sm:block text-white text-2xl font-medium mb-4">${title}</h3>
             
             <p class="text-white font-light text-sm sm:text-base leading-relaxed mb-8 opacity-90 line-clamp-3">
                ${description}
             </p>
             
             <div class="w-full flex sm:justify-start justify-center">
               <button 
                  onclick="window.location.href='?vista=unirseACurso&id=${id}'"
                  class="bg-white text-primary-text font-bold px-8 py-3 rounded-full hover:bg-gray-50 hover:scale-105 transition-all shadow-md cursor-pointer sm:w-auto w-full"
               >                
                 Ver Curso
               </button>
             </div>
          </div>

        </div>
      </div>
    `;
  }
}

customElements.define('sugerencias-card', SugerenciasCard);
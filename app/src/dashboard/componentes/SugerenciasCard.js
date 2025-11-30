class SugerenciasCard extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute('title') || 'Sugerencia';
    const image = this.getAttribute('image') || '';
    const description = this.getAttribute('description') || ' ';


    this.innerHTML = `
      <div class="mt-4 mb-10">
        <div class="bg-gradient-to-br from-primary to-primary-600 rounded-3xl overflow-hidden shadow-lg p-8 min-h-20 sm:h-100 sm:flex sm:h-30">
          <div>
            <h3 class="flex justify-center align-item text-white text-xl font-light mb-6 sm:text-2xl sm:font-medium">${title}</h3>
              <img
                src="${image}"
                class="rounded-3xl mb-6 w-full object-cover sm:h-60"
              />
          </div>
           
         <div class="flex sm:flex-col sm:ml-20 justify-center sm:gap-10">
          <p class="hidden sm:flex text-white font-light">${description}</p>
          <div class="w-full flex justify-center">
            <button class="bg-white text-primary-text font-semibold px-8 py-3 rounded-full hover:bg-gray-50 transition-colors shadow-md cursor-pointer sm:w-3/4">                
              Ir Al Curso
            </button>
          </div>

          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('sugerencias-card', SugerenciasCard);

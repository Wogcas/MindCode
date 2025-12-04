class CursoImagen extends HTMLElement {
    connectedCallback() {
      const src = this.getAttribute('src') || '../../assets/images/js-course.jpg';
      const alt = this.getAttribute('alt') || 'Curso';
  
      this.innerHTML = `
        <div class="aspect-video bg-gray-900 relative overflow-hidden rounded-t-xl">
          <img src="${src}" 
               alt="${alt}" 
               class="w-full h-full object-cover">
        </div>
      `;
    }
  }
  
  customElements.define("curso-imagen", CursoImagen);
  export default CursoImagen;
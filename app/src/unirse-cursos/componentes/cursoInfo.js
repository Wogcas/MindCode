class CursoInfo extends HTMLElement {
    connectedCallback() {
      this.render();
    }
  
    render() {
      this.innerHTML = `
        <div class="p-6 sm:p-8">
          
          <!-- Título -->
          <h2 id="cursoTitulo" class="text-2xl font-semibold text-gray-900 mb-4">
            Cargando...
          </h2>
  
          <!-- Fecha -->
          <p id="cursoFecha" class="text-sm text-gray-500 mb-4">
            Publicado el: --
          </p>
  
          <!-- Descripción -->
          <div class="mb-6">
            <p id="cursoDescripcion" class="text-gray-700 leading-relaxed">
              Cargando información del curso...
            </p>
          </div>
        </div>
      `;
    }
  
    setData(curso) {
      this.querySelector('#cursoTitulo').textContent = curso.titulo;
      this.querySelector('#cursoFecha').textContent = 
        `Publicado el: ${new Date(curso.fecha_creacion).toLocaleDateString('es-MX')}`;
      this.querySelector('#cursoDescripcion').textContent = curso.descripcion;
    }
  }
  
  customElements.define("curso-info", CursoInfo);
  export default CursoInfo;
// Componente 404 - Página no encontrada

class Pagina404 extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div class="text-center">
          <h1 class="text-9xl font-bold text-primary">404</h1>
          <h2 class="text-3xl font-semibold text-gray-800 mb-4">Página no encontrada</h2>
          <p class="text-gray-600 mb-8">La página que buscas no existe o ha sido movida.</p>
          <a href="#/" 
             class="inline-block bg-primary text-white px-8 py-3 rounded-full 
                    font-semibold hover:bg-primary-600 transition-colors">
            Volver al Inicio
          </a>
        </div>
      </div>
    `;
  }
}

customElements.define('pagina-404', Pagina404);

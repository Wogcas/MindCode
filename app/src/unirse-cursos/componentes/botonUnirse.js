class BotonUnirse extends HTMLElement {
    connectedCallback() {
      this.render();
    }
  
    render() {
      this.innerHTML = `
        <div class="flex justify-center pb-6 px-6">
          <button id="btnUnirse"
            class="bg-blue-600 hover:bg-blue-700 text-white font-semibold 
                   px-8 py-3 rounded-full shadow-md transition-all 
                   hover:shadow-lg transform hover:-translate-y-0.5
                   disabled:opacity-50 disabled:cursor-not-allowed">
            Unirse
          </button>
        </div>
      `;
    }
  
    setLoading(loading) {
      const btn = this.querySelector('#btnUnirse');
      btn.disabled = loading;
      btn.textContent = loading ? 'Uniéndose...' : 'Unirse';
    }
  }
  
  customElements.define("boton-unirse", BotonUnirse);
  export default BotonUnirse;
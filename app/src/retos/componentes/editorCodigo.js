/**
 * Simulador simple de editor de código
 */

class EditorCodigo extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <div>
          <h2 class="font-medium text-gray-800 text-lg mb-2">
            Configuración del editor de código
          </h2>
  
          <div class="bg-gray-900 text-gray-200 rounded-lg p-4 shadow-inner min-h-[180px] font-mono">
            <p class="text-xs opacity-70">/* Simulador de editor */</p>
            <p class="mt-2 text-sm text-green-400">console.log("Hola Mundo");</p>
          </div>
        </div>
      `;
    }
  }
  
  customElements.define("editor-codigo", EditorCodigo);
  export default EditorCodigo;
  
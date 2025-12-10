/**
 * Editor simple de código
 */

class EditorCodigo extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div>
        <h2 class="font-medium text-gray-800 text-lg mb-2">
          Código inicial (opcional)
        </h2>

        <textarea id="editorTextarea"
          class="w-full bg-gray-900 text-gray-200 rounded-lg p-4 shadow-inner 
                 min-h-[180px] font-mono text-sm outline-none resize-none
                 focus:ring-2 focus:ring-primary-500"
          placeholder="// Escribe el código inicial aquí..."></textarea>
      </div>
    `;
  }

  // Método para obtener el código
  getCode() {
    return this.querySelector('#editorTextarea')?.value || '';
  }

  // Método para establecer el código
  setCode(code) {
    const textarea = this.querySelector('#editorTextarea');
    if (textarea) textarea.value = code;
  }
}

customElements.define("editor-codigo", EditorCodigo);
export default EditorCodigo;
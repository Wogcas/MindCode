import RetoAPI from "../api/RetoAPI.js";

class RetoMultiple extends HTMLElement {
  connectedCallback() {
    this.cursoId = this.getAttribute('cursoId');
    this.leccionId = this.getAttribute('leccionId');
    this.opciones = [];
    this.render();
    this.init();
  }

  render() {
    this.innerHTML = `
      <div class="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
        <div class="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            
            <div class="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 class="text-xl font-bold text-gray-800">Nuevo Reto: Opción Múltiple</h2>
                <button id="btn-cerrar" class="text-gray-400 hover:text-red-500">✕</button>
            </div>

            <div class="p-6 space-y-5">
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-1">Título</label>
                    <input id="inputTitulo" type="text" class="w-full p-2 border border-gray-300 rounded focus:border-primary-500 outline-none" placeholder="Ej: Quiz Rápido">
                </div>
                
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-1">Pregunta</label>
                    <textarea id="inputDesc" class="w-full p-2 border border-gray-300 rounded focus:border-primary-500 outline-none" rows="2" placeholder="Escribe la pregunta..."></textarea>
                </div>

                <div class="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <label class="block text-sm font-bold text-blue-800 mb-2">Respuestas (Marca la correcta)</label>
                    
                    <div class="flex gap-2 mb-3">
                        <input id="inputOpcion" type="text" class="flex-1 p-2 border border-blue-200 rounded" placeholder="Nueva opción...">
                        <button id="btnAgregarOp" class="bg-blue-600 text-white px-4 rounded hover:bg-blue-700 font-bold">+</button>
                    </div>

                    <div id="listaOpciones" class="space-y-2">
                        <p id="msgVacio" class="text-xs text-blue-400 italic">Sin opciones aún</p>
                    </div>
                </div>
            </div>

            <div class="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                <button id="btn-cancelar" class="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded">Cancelar</button>
                <button id="btn-guardar" class="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 shadow-md font-medium">Guardar Reto</button>
            </div>
        </div>
      </div>
    `;
  }

  init() {
    this.opcionesList = this.querySelector('#listaOpciones');

    const cerrar = () => this.remove();
    this.querySelector('#btn-cerrar').addEventListener('click', cerrar);
    this.querySelector('#btn-cancelar').addEventListener('click', cerrar);

    this.querySelector('#btnAgregarOp').addEventListener('click', () => {
      const input = this.querySelector('#inputOpcion');
      const txt = input.value.trim();
      if (!txt) return;

      // Guardamos texto y estado de correcta
      this.opciones.push({ texto: txt, es_correcta: false });
      input.value = '';
      this.renderOpciones();
    });

    this.querySelector('#btn-guardar').addEventListener('click', () => this.guardar());
  }

  renderOpciones() {
    const container = this.querySelector('#listaOpciones');
    const msg = this.querySelector('#msgVacio');

    if (this.opciones.length > 0) msg.style.display = 'none';
    else msg.style.display = 'block';

    container.innerHTML = '';

    this.opciones.forEach((op, idx) => {
      const div = document.createElement('div');
      div.className = "flex items-center gap-2 bg-white p-2 rounded border border-blue-100";
      div.innerHTML = `
            <input type="radio" name="correcta" class="h-4 w-4 text-primary-600 cursor-pointer" ${op.es_correcta ? 'checked' : ''}>
            <span class="flex-1 text-sm text-gray-700">${op.texto}</span>
            <button class="text-red-400 hover:text-red-600 font-bold px-2">×</button>
        `;

      // Seleccionar correcta
      div.querySelector('input').addEventListener('change', () => {
        this.opciones.forEach(o => o.es_correcta = false);
        this.opciones[idx].es_correcta = true;
      });

      // Borrar opción
      div.querySelector('button').addEventListener('click', () => {
        this.opciones.splice(idx, 1);
        this.renderOpciones();
      });

      container.appendChild(div);
    });
  }

  async guardar() {
    const titulo = this.querySelector('#inputTitulo').value;
    const desc = this.querySelector('#inputDesc').value;

    if (!titulo || !desc || this.opciones.length < 2) return alert("Faltan datos o opciones");
    if (!this.opciones.some(o => o.es_correcta)) return alert("Marca una respuesta correcta");

    const btn = this.querySelector('#btn-guardar');
    btn.disabled = true;
    btn.innerHTML = "Guardando...";

    
    const retoData = {
      titulo: nombre,
      descripcion: descripcion,
      preguntas: [
        {
          contenido: descripcion,
          tipo: "opcion_multiple",
          respuestas: opciones
        }
      ],
      lecciones: [
        this.leccionId
      ]
    };

    try {
      await RetoAPI.crearReto(retoData);
      alert("Reto creado");

      this.dispatchEvent(new CustomEvent('reto-guardado', { bubbles: true }));
      this.remove();

    } catch (e) {
      console.error(e);
      alert("Error al guardar: " + e.message);
      btn.disabled = false;
      btn.innerText = "Guardar Reto";
    }
  }
}

customElements.define("reto-multiple", RetoMultiple);
export default RetoMultiple;
import RetoAPI from "../api/RetoAPI.js";

class RetoAbierto extends HTMLElement {
  connectedCallback() {
    this.cursoId = this.getAttribute('cursoId');
    this.leccionId = this.getAttribute('leccionId');
    this.preguntas = []; // Array para almacenar las preguntas
    this.render();
    this.init();
  }

  render() {
    this.innerHTML = `
      <div class="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
        
        <div class="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform scale-100 transition-all">
            
            <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-xl">
                <div>
                    <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <span class="text-2xl">📝</span> Pregunta Abierta
                    </h2>
                    <p class="text-xs text-gray-500">Respuestas de texto libre para el alumno</p>
                </div>
                <button id="btn-cerrar" class="text-gray-400 hover:text-red-500 transition bg-white p-1 rounded-full shadow-sm hover:shadow">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
            </div>

            <div class="p-6 space-y-6">
                
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-1">Título del Reto</label>
                    <input id="inputTitulo" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all" placeholder="Ej: Ensayo sobre la Revolución">
                </div>
                
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-1">Instrucciones Generales</label>
                    <textarea id="inputDesc" class="w-full p-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all" rows="2" placeholder="Describe qué esperas que responda el alumno..."></textarea>
                </div>

                <div class="bg-gray-50 p-5 rounded-xl border border-gray-200">
                    <label class="block text-sm font-bold text-gray-800 mb-3">Cuestionario</label>
                    
                    <div class="flex gap-2 mb-4">
                        <input id="inputPregunta" type="text" class="flex-1 p-3 border border-gray-300 rounded-lg outline-none focus:border-green-500" placeholder="Escribe una pregunta para el alumno...">
                        <button id="btnAgregarP" class="bg-green-600 text-white px-5 rounded-lg hover:bg-green-700 font-bold shadow-sm transition-transform active:scale-95">+</button>
                    </div>

                    <div id="listaPreguntas" class="space-y-2">
                        <p id="msgVacio" class="text-center text-gray-400 text-sm italic py-2">No has agregado preguntas aún.</p>
                    </div>
                </div>
            </div>

            <div class="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-xl">
                <button id="btn-cancelar" class="px-5 py-2.5 text-gray-600 hover:bg-white border border-transparent hover:border-gray-200 rounded-lg transition font-medium">Cancelar</button>
                <button id="btn-guardar" class="px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-black shadow-lg hover:shadow-xl font-bold transition flex items-center gap-2">
                    <span>Guardar Reto</span>
                </button>
            </div>
        </div>
      </div>
    `;
  }

  init() {
    this.container = this.querySelector('#listaPreguntas');
    this.msgVacio = this.querySelector('#msgVacio');
    
    // Cerrar modal
    const cerrar = () => this.remove();
    this.querySelector('#btn-cerrar').addEventListener('click', cerrar);
    this.querySelector('#btn-cancelar').addEventListener('click', cerrar);

    // Agregar Pregunta a la lista local
    this.querySelector('#btnAgregarP').addEventListener('click', () => {
        const input = this.querySelector('#inputPregunta');
        const txt = input.value.trim();
        
        if(txt) {
            this.preguntas.push(txt);
            input.value = '';
            this.renderList();
            input.focus(); // Mantener foco para agregar rápido
        }
    });

    // Guardar en Backend
    this.querySelector('#btn-guardar').addEventListener('click', () => this.guardar());
  }

  renderList() {
      // Mostrar/Ocultar mensaje vacío
      if(this.preguntas.length > 0) this.msgVacio.classList.add('hidden');
      else this.msgVacio.classList.remove('hidden');

      this.container.innerHTML = '';
      
      // Renderizar cada pregunta
      this.preguntas.forEach((p, i) => {
          const div = document.createElement('div');
          div.className = "bg-white p-3 border border-gray-200 rounded-lg flex justify-between items-center shadow-sm animate-fade-in";
          div.innerHTML = `
            <div class="flex items-start gap-3">
                <span class="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded h-fit">#${i+1}</span>
                <span class="text-sm text-gray-700 font-medium">${p}</span>
            </div>
            <button class="text-red-400 hover:text-red-600 p-1 hover:bg-red-50 rounded transition" title="Eliminar pregunta">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          `;
          
          // Lógica de borrado
          div.querySelector('button').addEventListener('click', () => {
              this.preguntas.splice(i, 1);
              this.renderList();
          });

          this.container.appendChild(div);
      });
      
      // Re-agregar el mensaje vacío (oculto o no)
      this.container.appendChild(this.msgVacio);
  }

  async guardar() {
    const titulo = this.querySelector('#inputTitulo').value.trim();
    const desc = this.querySelector('#inputDesc').value.trim();

    if(!titulo || !desc) return alert("Por favor completa el título e instrucciones.");
    if(this.preguntas.length === 0) return alert("Agrega al menos una pregunta al cuestionario.");

    const btn = this.querySelector('#btn-guardar');
    btn.disabled = true;
    btn.innerHTML = `<svg class="animate-spin h-5 w-5 text-white mr-2" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg> Guardando...`;

    // --- CORRECCIÓN CLAVE PARA EL BACKEND ---
    const data = {
        titulo: titulo,
        descripcion: desc,
        preguntas: this.preguntas.map(p => ({ 
            contenido: p,   
            tipo: 'abierta', 
            respuestas: []  
        })),
      lecciones: [
        this.leccionId
      ]
    };

    try {
        console.log("Enviando Reto Abierto:", data);
        await RetoAPI.crearReto(data);
        
        // Notificar éxito
        // alert("Reto guardado correctamente");
        
        // Avisar al padre (VistaLeccion) para que se actualice
        this.dispatchEvent(new CustomEvent('reto-guardado', { bubbles: true }));
        this.remove(); // Cerrar modal

    } catch (e) {
        console.error(e);
        alert("Error al guardar: " + e.message);
        btn.disabled = false;
        btn.innerHTML = "Guardar Reto";
    }
  }
}

customElements.define("reto-abierto", RetoAbierto);
export default RetoAbierto;
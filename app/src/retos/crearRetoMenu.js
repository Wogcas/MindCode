import './retoMultiple.js';
import './retoAbierto.js';

class CrearRetoMenu extends HTMLElement {
  connectedCallback() {
    console.log("[CrearRetoMenu] connectedCallback ejecutado");
    this.cursoId = this.getAttribute('cursoId');
    this.leccionId = this.getAttribute('leccionId');
    console.log("[CrearRetoMenu] IDs:", this.cursoId, this.leccionId);
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.innerHTML = `
      <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
        
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform scale-100 transition-all">
            
            <header class="flex justify-between items-center p-6 border-b border-gray-100">
                <div>
                    <h2 class="text-2xl font-light text-gray-800">Centro de retos</h2>
                    <p class="text-sm text-gray-500">Selecciona el tipo de evaluación</p>
                </div>
                <button id="btn-cerrar" class="text-gray-400 hover:text-red-500 transition p-2 rounded-full hover:bg-red-50">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
            </header>

            <section class="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="reto-card cursor-pointer group bg-gray-50 hover:bg-white border border-gray-200 hover:border-primary-500 p-6 rounded-xl transition-all shadow-sm hover:shadow-lg" data-tipo="multiple">
                    <div class="h-12 w-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>
                    </div>
                    <h3 class="text-lg font-bold text-gray-800 mb-1">Opción Múltiple</h3>
                    <p class="text-sm text-gray-500">Autocalificable. El alumno elige una respuesta correcta entre varias.</p>
                </div>

                <div class="reto-card cursor-pointer group bg-gray-50 hover:bg-white border border-gray-200 hover:border-primary-500 p-6 rounded-xl transition-all shadow-sm hover:shadow-lg" data-tipo="abierto">
                    <div class="h-12 w-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                    </div>
                    <h3 class="text-lg font-bold text-gray-800 mb-1">Pregunta Abierta</h3>
                    <p class="text-sm text-gray-500">Texto libre. Requiere revisión manual por parte del maestro.</p>
                </div>
            </section>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    console.log("[CrearRetoMenu] setupEventListeners ejecutado");
    // Cerrar modal
    this.querySelector('#btn-cerrar').addEventListener('click', () => {
        console.log("[CrearRetoMenu] Cerrando modal");
        this.remove();
    });
    
    // Cerrar al dar click fuera
    this.querySelector('.fixed').addEventListener('click', (e) => {
        if(e.target === e.currentTarget) {
            console.log("[CrearRetoMenu] Click fuera del modal, cerrando");
            this.remove();
        }
    });

    // Abrir siguiente modal según selección
    this.querySelectorAll('.reto-card').forEach(card => {
      card.addEventListener('click', () => {
        const tipo = card.dataset.tipo;
        console.log("[CrearRetoMenu] Tipo de reto seleccionado:", tipo);
        this.abrirModalEspecifico(tipo);
      });
    });
  }

  abrirModalEspecifico(tipo) {
      console.log("[CrearRetoMenu] abrirModalEspecifico llamado con tipo:", tipo);
      // 1. Cerramos este menú
      this.remove();

      // 2. Creamos el siguiente modal
      let nuevoModal = null;
      if (tipo === 'multiple') {
          console.log("[CrearRetoMenu] Creando reto-multiple");
          nuevoModal = document.createElement('reto-multiple');
      }
      if (tipo === 'abierto') {
          console.log("[CrearRetoMenu] Creando reto-abierto");
          nuevoModal = document.createElement('reto-abierto');
      }

      if (nuevoModal) {
          nuevoModal.setAttribute('cursoId', this.cursoId);
          nuevoModal.setAttribute('leccionId', this.leccionId);
          
          // PROPAGAR EVENTO: Si el modal hijo guarda algo, avisamos al padre (VistaLeccion)
          nuevoModal.addEventListener('reto-guardado', () => {
              console.log("[CrearRetoMenu] Evento 'reto-guardado' recibido desde hijo, propagando...");
              this.dispatchEvent(new CustomEvent('reto-guardado', { bubbles: true }));
          });

          document.body.appendChild(nuevoModal);
          console.log("[CrearRetoMenu] Modal específico agregado al DOM:", tipo);
      } else {
          console.error("[CrearRetoMenu] No se pudo crear el modal para tipo:", tipo);
      }
  }
}

customElements.define("crear-reto-menu", CrearRetoMenu);
export default CrearRetoMenu;
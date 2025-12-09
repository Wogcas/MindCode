// Vista de Reto/Quiz con validación de respuestas
import { retos, cursosDetalles } from '../data/mockData.js';
//import { navigateTo } from '../utils/router-estudiante.js';
import '../componentes/ui/QuizOption.js';

class VistaReto extends HTMLElement {
  constructor() {
    super();
    this.opcionSeleccionada = null;
    this.respondido = false;
  }

  connectedCallback() {
    this.retoId = this.getAttribute('retoId');
    this.retoDatos = retos[this.retoId];

    if (!this.retoDatos) {
      console.error(`Reto ${this.retoId} no encontrado`);
      navigateTo('/404');
      return;
    }

    this.render();
    this.setupEventListeners();
  }

  render() {
    this.innerHTML = `
      <div class="vista-reto min-h-screen bg-white p-4 sm:p-8">
        <div class="max-w-4xl mx-auto">
          
          <div class="mb-8">
            <button class="btn-volver text-primary-600 font-medium flex items-center gap-2 
                           hover:text-primary-700 transition-colors mb-6">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
              Volver al curso
            </button>
            
            <h1 class="text-3xl sm:text-4xl font-normal text-gray-900 mb-3">
              ${this.retoDatos.titulo}
            </h1>
            <p class="text-gray-600 text-lg">${this.retoDatos.leccion}</p>
          </div>
          
          <div class="bg-white rounded-2xl mb-8">
            <p class="text-gray-700 text-lg leading-relaxed">
              ${this.retoDatos.descripcion}
            </p>
          </div>
          
          <div class="bg-white rounded-2xl mb-8">
            <h2 class="font-semibold text-xl sm:text-2xl text-gray-900 mb-8">
              ${this.retoDatos.pregunta}
            </h2>
            
            <div id="opciones-container" class="space-y-4">
              ${this.renderOpciones()}
            </div>

            <div id="feedback-container" class="mt-8 hidden"></div>
          </div>
          
          <div class="flex flex-col sm:flex-row justify-end gap-4">
            <button id="btnVolver" 
                    class="px-8 py-3 border-2 border-primary text-primary 
                           rounded-full font-medium hover:bg-primary-50 
                           transition-colors order-2 sm:order-1">
              Volver
            </button>
            
            <button id="btnEnviar" 
                    class="px-10 py-3 bg-primary text-white rounded-full 
                           font-semibold hover:bg-primary-600 transition-all
                           shadow-md hover:shadow-lg
                           disabled:bg-gray-300 disabled:cursor-not-allowed
                           disabled:hover:bg-gray-300 disabled:shadow-none
                           order-1 sm:order-2"
                    disabled>
              Enviar
            </button>

            <button id="btnSiguiente" 
                    class="px-10 py-3 bg-primary text-white rounded-full 
                           font-semibold hover:bg-primary-600 transition-all
                           shadow-md hover:shadow-lg
                           hidden order-1 sm:order-2">
              Continuar
            </button>
          </div>
        </div>
      </div>
    `;
  }

  renderOpciones() {
    return this.retoDatos.opciones.map(opcion => `
      <quiz-option
        id="${opcion.id}"
        texto="${opcion.texto}"
      ></quiz-option>
    `).join('');
  }

  setupEventListeners() {
    const btnEnviar = this.querySelector('#btnEnviar');
    const btnVolver = this.querySelector('#btnVolver');
    const btnSiguiente = this.querySelector('#btnSiguiente');

    this.addEventListener('option-selected', (e) => {
      if (!this.respondido) {
        this.opcionSeleccionada = e.detail.id;
        btnEnviar.disabled = false;

        this.querySelectorAll('quiz-option').forEach(option => {
          if (option.getAttribute('id') === this.opcionSeleccionada) {
            option.setAttribute('checked', 'true');
          } else {
            option.setAttribute('checked', 'false');
          }
          option.connectedCallback();
        });
      }
    });

    btnEnviar.addEventListener('click', () => this.validarRespuesta());
    btnVolver.addEventListener('click', () => this.volverAlCurso());
    btnSiguiente.addEventListener('click', () => this.continuarSiguiente());
  }

  validarRespuesta() {
    if (!this.opcionSeleccionada || this.respondido) return;

    this.respondido = true;
    const opcionCorrecta = this.retoDatos.opciones.find(o => o.correcta);
    const esCorrecta = this.opcionSeleccionada === opcionCorrecta.id;

    this.querySelectorAll('quiz-option').forEach(option => {
      const optionId = option.getAttribute('id');
      const opcionData = this.retoDatos.opciones.find(o => o.id === optionId);
      
      if (opcionData.correcta) {
        option.marcarEstado('correcta');
      } else if (optionId === this.opcionSeleccionada && !esCorrecta) {
        option.marcarEstado('incorrecta');
      } else {
        option.setAttribute('disabled', 'true');
        option.connectedCallback();
      }
    });

    this.mostrarFeedback(esCorrecta);

    const btnEnviar = this.querySelector('#btnEnviar');
    const btnSiguiente = this.querySelector('#btnSiguiente');
    
    btnEnviar.classList.add('hidden');
    btnSiguiente.classList.remove('hidden');
  }

  mostrarFeedback(esCorrecta) {
    const feedbackContainer = this.querySelector('#feedback-container');
    
    feedbackContainer.innerHTML = `
      <div class="p-4 rounded-xl ${esCorrecta ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'}">
        <div class="flex items-start gap-3">
          ${esCorrecta ? `
            <svg class="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          ` : `
            <svg class="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          `}
          <div class="flex-1">
            <h3 class="font-semibold ${esCorrecta ? 'text-green-900' : 'text-red-900'} mb-1">
              ${esCorrecta ? '¡Respuesta correcta! 🎉' : 'Respuesta incorrecta'}
            </h3>
            <p class="${esCorrecta ? 'text-green-800' : 'text-red-800'}">
              ${esCorrecta 
                ? '¡Excelente trabajo! Has demostrado que comprendes el concepto. Continúa con la siguiente lección.' 
                : 'No te preocupes, equivocarse es parte del aprendizaje. Revisa el contenido y vuelve a intentarlo cuando estés listo.'}
            </p>
          </div>
        </div>
      </div>
    `;
    
    feedbackContainer.classList.remove('hidden');
    feedbackContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  volverAlCurso() {
    const cursoId = this.retoDatos.cursoId;
    const cursoDatos = cursosDetalles[cursoId];
    
    if (cursoDatos) {
      let leccionAnterior = null;
      for (const modulo of cursoDatos.modulos) {
        for (const leccion of modulo.lecciones) {
          if (leccion.id === this.retoId) {
            if (leccionAnterior) {
              navigateTo(`/curso/${cursoId}/${leccionAnterior.id}`);
              return;
            }
          }
          leccionAnterior = leccion;
        }
      }
    }
    navigateTo(`/curso/${cursoId}/leccion-1-1`);
  }

  continuarSiguiente() {
    const cursoId = this.retoDatos.cursoId;
    const cursoDatos = cursosDetalles[cursoId];
    
    if (cursoDatos) {
      let encontrado = false;
      for (const modulo of cursoDatos.modulos) {
        for (const leccion of modulo.lecciones) {
          if (encontrado) {
            navigateTo(`/curso/${cursoId}/${leccion.id}`);
            return;
          }
          if (leccion.id === this.retoId) encontrado = true;
        }
      }
    }
    navigateTo('/mis-cursos');
  }
}

customElements.define('vista-reto', VistaReto);

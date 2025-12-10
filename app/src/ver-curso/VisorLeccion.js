import { LeccionService } from '../api/LeccionService.js';
import RetoAPI from '../api/RetoAPI.js';

class VisorLeccion extends HTMLElement {
    constructor() {
        super();
        this.leccion = null;
        this.retos = [];
    }

    async connectedCallback() {
        this.cursoId = this.getAttribute('cursoId');
        this.leccionId = this.getAttribute('leccionId');

        this.innerHTML = `
            <div class="flex flex-col items-center justify-center h-screen bg-gray-50">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
                <p class="text-gray-500">Preparando tu clase...</p>
            </div>`;

        try {
            const [resLeccion, resRetos] = await Promise.all([
                LeccionService.getByCursoId(this.cursoId),
                RetoAPI.obtenerRetosPorLeccion(this.leccionId)
            ]);

            const lista = resLeccion.data || resLeccion || [];
            this.leccion = lista.find(l => (l._id || l.id).toString() === this.leccionId.toString());
            this.retos = resRetos.data || resRetos || [];

            if (this.leccion) {
                this.renderLayout();
            } else {
                this.innerHTML = `<div class="p-10 text-center">Lección no encontrada</div>`;
            }

        } catch (error) {
            console.error(error);
            this.innerHTML = `<div class="p-10 text-center text-red-500">Error cargando la clase</div>`;
        }
    }

    // Método auxiliar para detectar si es Quiz de forma robusta
    esQuiz(reto) {
        // 1. Chequeo por etiqueta
        if (reto.tipo === 'opcion_multiple' || reto.tipo === 'multiple') return true;
        
        // 2. Chequeo por estructura (Si tiene respuestas definidas, es un quiz)
        if (reto.preguntas && reto.preguntas[0] && 
            reto.preguntas[0].respuestas && 
            reto.preguntas[0].respuestas.length > 0) {
            return true;
        }
        
        return false;
    }

    renderLayout() {
        const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
        const vistaVolver = usuario.tipo === 'Maestro' ? 'dashboardMaestro' : 'cursosAlumno';
        
        this.innerHTML = `
        <div class="font-sans min-h-screen bg-gray-100 pb-10">
            <div class="bg-white border-b px-6 py-4 flex items-center gap-4 sticky top-0 z-20 shadow-sm">
                <button id="btn-volver" class="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                </button>
                <div>
                    <p class="text-xs text-primary-600 font-bold uppercase tracking-wider">Estás viendo</p>
                    <h1 class="font-bold text-gray-800 text-lg md:text-xl truncate max-w-lg">${this.leccion.titulo}</h1>
                </div>
            </div>

            <div class="max-w-[1600px] mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                <div class="lg:col-span-8 flex flex-col gap-4 sticky top-24">
                    <div id="pantalla-aprendizaje" class="bg-black rounded-2xl shadow-lg overflow-hidden min-h-[500px] relative transition-all duration-300 flex flex-col">
                        </div>
                    
                    <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                        <h2 id="titulo-contenido" class="text-2xl font-bold text-gray-800 mb-2"></h2>
                        <p id="desc-contenido" class="text-gray-600 leading-relaxed"></p>
                    </div>
                </div>

                <div class="lg:col-span-4 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden h-auto max-h-[calc(100vh-120px)] flex flex-col">
                    <div class="p-4 border-b bg-gray-50">
                        <h3 class="font-bold text-gray-700">Tu Ruta de Aprendizaje</h3>
                    </div>
                    <div class="overflow-y-auto p-2 space-y-2 custom-scrollbar flex-1">
                        
                        <button id="btn-ver-video" class="w-full text-left p-3 rounded-lg bg-primary-50 border border-primary-100 text-primary-800 font-bold flex items-center gap-3 hover:bg-primary-100 transition shadow-sm">
                            <span class="bg-white p-1.5 rounded text-lg shadow-sm">📺</span>
                            <span class="truncate">Clase: ${this.leccion.titulo}</span>
                        </button>

                        <div class="border-t border-gray-100 my-3"></div>
                        <p class="text-xs text-gray-400 font-bold uppercase px-2 mb-2 tracking-wider">Retos a completar</p>

                        ${this.retos.map((reto, idx) => {
                            const isQuiz = this.esQuiz(reto);
                            const badgeColor = isQuiz ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-green-100 text-green-700 border-green-200';
                            const badgeText = isQuiz ? 'Quiz' : 'Abierta';

                            return `
                            <button class="btn-reto w-full text-left p-3 rounded-lg border border-gray-100 hover:bg-gray-50 hover:border-gray-300 flex items-start gap-3 transition group mb-2" data-index="${idx}">
                                <div class="bg-gray-100 text-gray-600 w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full font-bold text-xs mt-0.5 group-hover:bg-primary-100 group-hover:text-primary-700 transition">
                                    ${idx + 1}
                                </div>
                                <div class="flex-1 overflow-hidden">
                                    <div class="flex justify-between items-center mb-1">
                                        <span class="text-[10px] font-bold px-1.5 py-0.5 rounded border ${badgeColor} uppercase tracking-wide">${badgeText}</span>
                                    </div>
                                    <p class="text-sm font-bold text-gray-700 group-hover:text-primary-800 truncate">${reto.titulo}</p>
                                </div>
                                <span class="ml-auto text-gray-300 group-hover:text-primary-500 self-center">👉</span>
                            </button>
                        `}).join('')}

                        ${this.retos.length === 0 ? '<p class="text-sm text-gray-400 p-4 text-center italic bg-gray-50 rounded-lg m-2">No hay retos en esta lección.</p>' : ''}
                    </div>
                </div>
            </div>
        </div>
        `;

        this.setupListeners();
        this.cargarVideo(); 
    }

    setupListeners() {
        // Botón de volver
        const btnVolver = this.querySelector('#btn-volver');
        if (btnVolver) {
            btnVolver.addEventListener('click', () => {
                const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
                const vistaVolver = usuario.tipo === 'Maestro' ? 'dashboardMaestro' : 'cursosAlumno';
                window.location.href = `?vista=${vistaVolver}`;
            });
        }

        this.querySelector('#btn-ver-video').addEventListener('click', () => this.cargarVideo());

        this.querySelectorAll('.btn-reto').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = btn.dataset.index;
                this.cargarReto(this.retos[idx]);
            });
        });
    }

    cargarVideo() {
        const pantalla = this.querySelector('#pantalla-aprendizaje');
        pantalla.classList.add('bg-black');
        pantalla.classList.remove('bg-white');
        pantalla.style.backgroundColor = '#000';

        const vidUrl = this.leccion.videoUrl || (this.leccion.multimedia && this.leccion.multimedia[0]?.URL);
        let contentHTML = '';

        if (vidUrl && (vidUrl.includes('youtube') || vidUrl.includes('youtu.be'))) {
            const id = vidUrl.split('v=')[1] || vidUrl.split('/').pop();
            contentHTML = `<iframe class="w-full h-full aspect-video" src="https://www.youtube.com/embed/${id}?autoplay=1" frameborder="0" allowfullscreen></iframe>`;
        } else {
            contentHTML = `
                <div class="flex flex-col items-center justify-center h-full text-white p-10 text-center bg-gray-900 w-full">
                    <div class="text-6xl mb-4">📺</div>
                    <h2 class="text-2xl font-bold">Lección de Lectura</h2>
                    <p class="opacity-70 mt-2">Revisa el contenido y completa los retos.</p>
                </div>`;
        }
        
        pantalla.innerHTML = contentHTML;
        this.querySelector('#titulo-contenido').textContent = this.leccion.titulo;
        this.querySelector('#desc-contenido').textContent = this.leccion.descripcion || 'Sin descripción.';
    }

    cargarReto(reto) {
        const pantalla = this.querySelector('#pantalla-aprendizaje');
        pantalla.classList.remove('bg-black');
        pantalla.classList.add('bg-white');
        pantalla.style.backgroundColor = '#ffffff'; 

        this.querySelector('#titulo-contenido').textContent = `Desafío: ${reto.titulo}`;
        this.querySelector('#desc-contenido').textContent = reto.descripcion || "Completa el reto para avanzar.";

        let html = '';
        const isQuiz = this.esQuiz(reto); // Usamos la nueva función robusta

        // --- 1. QUIZ (OPCIÓN MÚLTIPLE) ---
        if (isQuiz) {
            const pregunta = (reto.preguntas && reto.preguntas[0]) ? reto.preguntas[0] : { contenido: 'Sin pregunta', respuestas: [] };
            const opciones = pregunta.respuestas || [];

            html = `
                <div class="p-8 h-full w-full flex flex-col overflow-y-auto animate-fade-in text-left">
                    <div class="mb-6">
                        <span class="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Quiz</span>
                        <h2 class="text-2xl font-bold text-gray-800 mt-4 leading-tight">${pregunta.contenido || 'Pregunta del Quiz'}</h2>
                    </div>

                    <div class="space-y-3 mb-8 flex-1" id="quiz-options-container">
                        ${opciones.map((op, i) => `
                            <label class="quiz-option flex items-center p-4 border-2 border-gray-100 rounded-xl cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition-all group bg-white relative overflow-hidden" id="label-opcion-${i}">
                                <input type="radio" name="respuesta_reto" value="${i}" class="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300 z-10">
                                <span class="ml-3 text-gray-700 font-medium group-hover:text-blue-800 text-lg z-10">
                                    ${op.contenido || op.texto || 'Opción sin texto'}
                                </span>
                                <span class="result-icon ml-auto text-xl font-bold z-10"></span>
                            </label>
                        `).join('')}
                    </div>

                    <div id="feedback-area" class="mb-4 hidden p-4 rounded-lg text-center font-bold text-lg"></div>

                    <button id="btn-validar-quiz" class="w-full sm:w-auto bg-blue-600 text-white py-3 px-8 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg flex items-center justify-center gap-2 self-start">
                        <span>Verificar Respuesta</span>
                    </button>
                </div>
            `;
            
            pantalla.innerHTML = html;

            // Validación Quiz
            const btnValidar = pantalla.querySelector('#btn-validar-quiz');
            if (btnValidar) {
                btnValidar.addEventListener('click', () => {
                    const seleccionado = pantalla.querySelector('input[name="respuesta_reto"]:checked');
                    if (!seleccionado) {
                        alert("⚠️ Por favor selecciona una opción.");
                        return;
                    }

                    const indexSeleccionado = parseInt(seleccionado.value);
                    const opcionElegida = opciones[indexSeleccionado];
                    const feedback = pantalla.querySelector('#feedback-area');
                    const labels = pantalla.querySelectorAll('.quiz-option');

                    labels.forEach(l => {
                        l.classList.remove('border-green-500', 'bg-green-50', 'border-red-500', 'bg-red-50');
                        l.querySelector('.result-icon').textContent = '';
                    });

                    feedback.classList.remove('hidden', 'bg-green-100', 'text-green-700', 'bg-red-100', 'text-red-700');

                    if (opcionElegida.es_correcta) {
                        const labelCorrecto = pantalla.querySelector(`#label-opcion-${indexSeleccionado}`);
                        labelCorrecto.classList.add('border-green-500', 'bg-green-50');
                        labelCorrecto.querySelector('.result-icon').textContent = '✅';
                        
                        feedback.classList.add('bg-green-100', 'text-green-700');
                        feedback.textContent = "¡Correcto! 🎉 Muy buen trabajo.";
                        
                        btnValidar.disabled = true;
                        btnValidar.textContent = "Completado";
                        btnValidar.classList.add('opacity-50', 'cursor-not-allowed');
                    } else {
                        const labelIncorrecto = pantalla.querySelector(`#label-opcion-${indexSeleccionado}`);
                        labelIncorrecto.classList.add('border-red-500', 'bg-red-50');
                        labelIncorrecto.querySelector('.result-icon').textContent = '❌';

                        feedback.classList.add('bg-red-100', 'text-red-700');
                        feedback.textContent = "Respuesta incorrecta. Inténtalo de nuevo.";
                    }
                });
            }
        } 
        
        // --- 2. PREGUNTA ABIERTA ---
        else {
            const preguntas = reto.preguntas || [];
            
            html = `
                <div class="p-8 h-full w-full flex flex-col overflow-y-auto animate-fade-in text-left">
                    <div class="mb-6">
                        <span class="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Pregunta Abierta</span>
                        <h2 class="text-2xl font-bold text-gray-800 mt-4">${reto.titulo}</h2>
                        <p class="text-gray-500 mt-1">Responde lo siguiente:</p>
                    </div>

                    <div class="space-y-6 mb-8 flex-1">
                        ${preguntas.map((preg, i) => `
                            <div>
                                <p class="font-bold text-gray-800 mb-2 flex gap-2 text-lg">
                                    <span class="bg-gray-200 text-gray-700 w-8 h-8 flex items-center justify-center rounded-full text-sm shrink-0">${i+1}</span>
                                    <span>${preg.contenido || 'Pregunta...'}</span>
                                </p>
                                <textarea class="w-full p-4 border border-gray-300 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-50 outline-none resize-none bg-white transition-all text-gray-700 text-lg shadow-sm" rows="3" placeholder="Escribe tu respuesta aquí..."></textarea>
                            </div>
                        `).join('')}
                    </div>

                    <button class="w-full sm:w-auto bg-green-600 text-white py-3 px-8 rounded-xl font-bold hover:bg-green-700 transition shadow-lg flex items-center justify-center gap-2 self-start" onclick="alert('¡Tarea enviada!')">
                        Enviar Tarea
                    </button>
                </div>
            `;
            pantalla.innerHTML = html;
        }
    }
}

if (!customElements.get('visor-leccion')) {
    customElements.define('visor-leccion', VisorLeccion);
}
export default VisorLeccion;
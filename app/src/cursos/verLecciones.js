import "./componentes/leccionBloque.js";
import "./componentes/cursoPortada.js";

class VerLecciones extends HTMLElement {

  connectedCallback() {

    this.innerHTML = `
      <div class="min-h-screen px-6 py-10 sm:px-20 bg-gradient-to-b from-white to-blue-50 font-sans">

        <h1 class="text-3xl font-light text-black mb-8">
          Curso conceptos básicos de JavaScript
        </h1>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">

          <!-- Portada -->
          <div>
            <curso-portada img="../../assets/images/jscurso.png"></curso-portada>

            <p class="text-xs text-gray-500 mt-3">
              Publicado el: 17/09/2025
            </p>

            <p class="text-gray-700 mt-4 leading-relaxed">
              ¡Hola! Bienvenido nuevamente. Aquí puedes seguir tu progreso en las lecciones
              y acceder cuando quieras a cada contenido.
            </p>

            <button onclick="history.back()"
              class="mt-6 px-10 py-3 rounded-full text-white font-medium shadow-md transition-all"
              style="background-color:#2A6BBF">
              Regresar
            </button>
          </div>



          <!-- Lecciones -->
          <div>

            <h2 class="text-lg font-medium mb-3 text-black">Contenido:</h2>

            <div class="space-y-4 overflow-y-auto max-h-[70vh] pr-2">

              <leccion-bloque
                titulo="Lección 1: Tu primer 'Hola Mundo'"
                expandible="true"
                subtareas="[
                  '¿Qué es JS?',
                  'Sintaxis básica',
                  'Primer script',
                  'Ejercicio guiado'
                ]"
                color="#64A85F">
              </leccion-bloque>

              <leccion-bloque
                titulo="Lección 2: Variables y almacenamiento"
                expandible="true"
                subtareas="[
                  'let y const',
                  'Buenas prácticas',
                  'Ejercicio práctico'
                ]"
                color="#64A85F">
              </leccion-bloque>

              <leccion-bloque
                titulo="Lección 3: Tipos de datos"
                expandible="true"
                subtareas="[
                  'string',
                  'boolean',
                  'objetos',
                  'arrays'
                ]"
                color="#64A85F">
              </leccion-bloque>

              <leccion-bloque
                titulo="Lección 4: Operadores en JS"
                expandible="true"
                subtareas="[
                  'Aritméticos',
                  'Comparación',
                  'Lógicos'
                ]"
                color="#64A85F">
              </leccion-bloque>

            </div>

          </div>
        </div>

      </div>
    `;
  }
}

customElements.define("ver-lecciones", VerLecciones);
export default VerLecciones;

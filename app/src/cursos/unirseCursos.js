import "./componentes/leccionBloque.js";
import "./componentes/cursoPortada.js";

class UnirseCursos extends HTMLElement {

  connectedCallback() {

    this.innerHTML = `
      <div class="min-h-screen px-6 py-10 sm:px-20 bg-gradient-to-b from-white to-blue-50 font-sans">

        <!-- TITULO -->
        <h1 class="text-3xl font-light text-black mb-8">
          Curso conceptos básicos de JavaScript
        </h1>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">

          <!-- Columna izquierda -->
          <div>

            <!-- Imagen portada -->
            <curso-portada img="../../assets/images/jscurso.png"></curso-portada>

            <p class="text-xs text-gray-500 mt-3">
              Publicado el: 17/09/2025
            </p>

            <p class="text-gray-700 mt-4 leading-relaxed">
              ¡Hola! Soy Luka, tu profesor y me emociona mucho que te unas a este curso.
              Si siempre has querido entender cómo funcionan las páginas web interactivas o
              si estás listo para dar tus primeros pasos en el desarrollo, este es el lugar
              perfecto para empezar.
            </p>

            <!-- Botón unirse -->
            <button id="btnUnirse"
              class="mt-6 px-10 py-3 rounded-full text-white font-medium shadow-md transition-all"
              style="background-color:#2A6BBF">
              Unirse
            </button>

          </div>

          <!-- Columna derecha -->
          <div>

            <h2 class="text-lg font-medium mb-3 text-black">Contenido:</h2>

            <div id="listaLecciones" class="space-y-3">

              <leccion-bloque
                titulo="Lección 1: Tu primer 'Hola Mundo'"
                color="#64A85F">
              </leccion-bloque>

              <leccion-bloque
                titulo="Lección 2: Almacenando Información con Variables"
                color="#64A85F">
              </leccion-bloque>

              <leccion-bloque
                titulo="Lección 3: Tipos de Datos: los 'ingredientes' de tu código"
                color="#64A85F">
              </leccion-bloque>

              <leccion-bloque
                titulo="Lección 4: Operadores: lo que hace que tu código funcione"
                color="#64A85F">
              </leccion-bloque>

              <leccion-bloque
                titulo="Lección 5: Tomando Decisiones con Condicionales"
                color="#64A85F">
              </leccion-bloque>

              <leccion-bloque
                titulo="Lección 6: Bloques Switch y Bucles"
                color="#64A85F">
              </leccion-bloque>

            </div>

          </div>
        </div>

        <!-- Modal unirse -->
        <div id="modalExito"
          class="fixed inset-0 bg-black/40 hidden items-center justify-center backdrop-blur-sm">

          <div class="bg-white p-6 rounded-xl shadow-lg w-[320px] text-center">
            <p class="text-gray-800 mb-4">
              🎉 ¡Te has unido correctamente al curso!
            </p>

            <button onclick="location.href='index.html?vista=progreso'"
              class="w-full px-4 py-2 rounded-full text-white"
              style="background-color:#2A6BBF">
              Ver progreso
            </button>
          </div>
        </div>

      </div>
    `;

    this.init();
  }

  init() {
    const btn = this.querySelector("#btnUnirse");
    const modal = this.querySelector("#modalExito");

    btn.addEventListener("click", () => {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    });
  }
}

customElements.define("unirse-cursos", UnirseCursos);
export default UnirseCursos;

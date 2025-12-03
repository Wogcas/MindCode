class ModalAlerta extends HTMLElement {
    connectedCallback() {
      const mensaje = this.getAttribute("mensaje") || "Mensaje";
      const tipo = this.getAttribute("tipo") || "alerta";
  
      this.innerHTML = `
        <div class="fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm z-[9999] animate-fadeIn">
  
          <div class="bg-white rounded-xl shadow-xl px-6 py-6 w-[310px] sm:w-[340px] animate-slideUp">
  
            <p class="text-center text-gray-800 text-sm font-medium mb-4 leading-relaxed">
              ${mensaje}
            </p>
  
            <div class="flex justify-center gap-3">
              ${tipo === "confirmacion"
                ? `<button id="btnCancelar" class="px-5 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-full text-sm transition">
                    Cancelar
                   </button>`
                : ""
              }
  
              <button id="btnAceptar"
                class="px-6 py-2 rounded-full text-sm text-white shadow-md transition hover:shadow-lg active:scale-95"
                style="background-color:#2A6BBF">
                Aceptar
              </button>
            </div>
  
          </div>
        </div>
      `;
  
      this.initEvents(tipo);
    }
  
    initEvents(tipo) {
      const aceptar = this.querySelector("#btnAceptar");
      const cancelar = this.querySelector("#btnCancelar");
  
      aceptar.addEventListener("click", () => {
        this.dispatchEvent(new CustomEvent("aceptar"));
        this.remove();
      });
  
      if (cancelar) {
        cancelar.addEventListener("click", () => {
          this.dispatchEvent(new CustomEvent("cancelar"));
          this.remove();
        });
      }
    }
  }
  
  customElements.define("modal-alerta", ModalAlerta);
  
  /* Animaciones */
  const style = document.createElement("style");
  style.textContent = `
    @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
    @keyframes slideUp { from { transform:translateY(20px); opacity:0 } to { transform:translateY(0); opacity:1 } }
  
    .animate-fadeIn { animation: fadeIn .2s ease-out }
    .animate-slideUp { animation: slideUp .25s ease-out }
  `;
  
  document.head.appendChild(style);
  
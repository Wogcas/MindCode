import { LeccionService } from '../../api/LeccionService.js';

export function renderModalCrearLeccion(cursoId, onSuccess) {
  const modalOverlay = document.createElement('div');
  modalOverlay.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 modal-overlay-leccion";

  modalOverlay.innerHTML = `
    <div class="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl transform transition-all animate-fade-in-up">
      <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800">Agregar Nueva Lección</h2>
          <button id="btn-cerrar-modal" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
      </div>
      
      <form id="form-crear-leccion" class="space-y-5">
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2">Título de la lección</label>
          <input type="text" name="titulo" required placeholder="Ej: Introducción a Variables" 
                 class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all">
        </div>
        
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
          <textarea name="descripcion" rows="4" placeholder="Breve resumen..."
                    class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"></textarea>
        </div>

        <div class="flex justify-end gap-3 pt-4">
          <button type="button" id="btn-cancelar" class="px-5 py-2.5 rounded-lg text-gray-600 font-medium hover:bg-gray-100 transition-colors">Cancelar</button>
          <button type="submit" class="px-5 py-2.5 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 shadow-md transition-all flex items-center gap-2">
            Guardar Lección
          </button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(modalOverlay);

  // --- Funciones Internas ---
  const cerrarModal = () => {
    if (document.body.contains(modalOverlay)) {
        document.body.removeChild(modalOverlay);
    }
  };

  modalOverlay.querySelector('#btn-cerrar-modal').addEventListener('click', cerrarModal);
  modalOverlay.querySelector('#btn-cancelar').addEventListener('click', cerrarModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) cerrarModal();
  });

  // --- LÓGICA DE GUARDADO MEJORADA ---
  // Usamos modalOverlay.querySelector para asegurar que elegimos el formulario correcto
  const form = modalOverlay.querySelector('#form-crear-leccion');
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btnSubmit = form.querySelector('button[type="submit"]');
    const textoOriginal = btnSubmit.innerHTML;
    btnSubmit.innerHTML = `Guardando...`;
    btnSubmit.disabled = true;

    const formData = new FormData(e.target);
    const datos = {
      id_curso: cursoId, 
      titulo: formData.get('titulo'),
      descripcion: formData.get('descripcion')
    };

    try {
      console.log("Enviando lección al servidor...");
      const resultado = await LeccionService.create(datos);
      console.log("Respuesta del servidor:", resultado);

      // CAMBIO CLAVE: Chequeo más flexible. 
      // Si la API no dio error (cayó en el catch), asumimos que fue exitoso si 'resultado' existe.
      if (resultado) { 
        console.log("¡Éxito! Ejecutando recarga de página...");

        // 1. Disparar evento global (opcional, pero útil)
        const eventoRecarga = new CustomEvent('leccion-creada', {
          bubbles: true, 
          composed: true,
          detail: { cursoId }
        });
        document.dispatchEvent(eventoRecarga);

        // 2. Ejecutar el Callback de recarga (LO MÁS IMPORTANTE)
        if (onSuccess && typeof onSuccess === 'function') {
           await onSuccess(); // Esperamos a que recargue antes de cerrar
        } else {
           console.warn("ADVERTENCIA: No se pasó la función onSuccess para recargar la página");
        }

        cerrarModal(); 

      } else {
        throw new Error('El servidor no devolvió una respuesta válida');
      }

    } catch (error) {
      console.error("Error al guardar:", error);
      alert('Ocurrió un error al guardar. Revisa la consola.');
      btnSubmit.innerHTML = textoOriginal;
      btnSubmit.disabled = false;
    }
  });
}
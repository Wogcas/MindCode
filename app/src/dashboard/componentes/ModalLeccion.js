import { LeccionService } from '../../api/LeccionService.js';

export function renderModalCrearLeccion(cursoId, onSuccess) {
  // 1. Crear el overlay (fondo oscuro)
  const modalOverlay = document.createElement('div');
  modalOverlay.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 modal-overlay-leccion";
  
  // 2. Crear el contenido del modal
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
                 class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all">
        </div>
        
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
          <textarea name="descripcion" rows="4" placeholder="Breve resumen de lo que aprenderán..."
                    class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"></textarea>
        </div>

        <div class="flex justify-end gap-3 pt-4">
          <button type="button" id="btn-cancelar" class="px-5 py-2.5 rounded-lg text-gray-600 font-medium hover:bg-gray-100 transition-colors">Cancelar</button>
          <button type="submit" class="px-5 py-2.5 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 shadow-md hover:shadow-lg transition-all flex items-center gap-2">
            <span>Guardar Lección</span>
          </button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(modalOverlay);

  // --- Funciones Internas ---

  const cerrarModal = () => {
      document.body.removeChild(modalOverlay);
  };

  // Listeners para cerrar
  document.getElementById('btn-cerrar-modal').addEventListener('click', cerrarModal);
  document.getElementById('btn-cancelar').addEventListener('click', cerrarModal);
  
  // Cerrar al hacer click fuera del modal
  modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) cerrarModal();
  });

  // Listener para GUARDAR (Submit)
  const form = document.getElementById('form-crear-leccion');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Feedback visual de carga
    const btnSubmit = form.querySelector('button[type="submit"]');
    const textoOriginal = btnSubmit.innerHTML;
    btnSubmit.innerHTML = `<svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Guardando...`;
    btnSubmit.disabled = true;

    const formData = new FormData(e.target);
    const datos = {
      id_curso: cursoId, // Pasamos el ID del curso actual
      titulo: formData.get('titulo'),
      descripcion: formData.get('descripcion')
    };

    try {
      await LeccionService.create(datos);
      
      // Si todo sale bien:
      cerrarModal();
      if (onSuccess) onSuccess(); 
      
    } catch (error) {
      console.error(error);
      alert('Error al crear la lección. Revisa la conexión.');
      
      // Restauramos botón si falló
      btnSubmit.innerHTML = textoOriginal;
      btnSubmit.disabled = false;
    }
  });
}
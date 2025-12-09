import { LeccionService } from '../../api/LeccionService.js';

export function renderModalCrearLeccion(cursoId, onSuccess) {
  // Creamos el overlay del modal
  const modalOverlay = document.createElement('div');
  modalOverlay.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
  
  modalOverlay.innerHTML = `
    <div class="bg-white rounded-lg p-8 w-full max-w-md shadow-2xl transform transition-all">
      <h2 class="text-2xl font-bold mb-6 text-gray-800">Agregar Nueva Lección</h2>
      
      <form id="form-crear-leccion" class="space-y-4">
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2">Título de la lección</label>
          <input type="text" name="titulo" required class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
        </div>
        
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
          <textarea name="descripcion" rows="3" class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"></textarea>
        </div>

        <div class="flex justify-end gap-3 mt-6">
          <button type="button" id="btn-cancelar" class="px-4 py-2 text-gray-600 hover:text-gray-800">Cancelar</button>
          <button type="submit" class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">Guardar Lección</button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(modalOverlay);

  // Lógica de cerrar
  const cerrar = () => document.body.removeChild(modalOverlay);
  document.getElementById('btn-cancelar').addEventListener('click', cerrar);

  // Lógica de guardar
  document.getElementById('form-crear-leccion').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const datos = {
      id_curso: cursoId,
      titulo: formData.get('titulo'),
      descripcion: formData.get('descripcion'),
      // Otros campos necesarios según tu CreateLeccionDTO
    };

    try {
      await LeccionService.create(datos);
      cerrar();
      if (onSuccess) onSuccess(); // Recargar la lista de lecciones
    } catch (error) {
      alert('Error al crear la lección');
    }
  });
}
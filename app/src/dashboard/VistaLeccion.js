import { LeccionService } from '../api/LeccionService.js';

export async function loadVistaLeccion(cursoId, leccionId) {
  const mainContent = document.getElementById('main-content');
  // ... lógica de loading ...

  // Suponemos que tienes un endpoint que trae el detalle de la lección con su contenido
  // const leccion = await LeccionService.getDetalleCompleto(leccionId); 
  // Por ahora usaré datos simulados para la estructura visual
  
  const leccion = { titulo: "Introducción a React", descripcion: "Conceptos básicos", contenido: [], retos: [] }; 

  mainContent.innerHTML = `
    <div class="p-8 max-w-5xl mx-auto">
      <button id="btn-volver" class="mb-4 text-purple-600 hover:underline">&larr; Volver al curso</button>
      
      <h1 class="text-3xl font-bold mb-2">${leccion.titulo}</h1>
      <p class="text-gray-600 mb-8">${leccion.descripcion}</p>

      <div class="bg-gray-100 p-6 rounded-lg mb-8 border-2 border-dashed border-gray-300 text-center" id="area-contenido">
         ${leccion.contenido.length > 0 
            ? `<div class="bg-black h-64 w-full text-white flex items-center justify-center">Reproductor de Video Aquí</div>` 
            : `
              <p class="text-gray-500 mb-4">No hay contenido multimedia aún.</p>
              <div class="flex justify-center gap-4">
                <button id="btn-add-video" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Agregar Video (Link)</button>
                <button id="btn-add-image" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Subir Imagen</button>
              </div>
            `}
      </div>

      <div class="mt-10">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold">Retos de la Lección</h2>
          <button id="btn-add-reto" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">+ Crear Reto</button>
        </div>
        
        <div id="lista-retos" class="space-y-4">
          ${leccion.retos.length === 0 ? '<p class="text-gray-400 italic">No hay retos configurados.</p>' : ''}
        </div>
      </div>
    </div>
  `;

  // Event Listeners
  document.getElementById('btn-volver').addEventListener('click', () => {
    import('./DetalleCurso.js').then(module => module.loadDetalleCurso(cursoId));
  });

  // Listener para agregar Reto (Debería abrir otro modal similar al de Lección)
  document.getElementById('btn-add-reto').addEventListener('click', () => {
      // Aquí llamas a una función renderModalCrearReto(leccionId)
      alert("Aquí abriría el modal para crear un reto (Pregunta, opciones, respuesta correcta)");
  });
  
  // Listeners para contenido
  if(document.getElementById('btn-add-video')) {
      document.getElementById('btn-add-video').addEventListener('click', () => {
          const url = prompt("Ingresa la URL del video (YouTube/Vimeo):");
          if(url) {
              // Llamar a LeccionService.addContenido(...)
              alert(`Guardando video: ${url}`);
          }
      });
  }
}
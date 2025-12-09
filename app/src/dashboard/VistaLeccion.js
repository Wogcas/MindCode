import { loadDetalleCurso } from './DetalleCurso.js';

export function loadVistaLeccion(cursoId, leccionId) {
    // CAMBIO CLAVE: Buscamos 'vista'
    const mainContent = document.getElementById('vista') || document.getElementById('app-root');
    
    if (!mainContent) return;

    mainContent.innerHTML = `
        <div class="p-8 max-w-5xl mx-auto h-full flex flex-col font-sans">
            <button id="btn-volver-detalle" class="text-gray-500 hover:text-purple-600 mb-6 flex items-center gap-2 self-start">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                Volver al contenido del curso
            </button>

            <div class="bg-white rounded-2xl shadow-sm border p-8 flex-1">
                <h1 class="text-3xl font-bold text-gray-800 mb-4">Detalle de la Lección</h1>
                <p class="text-gray-600 mb-8">ID: ${leccionId}</p>
                
                <div class="bg-gray-100 rounded-xl h-64 flex items-center justify-center border-2 border-dashed border-gray-300">
                    <p class="text-gray-400 font-medium">Aquí irá el Video o Imagen</p>
                </div>

                <div class="mt-8">
                    <h2 class="text-xl font-bold mb-4">Retos</h2>
                    <p class="text-sm text-gray-500 italic">Próximamente...</p>
                </div>
            </div>
        </div>
    `;

    document.getElementById('btn-volver-detalle').addEventListener('click', () => {
        loadDetalleCurso(cursoId);
    });
}
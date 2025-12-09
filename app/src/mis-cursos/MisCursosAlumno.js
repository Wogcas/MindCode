import './componentes/CursoCardAlumno.js'; // Asegúrate de importar la tarjeta
// NO importes el router aquí para evitar el "flasheazo"

class MisCursosAlumno extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    // 1. Obtener usuario para saber sus cursos
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    
    // Simulación de cursos (OJO: Aquí deberías conectar tu API real)
    // Si usas una API, reemplaza esto con tu fetch
    const cursos = JSON.parse(localStorage.getItem('cursos') || '[]');
    
    // Filtramos los cursos de este usuario (opcional, según tu lógica)
    // Por ahora mostramos todos para probar
    const misCursos = cursos.length > 0 ? cursos : [
        { id: 1, titulo: "Introducción a JavaScript", progreso: 75, imagen: "curso-js.png" },
        { id: 2, titulo: "Diseño UX/UI Avanzado", progreso: 30, imagen: "https://via.placeholder.com/300" }
    ];

    this.innerHTML = `
      <div class="max-w-7xl mx-auto p-6 animate-fade-in">
        
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <h1 class="text-3xl font-bold text-gray-800">Mis Cursos</h1>
                <p class="text-gray-500 mt-1">Continúa donde te quedaste</p>
            </div>
            
            <div class="relative w-full md:w-72">
                <input type="text" placeholder="Buscar en mis cursos..." 
                       class="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all">
                <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
            </div>
        </div>

        ${misCursos.length > 0 
          ? `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                ${misCursos.map(curso => `
                    <curso-card-alumno 
                        id="${curso.id}"
                        titulo="${curso.titulo}"
                        progreso="${curso.progreso || 0}"
                        imagen="${curso.imagen || ''}" 
                    ></curso-card-alumno>
                `).join('')}
             </div>`
          : `<div class="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                <div class="inline-flex bg-white p-4 rounded-full shadow-sm mb-4">
                    <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                </div>
                <h3 class="text-lg font-medium text-gray-900">Aún no tienes cursos</h3>
                <p class="text-gray-500 mb-6">¡Explora el catálogo y empieza a aprender!</p>
                <a href="?vista=explorar" class="text-primary-600 font-semibold hover:underline">Explorar cursos</a>
             </div>`
        }
      </div>
    `;
  }
}

customElements.define('mis-cursos-alumno', MisCursosAlumno);
export default MisCursosAlumno;
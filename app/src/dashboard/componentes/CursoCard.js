class CursoCard extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute('title') || 'Curso';
    const image = this.getAttribute('image') || '';
    const type = this.getAttribute('type') || 'maestro';
    const cursoId = this.getAttribute('cursoId') || '';
    const visibilidad = this.getAttribute('visibilidad') || 'Privado';
    const progreso = parseInt(this.getAttribute('progreso') || '0');

    const esPublico = visibilidad === 'Público';
    const badgeColor = esPublico ? 'bg-green-500' : 'bg-orange-500';
    const badgeText = esPublico ? 'Público' : 'Requiere acceso';
    const lockIcon = esPublico 
      ? '<path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2V7a5 5 0 00-5-5zm-3 7V7a3 3 0 116 0v2H7z"/>'
      : '<path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>';

    // Si es tipo alumno, mostrar con progreso
    const mostrarProgreso = type === 'alumno' && progreso > 0;

    this.innerHTML = `
      <div class="curso-card-container bg-primary rounded-3xl overflow-hidden shadow-lg w-[280px] min-w-32 ${mostrarProgreso ? 'h-[300px]' : 'h-[270px]'} flex-shrink-0 flex flex-col cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative">
        <div class="absolute top-4 right-4 z-10 ${badgeColor} text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg">
          <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">${lockIcon}</svg>
          <span>${badgeText}</span>
        </div>
        <div class="p-4">
          <div class="bg-gradient-to-br from-primary-900 to-red-900 rounded-2xl overflow-hidden h-44 flex items-center justify-center">
            <img src="${image}" alt="${title}" class="w-full h-full object-cover">
          </div>
        </div>
        <div class="px-6 ${mostrarProgreso ? 'pb-3' : 'pb-6'} text-white text-center flex-grow flex items-center justify-center">
          <p class="text-sm leading-relaxed font-normal">${title}</p>
        </div>
        ${mostrarProgreso ? `
          <div class="px-6 pb-4">
            <div class="bg-white/20 rounded-full h-2 overflow-hidden">
              <div class="bg-white h-full transition-all duration-300" style="width: ${progreso}%"></div>
            </div>
            <p class="text-white text-xs text-center mt-1 opacity-90">${progreso}% completado</p>
          </div>
        ` : ''}
      </div>
    `;

    this.setupClickHandler(cursoId);
  }

  setupClickHandler(cursoId) {
    const card = this.querySelector('.curso-card-container');
    
    if (card && cursoId) {
      card.addEventListener('click', async (e) => {
        e.preventDefault();
        
        card.style.opacity = "0.7"; 
        card.style.cursor = "wait";

        try {
          const module = await import('../DetalleCurso.js'); 
          module.loadDetalleCurso(cursoId);
          
        } catch (error) {
          console.error("Error al cargar el detalle del curso:", error);
          alert("No se pudo cargar el detalle del curso.");
        } finally {
          card.style.opacity = "1";
          card.style.cursor = "pointer";
        }
      });
    }
  }
}

customElements.define('curso-card', CursoCard);
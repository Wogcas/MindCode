class CursoCardAlumno extends HTMLElement {
  constructor() {
    super();
  }

  // Monitorizar atributos para que se actualice si cambian
  static get observedAttributes() {
    return ['id', 'titulo', 'imagen', 'progreso'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    // 1. Obtener datos (igual que en el Dashboard)
    const id = this.getAttribute('id');
    const titulo = this.getAttribute('titulo') || 'Curso sin nombre';
    const progreso = parseInt(this.getAttribute('progreso')) || 0;
    let imagenRaw = this.getAttribute('imagen');

    // 2. Lógica de Imagen "Estilo Dashboard" (Directa y Segura)
    let imagenSrc = '';

    // Si no hay imagen, null o undefined, preparamos para mostrar fallback
    if (!imagenRaw || imagenRaw === 'null' || imagenRaw === 'undefined') {
        imagenSrc = ''; 
    } 
    // Si ya es Base64 o URL web, USARLA DIRECTAMENTE (Aquí estaba el fallo antes)
    else if (imagenRaw.startsWith('data:') || imagenRaw.startsWith('http')) {
        imagenSrc = imagenRaw;
    }
    // Si es un nombre de archivo local (ej: 'curso1.png') y NO tiene ruta, se la ponemos
    else if (!imagenRaw.includes('/') && !imagenRaw.startsWith('data:')) {
        // Solo si es nombre simple asumimos assets, si no, lo dejamos pasar
        imagenSrc = `../../assets/images/${imagenRaw}`;
    }
    // Si es una cadena Base64 larga sin cabecera (fix para BD)
    else if (imagenRaw.length > 100 && !imagenRaw.startsWith('data:')) {
        imagenSrc = `data:image/jpeg;base64,${imagenRaw}`;
    }
    // Por defecto (rutas relativas o assets ya completos)
    else {
        imagenSrc = imagenRaw;
    }

    this.innerHTML = `
      <div class="bg-white h-full rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden group cursor-pointer flex flex-col">
        
        <div class="relative h-48 w-full bg-gray-200 overflow-hidden">
             ${imagenSrc 
               ? `<img src="${imagenSrc}" 
                       alt="${titulo}" 
                       class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                       onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">`
               : ''
             }

             <div class="${imagenSrc ? 'hidden' : 'flex'} w-full h-full items-center justify-center bg-gray-100 absolute top-0 left-0">
                <div class="text-center">
                    <div class="bg-white p-3 rounded-full shadow-sm mb-2 inline-flex">
                        <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                    </div>
                    <p class="text-xs text-gray-400 font-medium">MindCode</p>
                </div>
             </div>

             <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
        </div>
        
        <div class="p-5 flex flex-col flex-1 justify-between">
            <div>
                <h3 class="font-bold text-gray-800 text-lg leading-tight mb-3 line-clamp-2 group-hover:text-primary-700 transition-colors">
                    ${titulo}
                </h3>
                
                <div class="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                    <span class="font-medium">Tu progreso</span>
                    <span class="font-bold text-primary-600">${progreso}%</span>
                </div>
                
                <div class="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div class="bg-primary-500 h-2 rounded-full transition-all duration-1000 ease-out" 
                         style="width: ${progreso}%">
                    </div>
                </div>
            </div>
            
            <button class="mt-5 w-full bg-white border border-primary-200 text-primary-600 hover:bg-primary-50 hover:border-primary-300 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 group-hover:bg-primary-600 group-hover:text-white group-hover:border-transparent group-hover:shadow-md">
                <span>Continuar</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
            </button>
        </div>
      </div>
    `;

    // 3. Evento de Navegación (Sin router viejo)
    this.querySelector('button').addEventListener('click', (e) => {
        e.stopPropagation(); // Evitar doble click si el padre también escucha
        window.location.href = `?vista=verCurso&id=${id}`;
    });

    // Hacer click en toda la tarjeta también navega
    this.addEventListener('click', () => {
        window.location.href = `?vista=verCurso&id=${id}`;
    });
  }
}

customElements.define('curso-card-alumno', CursoCardAlumno);
export default CursoCardAlumno;
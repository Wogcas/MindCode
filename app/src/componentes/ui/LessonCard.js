// app/src/componentes/ui/LessonCard.js

class LessonCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.leccionId = this.getAttribute('leccionId');
        this.titulo = this.getAttribute('titulo');
        this.completada = this.getAttribute('completada') === 'true';
        this.tipo = this.getAttribute('tipo');
        this.activa = this.getAttribute('activa') === 'true';
        // Los siguientes atributos se pasan desde SidebarLecciones.js
        this.esMaestro = this.getAttribute('esMaestro') === 'true'; 
        this.cursoId = this.getAttribute('cursoId');
        
        this.render();
        this.setupEventListeners();
    }

    render() {
        // 1. ESTILOS DE LA TARJETA (Lección Activa = Naranja 'secondary')
        const activeClasses = this.activa 
            ? 'bg-secondary-100 border-l-4 border-secondary-500' // Naranja
            : 'hover:bg-gray-100 border-l-4 border-transparent';
        
        const titleClasses = this.activa 
            ? 'font-bold text-secondary-700' 
            : 'text-gray-700';

        // 2. Icono (Completado = Verde 'primary')
        const checkIcon = this.completada ? `
            <svg class="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
        ` : `
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4a8 8 0 100 16 8 8 0 000-16zM12 9v4"/>
            </svg>
        `; // Icono de información o punto por defecto

        // 3. Botones de Edición (Maestro = Verde 'primary')
        const botonesEdicion = this.esMaestro ? `
            <div class="flex items-center space-x-2 ml-auto">
                <button class="btn-editar-leccion text-xs text-primary-600 hover:text-primary-800 p-1 rounded-full hover:bg-primary-50 transition" 
                        title="Editar Lección">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                </button>
                <button class="btn-crear-reto text-xs text-primary-600 hover:text-primary-800 p-1 rounded-full hover:bg-primary-50 transition" 
                        title="Crear Nuevo Reto">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </button>
            </div>
        ` : '';

        this.innerHTML = `
            <div class="lesson-card-wrapper px-6 py-3 flex items-center transition duration-150 ease-in-out cursor-pointer 
                        ${activeClasses}" data-leccion-id="${this.leccionId}">
                
                <div class="flex-shrink-0 mr-3">
                    ${checkIcon}
                </div> 
                
                <span class="flex-1 text-sm ${titleClasses} line-clamp-2">
                    ${this.titulo}
                </span> 
                
                ${botonesEdicion}
                
            </div>
        `;
    }

    setupEventListeners() {
        // Evento para cambiar de lección al hacer click en la tarjeta (general)
        this.querySelector('.lesson-card-wrapper')?.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('lesson-clicked', {
                detail: { leccionId: this.leccionId },
                bubbles: true,
                composed: true
            }));
        });
        
        if (this.esMaestro) {
            // Event listener para Editar Lección
            this.querySelector('.btn-editar-leccion')?.addEventListener('click', (e) => {
                e.stopPropagation(); 
                this.dispatchEvent(new CustomEvent('abrir-modal-edicion-leccion', {
                    detail: { leccionId: this.leccionId, cursoId: this.cursoId },
                    bubbles: true,
                    composed: true 
                }));
            });
            
            // Event listener para Crear Reto
            this.querySelector('.btn-crear-reto')?.addEventListener('click', (e) => {
                e.stopPropagation(); 
                window.location.href = `?vista=crearReto&cursoId=${this.cursoId}&leccionId=${this.leccionId}`;
            });
        }
    }
}

customElements.define('lesson-card', LessonCard);
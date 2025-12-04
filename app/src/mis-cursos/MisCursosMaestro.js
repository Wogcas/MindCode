import './componentes/CursoCardDatos.js'
import '../crear-curso/CrearCurso.js'
import { cursoService } from '../api/CursoService.js';

class MisCursosMaestro extends HTMLElement {
    constructor() {
        super();
        this.cursos = [];
        this.loading = true;
        this.error = null;
    }

    async connectedCallback() {
        this.render();
        await this.cargarCursos();
        this.setupEventListeners();
    }

    async cargarCursos() {
        try {
            this.loading = true;
            this.mostrarEstadoCarga();

            const resultado = await cursoService.fetchTeacherCourses();
            
            if (resultado.success) {
                this.cursos = resultado.cursos;
                this.error = null;
            }
        } catch (error) {
            console.error('Error al cargar cursos:', error);
            this.error = error.message || 'Error al cargar los cursos';
            this.mostrarError(this.error);
        } finally {
            this.loading = false;
            this.actualizarVista();
        }
    }

    mostrarEstadoCarga() {
        const cursosGrid = this.querySelector('#cursosGrid');
        if (cursosGrid) {
            cursosGrid.innerHTML = `
                <div class="col-span-full flex justify-center items-center py-20">
                    <div class="text-center">
                        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        <p class="mt-4 text-gray-600">Cargando cursos...</p>
                    </div>
                </div>
            `;
        }
    }

    mostrarError(mensaje) {
        const cursosGrid = this.querySelector('#cursosGrid');
        if (cursosGrid) {
            cursosGrid.innerHTML = `
                <div class="col-span-full flex justify-center items-center py-20">
                    <div class="text-center">
                        <svg class="mx-auto h-12 w-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                        </svg>
                        <p class="mt-4 text-gray-700 font-medium">${mensaje}</p>
                        <button onclick="location.reload()" class="mt-4 bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-600">
                            Reintentar
                        </button>
                    </div>
                </div>
            `;
        }
    }

    actualizarVista() {
        const cursosGrid = this.querySelector('#cursosGrid');
        if (cursosGrid) {
            cursosGrid.innerHTML = this.renderCursos();
        }
    }

    render() {
        this.innerHTML = `
        <section class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
            
            <!-- Encabezado de la Sección -->
            <div class="flex justify-between items-end mb-10">
                <h1 class="text-4xl font-normal text-gray-900 tracking-tight">
                    Mis cursos
                </h1>
                
                <button id="crearCursoBtn" class="bg-[#4F75C2] hover:bg-[#3d5a96] text-white font-medium py-2.5 px-6 rounded-full shadow-sm hover:shadow-md transition-all duration-200 text-sm flex items-center gap-2 cursor-pointer">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                    </svg>
                    Crear curso
                </button>
            </div>

            <div id="cursosGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                ${this.renderCursos()}
            </div>
        </section>
        `;
    }

    renderCursos() {
        if (this.loading) {
            return `
                <div class="col-span-full flex justify-center items-center py-20">
                    <div class="text-center">
                        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        <p class="mt-4 text-gray-600">Cargando cursos...</p>
                    </div>
                </div>
            `;
        }

        if (this.error) {
            return `
                <div class="col-span-full flex justify-center items-center py-20">
                    <div class="text-center">
                        <svg class="mx-auto h-12 w-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                        </svg>
                        <p class="mt-4 text-gray-700 font-medium">${this.error}</p>
                        <button onclick="location.reload()" class="mt-4 bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-600">
                            Reintentar
                        </button>
                    </div>
                </div>
            `;
        }

        if (this.cursos.length === 0) {
            return `
                <div class="col-span-full flex flex-col items-center justify-center py-20">
                    <svg class="w-24 h-24 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                    </svg>
                    <h3 class="text-xl font-medium text-gray-700 mb-2">No tienes cursos creados</h3>
                    <p class="text-gray-500 mb-6">Comienza creando tu primer curso</p>
                </div>
            `;
        }

        return this.cursos.map(curso => {
            const fechaFormateada = curso.createdAt ? new Date(curso.createdAt).toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            }) : 'N/A';

            return `
                <curso-card-datos 
                    titulo="${curso.titulo || 'Sin título'}" 
                    imagen="${curso.imagen || 'https://via.placeholder.com/400x250?text=Curso'}"
                    participantes="${curso.participantes || 0}"
                    estado="${curso.visibilidad || 'Privado'}"
                    fechaPublicacion="${fechaFormateada}"
                    cursoId="${curso.id}"
                ></curso-card-datos>
            `;
        }).join('');
    }

    setupEventListeners() {
        const crearCursoBtn = this.querySelector('#crearCursoBtn');
        if (crearCursoBtn) {
            crearCursoBtn.addEventListener('click', () => this.abrirModalCrearCurso());
        }

        document.addEventListener('curso-creado', async () => {
            await this.cargarCursos();
        });
    }

    abrirModalCrearCurso() {
        const modal = document.createElement('crear-curso');
        document.body.appendChild(modal);
    }
}

customElements.define('mis-cursos-maestro', MisCursosMaestro);
import './componentes/CursoCardDatos.js'
import '../crear-curso/CrearCurso.js'

class MisCursosMaestro extends HTMLElement {
    constructor() {
        super();
        this.cursos = [];
        this.loading = true;
        this.error = null;
    }

    async connectedCallback() {
        this.renderLoading();
        try {
            await this.cargarCursos();
            this.render();
        } catch (error) {
            this.error = error.message;
            this.renderError();
        }
        this.setupEventListeners();
    }

    /**
     * Cargar cursos del usuario desde la API
     */
    async cargarCursos() {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No hay sesión activa');
            }

            const response = await fetch('http://localhost:3000/api/cursos', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            this.cursos = data.cursos || [];
            this.loading = false;

            console.log('✅ Cursos cargados:', this.cursos);
        } catch (error) {
            console.error('❌ Error al cargar cursos:', error);
            this.loading = false;
            throw error;
        }
    }

    renderLoading() {
        this.innerHTML = `
            <section class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div class="flex justify-center items-center h-64">
                    <div class="text-center">
                        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                        <p class="text-gray-600">Cargando cursos...</p>
                    </div>
                </div>
            </section>
        `;
    }

    renderError() {
        this.innerHTML = `
            <section class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <p class="text-red-800 font-medium mb-2">Error al cargar los cursos</p>
                    <p class="text-red-600 text-sm mb-4">${this.error}</p>
                    <button onclick="window.location.reload()" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
                        Reintentar
                    </button>
                </div>
            </section>
        `;
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
        return this.cursos.map(curso => `
            <curso-card-datos 
                titulo="${curso.titulo}" 
                imagen="${curso.imagen}"
                participantes="${curso.participantes}"
                estado="${curso.estado}"
                fechaPublicacion="${curso.fechaPublicacion}"
            ></curso-card-datos>
        `).join('');
    }

    setupEventListeners() {
        const crearCursoBtn = this.querySelector('#crearCursoBtn');
        crearCursoBtn.addEventListener('click', () => this.abrirModalCrearCurso());

        document.addEventListener('curso-creado', (e) => {
            this.agregarCurso(e.detail);
        });
    }

    abrirModalCrearCurso() {
        const modal = document.createElement('crear-curso');
        document.body.appendChild(modal);
    }

    agregarCurso(nuevoCurso) {
        this.cursos.unshift(nuevoCurso);
        const cursosGrid = this.querySelector('#cursosGrid');
        cursosGrid.innerHTML = this.renderCursos();
    }
}

customElements.define('mis-cursos-maestro', MisCursosMaestro);
import './componentes/CursoCardDatos.js'
import '../crear-curso/CrearCurso.js'

class MisCursosMaestro extends HTMLElement {
    constructor() {
        super();
        this.cursos = [
            {
                titulo: "Todo lo que tienes que saber de iOS",
                imagen: "https://img.uxcel.com/cdn-cgi/image/format=auto/tags/ios-1721717446446-2x.jpg",
                participantes: "20",
                estado: "Privado",
                fechaPublicacion: "17/09/25"
            },
            {
                titulo: "Todo lo que tienes que saber de React",
                imagen: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
                participantes: "10",
                estado: "Público",
                fechaPublicacion: "15/09/25"
            },
            {
                titulo: "Todo lo que tienes que saber de Flutter",
                imagen: "https://images.unsplash.com/photo-1617042375876-a13e36732a04?q=80&w=800&auto=format&fit=crop",
                participantes: "10",
                estado: "Público",
                fechaPublicacion: "10/09/25"
            },
            {
                titulo: "Todo lo que tienes que saber de Angular",
                imagen: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?q=80&w=800&auto=format&fit=crop",
                participantes: "22",
                estado: "Privado",
                fechaPublicacion: "01/08/25"
            }
        ];
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
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
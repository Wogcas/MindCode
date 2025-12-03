import { client } from '../api/apiClient.js';
import './componentes/CursoCardDatos.js';
import '../crear-curso/CrearCurso.js';

class MisCursosMaestro extends HTMLElement {
    constructor() {
        super();
        this.cursos = [];
    }

    async connectedCallback() {
        this.innerHTML = `<div class="p-10 text-center animate-pulse">Cargando cursos...</div>`;
        await this.cargarCursos();
    }

    async cargarCursos() {
        try {
            const usuario = client.obtenerUsuarioActual();
            console.log("👤 Usuario logueado:", usuario); // LOG 1: Ver quién eres

            if (!usuario) {
                window.location.href = '/login/index.html';
                return;
            }

            // Petición al Backend
            const respuesta = await client.request('/cursos', { method: 'GET' });
            console.log("📦 Respuesta del servidor (Cursos):", respuesta); // LOG 2: Ver la data cruda

            if (respuesta.success) {
                const todosCursos = respuesta.data || [];
                const miId = usuario.id || usuario._id;

                // Filtrar
                this.cursos = todosCursos.filter(c => c.id_maestro === miId);
                
                // LOG 3: Ver qué cursos pasaron el filtro y si tienen imagen
                console.log("🎯 Mis Cursos filtrados:", this.cursos.map(c => ({
                    titulo: c.titulo,
                    tieneImagen: !!c.imagen,
                    longitudImagen: c.imagen ? c.imagen.length : 0
                })));

                this.render();
            } else {
                alert('Error al obtener cursos');
            }

        } catch (error) {
            console.error("❌ Error CRÍTICO:", error);
            this.innerHTML = `<div class="text-red-500 p-10">Error: ${error.message}</div>`;
        }
    }

    render() {
        // ... (resto del render igual, solo asegúrate de pasar la imagen)
        if (this.cursos.length === 0) {
            this.innerHTML = `<div class="p-20 text-center text-gray-500">
                <h2 class="text-2xl">No tienes cursos creados</h2>
                <button id="btnCrearCurso" class="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full">Crear Curso</button>
            </div>`;
        } else {
            this.innerHTML = `
            <div class="min-h-screen bg-white px-6 py-8 sm:px-20 font-sans">
                <div class="flex justify-between items-center mb-8">
                    <h1 class="text-3xl font-light text-black">Mis Cursos</h1>
                    <button id="btnCrearCurso" class="bg-[#2A6BBF] text-white px-6 py-3 rounded-full shadow-md hover:bg-[#235aad] transition-colors">
                        + Crear Nuevo Curso
                    </button>
                </div>

                <div id="cursosGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${this.cursos.map(curso => {
                        // LOG 4: Justo antes de crear el HTML
                        // console.log(`Pintando curso: ${curso.titulo} - img: ${curso.imagen?.substring(0, 30)}...`);
                        
                        return `
                        <curso-card-datos 
                            titulo="${curso.titulo}"
                            imagen="${curso.imagen || ''}" 
                            participantes="0"
                            estado="${curso.publico ? 'Público' : 'Privado'}"
                            fechaPublicacion="${new Date(curso.createdAt).toLocaleDateString()}"
                        ></curso-card-datos>
                    `}).join('')}
                </div>
            </div>
            `;
        }
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        const btn = this.querySelector('#btnCrearCurso');
        if(btn) {
            btn.addEventListener('click', () => {
                const modal = document.createElement('crear-curso');
                modal.addEventListener('curso-creado', () => this.cargarCursos());
                document.body.appendChild(modal);
            });
        }
    }
}

customElements.define('mis-cursos-maestro', MisCursosMaestro);
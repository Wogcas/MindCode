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
            const usuarioStorage = localStorage.getItem('usuario');
            const idMaestro = usuarioStorage.id_maestro; 
            if (!token) {
                throw new Error('No hay sesión activa');
            }

            const response = await fetch('http://localhost:3000/api/cursos/${idMaestro}', {
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

            console.log('Cursos cargados:', this.cursos);
        } catch (error) {
            console.error('Error al cargar cursos:', error);
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

    async agregarCurso(datosDelFormulario) {
        try {
            const token = localStorage.getItem('token');

            const usuarioGuardado = localStorage.getItem('usuario');
            const usuarioObj = usuarioGuardado ? JSON.parse(usuarioGuardado) : null;

            if (!usuarioObj || (!usuarioObj.id && !usuarioObj._id)) {
                throw new Error('No se identificó al usuario maestro. Vuelve a iniciar sesión.');
            }

            let imagenFinal = '';

            if (datosDelFormulario.imagen) {
                console.log("Comprimiendo imagen...");
                try {
                    imagenFinal = await this.comprimirImagen(datosDelFormulario.imagen, 800, 0.7);
                    console.log("Imagen comprimida.");
                } catch (err) {
                    console.error("Error al comprimir, se usará la original:", err);
                    imagenFinal = datosDelFormulario.imagen;
                }
            }

            const payloadParaBackend = {
                titulo: datosDelFormulario.nombre || datosDelFormulario.titulo || "Curso sin nombre",
                descripcion: datosDelFormulario.descripcion,
                id_maestro: usuarioObj.id || usuarioObj._id,
                imagen: imagenFinal, 
                publico: true
            };

            console.log("Enviando payload corregido:", payloadParaBackend);

            const response = await fetch('http://localhost:3000/api/cursos/agregar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payloadParaBackend)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al crear el curso');
            }

            const resultado = await response.json();
            const cursoGuardado = resultado.data;

            console.log(' Curso guardado en BD:', cursoGuardado);

            this.cursos.unshift(cursoGuardado);

            const cursosGrid = this.querySelector('#cursosGrid');
            if (cursosGrid) {
                cursosGrid.innerHTML = this.renderCursos();
            }
            alert('¡Curso creado con éxito!');

        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al crear el curso: ' + error.message);
        }
    }

    /**
    * 
    * @param {string} base64 
    * @param {number} maxWidth 
    * @param {number} quality 
    */
    async comprimirImagen(base64, maxWidth = 800, quality = 0.7) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = base64;

            img.onload = () => {
                let width = img.width;
                let height = img.height;

                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                const dataUrl = canvas.toDataURL('image/jpeg', quality);
                resolve(dataUrl);
            };

            img.onerror = (error) => reject(error);
        });
    }
}

customElements.define('mis-cursos-maestro', MisCursosMaestro);
/**
 * API Client para comunicación con el backend
 * Centraliza todas las llamadas HTTP
 */

class ApiClient {
    constructor() {
        this.baseURL = 'http://localhost:3000/api';
        this.token = this.getToken();
    }

    /**
     * Obtener token del localStorage
     */
    getToken() {
        return localStorage.getItem('token');
    }

    /**
     * Guardar token en localStorage
     */
    setToken(token) {
        localStorage.setItem('token', token);
        this.token = token;
    }

    /**
     * Limpiar token
     */
    clearToken() {
        localStorage.removeItem('token');
        this.token = null;
    }

    /**
     * Realizar petición HTTP
     */
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        // Agregar token si existe
        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        try {
            const response = await fetch(url, {
                ...options,
                headers
            });

            const data = await response.json();

            if (!response.ok) {
                throw {
                    status: response.status,
                    message: data.message || 'Error en la petición',
                    data: data
                };
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // ===== AUTENTICACIÓN =====

    async login(email, password) {
        return this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
    }

    async registrar(nombre, email, password, tipo) {
        return this.request('/auth/registrar', {
            method: 'POST',
            body: JSON.stringify({ nombre, email, password, tipo })
        });
    }

    async obtenerPerfil() {
        return this.request('/auth/perfil', {
            method: 'GET'
        });
    }

    // ===== USUARIOS =====

    async obtenerUsuario(id) {
        return this.request(`/usuarios/${id}`, {
            method: 'GET'
        });
    }

    // ===== CURSOS =====

    async obtenerCursos() {
        return this.request('/cursos', {
            method: 'GET'
        });
    }

    async obtenerCurso(id) {
        return this.request(`/cursos/${id}`, {
            method: 'GET'
        });
    }

    async crearCurso(datos) {
        return this.request('/cursos', {
            method: 'POST',
            body: JSON.stringify(datos)
        });
    }

    async actualizarCurso(id, datos) {
        return this.request(`/cursos/${id}`, {
            method: 'PUT',
            body: JSON.stringify(datos)
        });
    }

    async eliminarCurso(id) {
        return this.request(`/cursos/${id}`, {
            method: 'DELETE'
        });
    }

    async obtenerCursosPorUsuario(usuarioId) {
        return this.request(`/cursos/${usuarioId}`, {
            method: 'GET'
        });
    }

    // ===== LECCIONES =====

    async obtenerLecciones(cursoId) {
        return this.request(`/lecciones/curso/${cursoId}`, {
            method: 'GET'
        });
    }

    async crearLeccion(datos) {
        return this.request('/lecciones', {
            method: 'POST',
            body: JSON.stringify(datos)
        });
    }

    // ===== RETOS =====

    async obtenerRetos(cursoId) {
        return this.request(`/retos/curso/${cursoId}`, {
            method: 'GET'
        });
    }

    async crearReto(datos) {
        return this.request('/retos', {
            method: 'POST',
            body: JSON.stringify(datos)
        });
    }

    // ===== LOGOUT =====

    logout() {
        this.clearToken();
    }
}

// Instancia global
export const client = new ApiClient();

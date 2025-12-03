/**
 * API Client para autenticación
 * Maneja todas las peticiones HTTP al backend
 */

const API_BASE_URL = 'http://localhost:3000/api';

class ApiClient {
    constructor() {
        this.baseURL = API_BASE_URL;
        this.token = this.getToken();
    }

    /**
     * Obtiene el token del localStorage
     */
    getToken() {
        return localStorage.getItem('authToken');
    }

    /**
     * Guarda el token en localStorage
     */
    setToken(token) {
        if (token) {
            localStorage.setItem('authToken', token);
            this.token = token;
        }
    }

    /**
     * Elimina el token del localStorage
     */
    clearToken() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('usuario');
        this.token = null;
    }

    /**
     * Obtiene los headers por defecto
     */
    getHeaders() {
        const headers = {
            'Content-Type': 'application/json'
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        return headers;
    }

    /**
     * Realiza una petición genérica
     */
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            ...options,
            headers: {
                ...this.getHeaders(),
                ...options.headers
            }
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                const error = new Error(data.message || 'Error en la petición');
                error.status = response.status;
                error.data = data;
                throw error;
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    /**
     * Registra un nuevo usuario
     * @param {string} nombre - Nombre completo
     * @param {string} correo - Email
     * @param {string} contrasena - Contraseña
     * @param {string} tipo - Tipo de usuario (Alumno o Maestro)
     */
    async registrar(nombre, correo, contrasena, tipo) {
        const response = await this.request('/auth/registrar', {
            method: 'POST',
            body: JSON.stringify({
                nombre,
                correo,
                contrasena,
                tipo
            })
        });

        if (response.success && response.data.token) {
            this.setToken(response.data.token);
            localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
        }

        return response;
    }

    /**
     * Inicia sesión con email y contraseña
     * @param {string} correo - Email
     * @param {string} contrasena - Contraseña
     */
    async login(correo, contrasena) {
        const response = await this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                correo,
                contrasena
            })
        });

        if (response.success && response.data.token) {
            this.setToken(response.data.token);
            localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
        }

        return response;
    }

    /**
     * Obtiene el perfil del usuario autenticado
     */
    async obtenerPerfil() {
        return this.request('/auth/perfil', {
            method: 'GET'
        });
    }

    /**
     * Cierra la sesión
     */
    logout() {
        this.clearToken();
    }

    /**
     * Verifica si hay un usuario autenticado
     */
    estaAutenticado() {
        return !!this.getToken();
    }

    /**
     * Obtiene el usuario actual del localStorage
     */
    obtenerUsuarioActual() {
        const usuario = localStorage.getItem('usuario');
        return usuario ? JSON.parse(usuario) : null;
    }
}

const apiClient = new ApiClient();

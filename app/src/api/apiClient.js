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
     * Obtener token del localStorage (Maneja JSON o String)
     */
    getToken() {
        const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
        return usuario.token || localStorage.getItem('token');
    }

    /**
     * Realizar petición HTTP Genérica
     */
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        
        // Headers por defecto
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        // Inyectar Token actualizado
        const token = this.getToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            const response = await fetch(url, {
                ...options,
                headers
            });

            // Si es 204 No Content (común en delete), retornar éxito
            if (response.status === 204) return true;

            const text = await response.text();
            const data = text ? JSON.parse(text) : {};

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

    // ===== MÉTODOS HTTP GENÉRICOS (ESTO ES LO QUE FALTABA) =====

    get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }

    post(endpoint, body) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(body)
        });
    }

    put(endpoint, body) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(body)
        });
    }

    // 👇 ESTE ES EL QUE CORRIGE TU ERROR
    delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }

    // ===== MÉTODOS ESPECÍFICOS (LEGACY) =====
    // Mantenemos estos para no romper código antiguo que use client.login(), etc.

    async login(email, password) {
        return this.post('/auth/login', { email, password });
    }

    async registrar(nombre, email, password, tipo) {
        return this.post('/auth/registrar', { nombre, email, password, tipo });
    }
}

// Exportamos ambas formas para asegurar compatibilidad
export const apiClient = new ApiClient();
export const client = apiClient;
/**
 * Shell.js - Gestor de autenticación y contexto de usuario
 * Verifica que el usuario esté logueado antes de cargar la app
 */

class AppShell {
    constructor() {
        this.usuario = null;
        this.token = null;
        this.init();
    }

    /**
     * Inicializar la aplicación
     */
    async init() {
        try {
            // Verificar si hay token
            this.token = localStorage.getItem('token');
            if (!this.token) {
                this.redirigirAlLogin();
                return;
            }

            await this.obtenerPerfil();

            window.app = {
                usuario: this.usuario,
                token: this.token,
                logout: () => this.logout()
            };

            console.log('✅ Usuario autenticado:', this.usuario);
            this.setupEventListeners();
        } catch (error) {
            console.error('❌ Error al inicializar:', error);
            this.redirigirAlLogin();
        }
    }

    /**
     * Obtener perfil del usuario autenticado
     */
    async obtenerPerfil() {
        try {
            const response = await fetch('http://localhost:3000/api/auth/perfil', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });

            if (!response.ok) {
                throw new Error('Token inválido o expirado');
            }

            const data = await response.json();
            this.usuario = data.usuario;
        } catch (error) {
            console.error('Error al obtener perfil:', error);
            throw error;
        }
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        window.location.href = '/app/src/login/index.html';
    }

    /**
     * Redirigir al login si no está autenticado
     */
    redirigirAlLogin() {
        console.warn('No hay sesión activa. Redirigiendo al login...');
        window.location.href = '/app/src/login/index.html';
    }

    /**
     * Setup de event listeners globales
     */
    setupEventListeners() {
        // Aquí puedes agregar listeners globales si lo necesitas
        // Por ejemplo, manejar errores de token expirado
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new AppShell();
});

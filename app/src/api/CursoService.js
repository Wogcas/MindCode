/**
 * CursoService - Servicio para la gestión de cursos
 * Implementa el patrón Service Layer para centralizar la lógica de negocio de cursos
 * Sigue el patrón de arquitectura del proyecto (Microfrontend)
 */

import { client } from './apiClient.js';

class CursoService {
    constructor() {
        this.apiClient = client;
    }

    /**
     * Obtiene los cursos del maestro autenticado
     * @param {Object} options - Opciones de consulta (paginación, filtros)
     * @returns {Promise<Object>} Respuesta con los cursos del maestro
     * @throws {Error} Si el usuario no está autenticado o no es maestro
     */
    async fetchTeacherCourses(options = {}) {
        try {
            const token = this.apiClient.getToken();
            
            if (!token) {
                throw new Error('No hay sesión activa. Por favor inicia sesión.');
            }

            // Validar que el usuario es maestro
            const usuario = JSON.parse(localStorage.getItem('usuario'));
            if (!usuario || usuario.tipo !== 'Maestro') {
                throw new Error('Acceso denegado. Se requiere rol de Maestro.');
            }

            // Construir query params si existen opciones
            const queryParams = new URLSearchParams();
            if (options.page) queryParams.append('page', options.page);
            if (options.limit) queryParams.append('limit', options.limit);
            if (options.search) queryParams.append('search', options.search);
            
            const queryString = queryParams.toString();
            const endpoint = `/cursos/maestro/mis-cursos${queryString ? `?${queryString}` : ''}`;

            const response = await this.apiClient.request(endpoint, {
                method: 'GET'
            });

            if (!response.success) {
                throw new Error(response.message || 'Error al obtener los cursos del maestro');
            }

            return {
                success: true,
                cursos: response.data || [],
                total: response.total || response.data?.length || 0
            };

        } catch (error) {
            console.error('Error en fetchTeacherCourses:', error);
            throw {
                success: false,
                message: error.message || 'Error al cargar los cursos del maestro',
                error: error
            };
        }
    }

    /**
     * Obtiene los cursos inscritos del alumno autenticado
     * @param {Object} options - Opciones de consulta (paginación, filtros)
     * @returns {Promise<Object>} Respuesta con los cursos del alumno y su progreso
     * @throws {Error} Si el usuario no está autenticado o no es alumno
     */
    async fetchStudentCourses(options = {}) {
        try {
            const token = this.apiClient.getToken();
            
            if (!token) {
                throw new Error('No hay sesión activa. Por favor inicia sesión.');
            }

            // Validar que el usuario es alumno
            const usuario = JSON.parse(localStorage.getItem('usuario'));
            if (!usuario || usuario.tipo !== 'Alumno') {
                throw new Error('Acceso denegado. Se requiere rol de Alumno.');
            }

            // Construir query params si existen opciones
            const queryParams = new URLSearchParams();
            if (options.page) queryParams.append('page', options.page);
            if (options.limit) queryParams.append('limit', options.limit);
            if (options.filter) queryParams.append('filter', options.filter);
            
            const queryString = queryParams.toString();
            const endpoint = `/cursos/alumno/mis-cursos${queryString ? `?${queryString}` : ''}`;

            const response = await this.apiClient.request(endpoint, {
                method: 'GET'
            });

            if (!response.success) {
                throw new Error(response.message || 'Error al obtener los cursos del alumno');
            }

            return {
                success: true,
                cursos: response.data || [],
                total: response.total || response.data?.length || 0
            };

        } catch (error) {
            console.error('Error en fetchStudentCourses:', error);
            throw {
                success: false,
                message: error.message || 'Error al cargar los cursos del alumno',
                error: error
            };
        }
    }

    /**
     * Obtiene todos los cursos públicos (sin autenticación)
     * @param {Object} options - Opciones de consulta
     * @returns {Promise<Object>} Respuesta con todos los cursos disponibles
     */
    async fetchAllCourses(options = {}) {
        try {
            const queryParams = new URLSearchParams();
            if (options.page) queryParams.append('page', options.page);
            if (options.limit) queryParams.append('limit', options.limit);
            if (options.search) queryParams.append('search', options.search);
            
            const queryString = queryParams.toString();
            const endpoint = `/cursos${queryString ? `?${queryString}` : ''}`;

            const response = await this.apiClient.request(endpoint, {
                method: 'GET'
            });

            return {
                success: true,
                cursos: response.data || [],
                total: response.total || response.data?.length || 0
            };

        } catch (error) {
            console.error('Error en fetchAllCourses:', error);
            throw {
                success: false,
                message: error.message || 'Error al cargar los cursos',
                error: error
            };
        }
    }

    /**
     * Obtiene un curso específico por su ID
     * @param {string} cursoId - ID del curso
     * @returns {Promise<Object>} Datos del curso
     */
    async fetchCourseById(cursoId) {
        try {
            if (!cursoId) {
                throw new Error('ID de curso es requerido');
            }

            const response = await this.apiClient.request(`/cursos/${cursoId}`, {
                method: 'GET'
            });

            return {
                success: true,
                curso: response.data
            };

        } catch (error) {
            console.error('Error en fetchCourseById:', error);
            throw {
                success: false,
                message: error.message || 'Error al cargar el curso',
                error: error
            };
        }
    }

    /**
     * Crea un nuevo curso (solo maestros)
     * @param {Object} cursoData - Datos del curso a crear
     * @returns {Promise<Object>} Curso creado
     */
    async createCourse(cursoData) {
        try {
            const usuario = JSON.parse(localStorage.getItem('usuario'));
            if (!usuario || usuario.tipo !== 'Maestro') {
                throw new Error('Solo los maestros pueden crear cursos');
            }

            const response = await this.apiClient.request('/cursos/agregar', {
                method: 'POST',
                body: JSON.stringify(cursoData)
            });

            return {
                success: true,
                curso: response.data,
                message: 'Curso creado exitosamente'
            };

        } catch (error) {
            console.error('Error en createCourse:', error);
            throw {
                success: false,
                message: error.message || 'Error al crear el curso',
                error: error
            };
        }
    }

    /**
     * Actualiza un curso existente (solo maestros)
     * @param {string} cursoId - ID del curso
     * @param {Object} cursoData - Datos actualizados del curso
     * @returns {Promise<Object>} Curso actualizado
     */
    async updateCourse(cursoId, cursoData) {
        try {
            const usuario = JSON.parse(localStorage.getItem('usuario'));
            if (!usuario || usuario.tipo !== 'Maestro') {
                throw new Error('Solo los maestros pueden actualizar cursos');
            }

            const response = await this.apiClient.request(`/cursos/actualizar/${cursoId}`, {
                method: 'PUT',
                body: JSON.stringify(cursoData)
            });

            return {
                success: true,
                curso: response.data,
                message: 'Curso actualizado exitosamente'
            };

        } catch (error) {
            console.error('Error en updateCourse:', error);
            throw {
                success: false,
                message: error.message || 'Error al actualizar el curso',
                error: error
            };
        }
    }

    /**
     * Elimina un curso (solo maestros)
     * @param {string} cursoId - ID del curso a eliminar
     * @returns {Promise<Object>} Confirmación de eliminación
     */
    async deleteCourse(cursoId) {
        try {
            const usuario = JSON.parse(localStorage.getItem('usuario'));
            if (!usuario || usuario.tipo !== 'Maestro') {
                throw new Error('Solo los maestros pueden eliminar cursos');
            }

            const response = await this.apiClient.request(`/cursos/eliminar/${cursoId}`, {
                method: 'DELETE'
            });

            return {
                success: true,
                message: 'Curso eliminado exitosamente'
            };

        } catch (error) {
            console.error('Error en deleteCourse:', error);
            throw {
                success: false,
                message: error.message || 'Error al eliminar el curso',
                error: error
            };
        }
    }

    /**
     * Obtiene todos los cursos disponibles (públicos y privados visibles)
     * Los cursos privados requerirán código de acceso para inscribirse
     * @param {Object} options - Opciones de consulta (paginación, filtros)
     * @returns {Promise<Object>} Respuesta con todos los cursos disponibles
     */
    async fetchAvailableCourses(options = {}) {
        try {
            const queryParams = new URLSearchParams();
            if (options.page) queryParams.append('page', options.page);
            if (options.limit) queryParams.append('limit', options.limit);
            if (options.search) queryParams.append('search', options.search);
            
            const queryString = queryParams.toString();
            const endpoint = `/cursos/disponibles${queryString ? `?${queryString}` : ''}`;

            const response = await this.apiClient.request(endpoint, {
                method: 'GET'
            });

            if (!response.success) {
                throw new Error(response.message || 'Error al obtener los cursos disponibles');
            }

            return {
                success: true,
                cursos: response.data || [],
                total: response.total || response.data?.length || 0
            };

        } catch (error) {
            console.error('Error en fetchAvailableCourses:', error);
            throw {
                success: false,
                message: error.message || 'Error al cargar los cursos disponibles',
                error: error
            };
        }
    }

    /**
     * Inscribe al alumno autenticado a un curso
     * @param {string} cursoId - ID del curso
     * @returns {Promise<Object>} Resultado de la inscripción
     */
    async enrollInCourse(cursoId) {
        try {
            const token = this.apiClient.getToken();
            
            if (!token) {
                throw new Error('No hay sesión activa. Por favor inicia sesión.');
            }

            const usuario = JSON.parse(localStorage.getItem('usuario'));
            if (!usuario || usuario.tipo !== 'Alumno') {
                throw new Error('Solo los alumnos pueden inscribirse a cursos');
            }

            const response = await this.apiClient.request('/cursos/alumno/inscribirse', {
                method: 'POST',
                body: JSON.stringify({ cursoId })
            });

            return {
                success: true,
                message: response.message || 'Inscripción exitosa',
                data: response.data
            };

        } catch (error) {
            console.error('Error en enrollInCourse:', error);
            throw {
                success: false,
                message: error.message || 'Error al inscribirse al curso',
                error: error
            };
        }
    }

    /**
     * Obtiene un curso con la cantidad de participantes
     * @param {string} cursoId - ID del curso
     * @returns {Promise<Object>} Datos del curso con participantes
     */
    async fetchCourseWithParticipants(cursoId) {
        try {
            if (!cursoId) {
                throw new Error('ID de curso es requerido');
            }

            const response = await this.apiClient.request(`/cursos/detalle/${cursoId}`, {
                method: 'GET'
            });

            return {
                success: true,
                curso: response.data
            };

        } catch (error) {
            console.error('Error en fetchCourseWithParticipants:', error);
            throw {
                success: false,
                message: error.message || 'Error al cargar el curso',
                error: error
            };
        }
    }
}

// Exportar instancia única (Singleton)
export const cursoService = new CursoService();
export default CursoService;

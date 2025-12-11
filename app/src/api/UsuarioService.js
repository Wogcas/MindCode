import { client } from './apiClient.js';

export class UsuarioService {
    /**
     * Agregar curso al progreso del alumno
     */
    static async agregarCursoAProgreso(idUsuario, idCurso) {
        try {
            const response = await client.request(`/usuarios/${idUsuario}/progreso/agregar-curso`, {
                method: 'POST',
                body: JSON.stringify({ id_curso: idCurso })
            });

            return response;
        } catch (error) {
            console.error('Error en agregarCursoAProgreso:', error);
            throw error;
        }
    }

    /**
     * Marcar lección como completada
     */
    static async marcarLeccionCompletada(idUsuario, idCurso, idLeccion) {
        try {
            const response = await client.request(`/usuarios/${idUsuario}/progreso/completar-leccion`, {
                method: 'PUT',
                body: JSON.stringify({ 
                    id_curso: idCurso,
                    id_leccion: idLeccion 
                })
            });

            return response;
        } catch (error) {
            console.error('Error en marcarLeccionCompletada:', error);
            throw error;
        }
    }

    /**
     * Actualizar porcentaje de progreso
     */
    static async actualizarPorcentajeProgreso(idUsuario, idCurso, porcentaje) {
        try {
            const response = await client.request(`/usuarios/${idUsuario}/progreso/actualizar-porcentaje`, {
                method: 'PUT',
                body: JSON.stringify({ 
                    id_curso: idCurso,
                    porcentaje: porcentaje 
                })
            });

            return response;
        } catch (error) {
            console.error('Error en actualizarPorcentajeProgreso:', error);
            throw error;
        }
    }

    /**
     * Obtener progreso de cursos del alumno
     */
    static async obtenerProgresoCursos(idUsuario) {
        try {
            const response = await client.request(`/usuarios/${idUsuario}/progreso`, {
                method: 'GET'
            });

            return response;
        } catch (error) {
            console.error('Error en obtenerProgresoCursos:', error);
            throw error;
        }
    }

    /**
     * Obtener usuario por ID
     */
    static async obtenerUsuarioPorId(idUsuario) {
        try {
            const response = await client.request(`/usuarios/${idUsuario}`, {
                method: 'GET'
            });

            return response;
        } catch (error) {
            console.error('Error en obtenerUsuarioPorId:', error);
            throw error;
        }
    }
}

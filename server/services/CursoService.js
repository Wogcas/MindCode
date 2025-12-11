import CursoRepository from "../repositories/CursoRepository.js";
import UsuarioRepository from "../repositories/UsuarioRepository.js";
import { CursoAdapter } from "../utils/adapters/CursoAdapter.js";
import { NotFoundError, ConflictError } from "../auth/errorHandler.js";

export default class CursoService {

    constructor() {
        this.cursoRepo = new CursoRepository();
        this.usuarioRepo = new UsuarioRepository();
    }

    async agregarCurso(curso) {
        const cursoGuardado = await this.cursoRepo.agregarCurso(curso);
        return CursoAdapter.toDTO(cursoGuardado);
    }

    async obtenerCursos() {
        const cursos = await this.cursoRepo.obtenerCursos();
        return cursos.map(curso => CursoAdapter.toDTO(curso));
    }

    async obtenerCursoPorNombre(tituloCurso) {
        const cursos = await this.cursoRepo.obtenerCursoPorNombre(tituloCurso);
        if (!cursos || cursos.length === 0) {
            throw new NotFoundError(`No se encontraron cursos con el título: ${tituloCurso}`);
        }
        return cursos.map(curso => CursoAdapter.toDTO(curso));
    }

    async obtenerCursoPorId(idCurso) {
        const curso = await this.cursoRepo.obtenerCursoPorId(idCurso);
        if (!curso) {
            throw new NotFoundError(`Curso con ID ${idCurso} no encontrado`);
        }
        return CursoAdapter.toDTO(curso);
    }

    async actualizarCurso(idCurso, cursoModificado) {
        const curso = await this.cursoRepo.obtenerCursoPorId(idCurso);
        if (!curso) {
            throw new NotFoundError(`Curso con ID ${idCurso} no encontrado`);
        }
        const cursoActualizado = await this.cursoRepo.actualizarCurso(idCurso, cursoModificado);
        return CursoAdapter.toDTO(cursoActualizado);
    }

    async eliminarCurso(idCurso) {
        const curso = await this.cursoRepo.obtenerCursoPorId(idCurso);
        if (!curso) {
            throw new NotFoundError(`Curso con ID ${idCurso} no encontrado`);
        }

        // 1. Importar repositorios necesarios
        const { Leccion } = await import('../entities/Leccion.js');
        const { Reto } = await import('../entities/Reto.js');

        try {
            // 2. Obtener todas las lecciones del curso
            const lecciones = await Leccion.find({ id_curso: idCurso });
            const leccionIds = lecciones.map(l => l._id);

            // 3. Eliminar todos los retos asociados a esas lecciones
            if (leccionIds.length > 0) {
                await Reto.deleteMany({ lecciones: { $in: leccionIds } });
                console.log(`Eliminados retos asociados a ${leccionIds.length} lecciones`);
            }

            // 4. Eliminar todas las lecciones del curso
            await Leccion.deleteMany({ id_curso: idCurso });
            console.log(`Eliminadas ${lecciones.length} lecciones del curso ${idCurso}`);

            // 5. Eliminar el curso
            const cursoEliminado = await this.cursoRepo.eliminarCurso(idCurso);
            
            console.log(`✅ Curso ${idCurso} eliminado con integridad referencial`);
            return CursoAdapter.toDTO(cursoEliminado);

        } catch (error) {
            console.error('Error al eliminar curso con integridad referencial:', error);
            throw error;
        }
    }

    /**
     * Obtiene todos los cursos creados por un maestro específico
     * @param {string} maestroId - ID del maestro
     * @returns {Array} Lista de cursos del maestro con participantes
     */
    async obtenerCursosPorMaestro(maestroId) {
        const cursos = await this.cursoRepo.obtenerCursosPorMaestro(maestroId);
        
        // Obtener participantes para cada curso
        const cursosConParticipantes = await Promise.all(
            cursos.map(async (curso) => {
                const participantes = await this.usuarioRepo.contarAlumnosPorCurso(curso._id);
                return {
                    ...CursoAdapter.toDTO(curso),
                    participantes
                };
            })
        );
        
        return cursosConParticipantes;
    }

    /**
     * Obtiene todos los cursos en los que está inscrito un alumno
     * @param {string} alumnoId - ID del alumno
     * @returns {Array} Lista de cursos del alumno con progreso y participantes
     */
    async obtenerCursosPorAlumno(alumnoId) {
        const usuario = await this.usuarioRepo.obtenerUsuarioPorId(alumnoId);
        if (!usuario) {
            throw new NotFoundError(`Usuario con ID ${alumnoId} no encontrado`);
        }

        if (usuario.tipo !== 'Alumno') {
            throw new ConflictError('El usuario no es un alumno');
        }

        // Obtener IDs de cursos del progreso del alumno
        const cursoIds = usuario.progreso_cursos?.map(p => p.id_curso) || [];
        
        if (cursoIds.length === 0) {
            return [];
        }

        // Obtener información completa de cada curso
        const cursos = await this.cursoRepo.obtenerCursosPorIds(cursoIds);
        
        // Combinar información del curso con el progreso y participantes
        const cursosConDatos = await Promise.all(
            cursos.map(async (curso) => {
                const progreso = usuario.progreso_cursos.find(
                    p => p.id_curso.toString() === curso._id.toString()
                );
                
                // Obtener número de participantes
                const participantes = await this.usuarioRepo.contarAlumnosPorCurso(curso._id);
                
                return {
                    ...CursoAdapter.toDTO(curso),
                    participantes,
                    progreso: {
                        porcentaje: progreso?.porcentaje || 0,
                        lecciones_completadas: progreso?.lecciones_completadas || []
                    }
                };
            })
        );
        
        return cursosConDatos;
    }

    /**
     * Obtiene todos los cursos disponibles (públicos y privados)
     * Los cursos privados requerirán código de acceso para inscribirse
     * @returns {Array} Lista de todos los cursos
     */
    async obtenerCursosDisponibles() {
        const cursos = await this.cursoRepo.obtenerCursosDisponibles();
        return cursos.map(curso => CursoAdapter.toDTO(curso));
    }

    /**
     * Inscribe un alumno a un curso
     * @param {string} alumnoId - ID del alumno
     * @param {string} cursoId - ID del curso
     */
    async inscribirAlumno(alumnoId, cursoId) {
        // Verificar que el curso existe
        const curso = await this.cursoRepo.obtenerCursoPorId(cursoId);
        if (!curso) {
            throw new NotFoundError(`Curso con ID ${cursoId} no encontrado`);
        }

        // Verificar que el alumno no sea el maestro del curso
        if (curso.id_maestro.toString() === alumnoId.toString()) {
            throw new Error('No puedes inscribirte en tu propio curso');
        }

        // Inscribir al alumno
        const resultado = await this.usuarioRepo.agregarCursoAProgreso(alumnoId, cursoId);
        
        return {
            inscrito: true,
            curso: CursoAdapter.toDTO(curso)
        };
    }

    /**
     * Obtiene un curso con la cantidad de participantes
     * @param {string} cursoId - ID del curso
     */
    async obtenerCursoConParticipantes(cursoId) {
        const curso = await this.cursoRepo.obtenerCursoPorId(cursoId);
        if (!curso) {
            throw new NotFoundError(`Curso con ID ${cursoId} no encontrado`);
        }

        const participantes = await this.usuarioRepo.contarAlumnosPorCurso(cursoId);
        
        return {
            ...CursoAdapter.toDTO(curso),
            participantes
        };
    }
}
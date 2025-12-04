import { Curso } from "../entities/Curso.js";

export default class CursoRepository {

    constructor() { }

    async agregarCurso(curso) {
        const nuevoCurso = new Curso(curso);
        return await nuevoCurso.save();
    }

    async obtenerCursos() {
        return await Curso.find({});
    }

    async obtenerCursoPorNombre(tituloCurso) {
        return await Curso.find({ 
            titulo: { $regex: tituloCurso, $options: 'i' } 
        });
    }

    async obtenerCursoPorId(idCurso) {
        return await Curso.findById(idCurso);
    }

    async actualizarCurso(idCurso, cursoModificado) {
        return await Curso.findByIdAndUpdate(idCurso, cursoModificado, { new: true });
    }

    async eliminarCurso(idCurso) {
        return await Curso.findByIdAndDelete(idCurso);
    }

    /**
     * Obtiene todos los cursos creados por un maestro
     * @param {string} maestroId - ID del maestro
     */
    async obtenerCursosPorMaestro(maestroId) {
        return await Curso.find({ id_maestro: maestroId });
    }

    /**
     * Obtiene cursos por un array de IDs
     * @param {Array} cursoIds - Array de IDs de cursos
     */
    async obtenerCursosPorIds(cursoIds) {
        return await Curso.find({ _id: { $in: cursoIds } });
    }

    /**
     * Obtiene todos los cursos disponibles (públicos y privados)
     * @returns {Array} Lista de todos los cursos
     */
    async obtenerCursosDisponibles() {
        return await Curso.find({});
    }

}
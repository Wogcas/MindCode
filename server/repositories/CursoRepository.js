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
        return await Curso.findOne({ titulo: tituloCurso });
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

}
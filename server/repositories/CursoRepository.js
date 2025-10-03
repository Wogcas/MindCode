import { Curso } from "../entities/Curso.js";


class CursoRepository {
    constructor() { }

    async agregarCurso(curso) {
        const nuevoCurso = new Curso(curso);
        return await nuevoCurso.save();
    }

    async obtenerCursos() {
        return await Curso.find({});
    }

}

export default CursoRepository;
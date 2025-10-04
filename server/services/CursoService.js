import CursoRepository from "../repositories/CursoRepository.js";

export default class CursoService {

    constructor() {
        this.cursoRepo = new CursoRepository();
    }

    async agregarCurso(curso) {
        try {
            return await this.cursoRepo.agregarCurso(curso);
        } catch (error) {
            console.log('Service Error: While adding new Curso to the database');
        }
    }

    async obtenerCursos() {
        try {
            return await this.cursoRepo.obtenerCursos();
        } catch (error) {
            console.log('Service Error: While obtaining all the Cursos from the database');
        }
    }

    async obtenerCursoPorNombre(tituloCurso) {
        try {
            return await this.cursoRepo.obtenerCursoPorNombre(tituloCurso);
        } catch (error) {
            console.log('Service Error: While obtaining a Curso by name from the database');
        }
    }

    async obtenerCursoPorId(idCurso) {
        try {
            return await this.cursoRepo.obtenerCursoPorId(idCurso);
        } catch (error) {
            console.log('Service Error: While obtaining a Curso by Id from the database');
        }
    }

    async actualizarCurso(idCurso, cursoModificado) {
        try {
            return await this.cursoRepo.actualizarCurso(idCurso, cursoModificado)
        } catch (error) {
            console.log('Service Error: While updating a Curso from the database');
        }
    }

    async eliminarCurso(idCurso) {
        try {
            return await this.cursoRepo.eliminarCurso(idCurso);
        } catch (error) {
            console.log('Service Error: While deleting a Curso from the database');
        }
    }
}
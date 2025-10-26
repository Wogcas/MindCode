import CursoRepository from "../repositories/CursoRepository.js";
import { CursoAdapter } from "../utils/adapters/CursoAdapter.js";

export default class CursoService {

    constructor() {
        this.cursoRepo = new CursoRepository();
    }

    async agregarCurso(curso) {
        try {
            const cursoGuardado = await this.cursoRepo.agregarCurso(curso);
            return CursoAdapter.toDTO(cursoGuardado);
        } catch (error) {
            console.log('Service Error: While adding new Curso to the database');
            throw error;
        }
    }

    async obtenerCursos() {
        try {
            const cursos = await this.cursoRepo.obtenerCursos();
            return cursos.map(curso => CursoAdapter.toDTO(curso));
        } catch (error) {
            console.log('Service Error: While obtaining all the Cursos from the database');
            throw error;
        }
    }

    async obtenerCursoPorNombre(tituloCurso) {
        try {
            const cursos = await this.cursoRepo.obtenerCursoPorNombre(tituloCurso);
            return cursos.map(curso => CursoAdapter.toDTO(curso));
        } catch (error) {
            console.log('Service Error: While obtaining a Curso by name from the database');
            throw error;
        }
    }

    async obtenerCursoPorId(idCurso) {
        try {
            const curso = await this.cursoRepo.obtenerCursoPorId(idCurso);
            return CursoAdapter.toDTO(curso);
        } catch (error) {
            console.log('Service Error: While obtaining a Curso by Id from the database');
            throw error;
        }
    }

    async actualizarCurso(idCurso, cursoModificado) {
        try {
            const cursoActualizado = await this.cursoRepo.actualizarCurso(idCurso, cursoModificado);
            return CursoAdapter.toDTO(cursoActualizado);
        } catch (error) {
            console.log('Service Error: While updating a Curso from the database');
            throw error;
        }
    }

    async eliminarCurso(idCurso) {
        try {
            const cursoEliminado = await this.cursoRepo.eliminarCurso(idCurso);
            return CursoAdapter.toDTO(cursoEliminado);
        } catch (error) {
            console.log('Service Error: While deleting a Curso from the database');
            throw error;
        }
    }
}
import CursoRepository from "../repositories/CursoRepository.js";
import { CursoAdapter } from "../utils/adapters/CursoAdapter.js";
import { NotFoundError, ConflictError } from "../auth/errorHandler.js";

export default class CursoService {

    constructor() {
        this.cursoRepo = new CursoRepository();
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
        const cursoEliminado = await this.cursoRepo.eliminarCurso(idCurso);
        return CursoAdapter.toDTO(cursoEliminado);
    }
}
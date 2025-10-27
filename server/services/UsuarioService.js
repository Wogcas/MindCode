import UsuarioRepository from "../repositories/UsuarioRepository.js";
import { NotFoundError, ConflictError } from "../auth/errorHandler.js";

export default class UsuarioService {

    constructor() {
        this.usuarioRepo = new UsuarioRepository();
    }

    async agregarUsuario(usuario) {
        return await this.usuarioRepo.agregarUsuario(usuario);
    }

    async obtenerUsuario() {
        return await this.usuarioRepo.obtenerUsuario();
    }

    async obtenerUsuarioPorId(idUsuario) {
        const usuario = await this.usuarioRepo.obtenerUsuarioPorId(idUsuario);
        if (!usuario) {
            throw new NotFoundError(`Usuario con ID ${idUsuario} no encontrado`);
        }
        return usuario;
    }

    async obtenerUsuarioPorCorreo(correo) {
        return await this.usuarioRepo.obtenerUsuarioPorCorreo(correo);
    }

    async actualizarUsuario(idUsuario, usuarioModificado) {
        const usuario = await this.usuarioRepo.obtenerUsuarioPorId(idUsuario);
        if (!usuario) {
            throw new NotFoundError(`Usuario con ID ${idUsuario} no encontrado`);
        }
        return await this.usuarioRepo.actualizarUsuario(idUsuario, usuarioModificado);
    }

    async eliminarUsuario(idUsuario) {
        const usuario = await this.usuarioRepo.obtenerUsuarioPorId(idUsuario);
        if (!usuario) {
            throw new NotFoundError(`Usuario con ID ${idUsuario} no encontrado`);
        }
        return await this.usuarioRepo.eliminarUsuario(idUsuario);
    }

    async agregarCursoAProgreso(idUsuario, idCurso) {
        const usuario = await this.usuarioRepo.obtenerUsuarioPorId(idUsuario);
        if (!usuario) {
            throw new NotFoundError(`Usuario con ID ${idUsuario} no encontrado`);
        }
        return await this.usuarioRepo.agregarCursoAProgreso(idUsuario, idCurso);
    }

    async marcarLeccionCompletada(idUsuario, idCurso, idLeccion) {
        const usuario = await this.usuarioRepo.obtenerUsuarioPorId(idUsuario);
        if (!usuario) {
            throw new NotFoundError(`Usuario con ID ${idUsuario} no encontrado`);
        }
        return await this.usuarioRepo.marcarLeccionCompletada(idUsuario, idCurso, idLeccion);
    }

    async actualizarPorcentajeProgreso(idUsuario, idCurso, porcentaje) {
        const usuario = await this.usuarioRepo.obtenerUsuarioPorId(idUsuario);
        if (!usuario) {
            throw new NotFoundError(`Usuario con ID ${idUsuario} no encontrado`);
        }
        return await this.usuarioRepo.actualizarPorcentajeProgreso(idUsuario, idCurso, porcentaje);
    }

    async obtenerProgresoCursos(idUsuario) {
        const usuario = await this.usuarioRepo.obtenerUsuarioPorId(idUsuario);
        if (!usuario) {
            throw new NotFoundError(`Usuario con ID ${idUsuario} no encontrado`);
        }
        return await this.usuarioRepo.obtenerProgresoCursos(idUsuario);
    }

    async agregarCursoImpartido(idUsuario, idCurso, tituloCurso) {
        const usuario = await this.usuarioRepo.obtenerUsuarioPorId(idUsuario);
        if (!usuario) {
            throw new NotFoundError(`Usuario con ID ${idUsuario} no encontrado`);
        }
        return await this.usuarioRepo.agregarCursoImpartido(idUsuario, idCurso, tituloCurso);
    }

    async eliminarCursoImpartido(idUsuario, idCurso) {
        const usuario = await this.usuarioRepo.obtenerUsuarioPorId(idUsuario);
        if (!usuario) {
            throw new NotFoundError(`Usuario con ID ${idUsuario} no encontrado`);
        }
        return await this.usuarioRepo.eliminarCursoImpartido(idUsuario, idCurso);
    }

    async obtenerCursosImpartidos(idUsuario) {
        const usuario = await this.usuarioRepo.obtenerUsuarioPorId(idUsuario);
        if (!usuario) {
            throw new NotFoundError(`Usuario con ID ${idUsuario} no encontrado`);
        }
        return await this.usuarioRepo.obtenerCursosImpartidos(idUsuario);
    }

    async obtenerAlumnos() {
        return await this.usuarioRepo.obtenerAlumnos();
    }

    async obtenerMaestros() {
        return await this.usuarioRepo.obtenerMaestros();
    }

    async contarPorTipo() {
        return await this.usuarioRepo.contarPorTipo();
    }
}
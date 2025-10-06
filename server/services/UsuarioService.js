import UsuarioRepository from "../repositories/UsuarioRepository.js";

export default class UsuarioService {

    constructor() {
        this.usuarioRepo = new UsuarioRepository();
    }

    async agregarUsuario(usuario) {
        try {
            return await this.usuarioRepo.agregarUsuario(usuario);
        } catch (error) {
            console.log('Service Error: While adding a new Usuario to the database', error);
        }
    }

    async obtenerUsuario() {
        try {
            return await this.usuarioRepo.obtenerUsuario();
        } catch (error) {
            console.log('Service Error: While obtaining all Usuarios from the database', error);
        }
    }

    async obtenerUsuarioPorId(idUsuario) {
        try {
            return await this.usuarioRepo.obtenerUsuarioPorId(idUsuario);
        } catch (error) {
            console.log('Service Error: While obtaining a Usuario by ID from the database', error);
        }
    }

    async obtenerUsuarioPorCorreo(correo) {
        try {
            return await this.usuarioRepo.obtenerUsuarioPorCorreo(correo);
        } catch (error) {
            console.log('Service Error: While obtaining a Usuario by email from the database', error);
        }
    }

    async actualizarUsuario(idUsuario, usuarioModificado) {
        try {
            return await this.usuarioRepo.actualizarUsuario(idUsuario, usuarioModificado);
        } catch (error) {
            console.log('Service Error: While updating a Usuario in the database', error);
        }
    }

    async eliminarUsuario(idUsuario) {
        try {
            return await this.usuarioRepo.eliminarUsuario(idUsuario);
        } catch (error) {
            console.log('Service Error: While deleting a Usuario from the database', error);
        }
    }

    async agregarCursoAProgreso(idUsuario, idCurso) {
        try {
            return await this.usuarioRepo.agregarCursoAProgreso(idUsuario, idCurso);
        } catch (error) {
            console.log('Service Error: While adding a course to a student’s progress', error);
        }
    }

    async marcarLeccionCompletada(idUsuario, idCurso, idLeccion) {
        try {
            return await this.usuarioRepo.marcarLeccionCompletada(idUsuario, idCurso, idLeccion);
        } catch (error) {
            console.log('Service Error: While marking a lesson as completed', error);
        }
    }

    async actualizarPorcentajeProgreso(idUsuario, idCurso, porcentaje) {
        try {
            return await this.usuarioRepo.actualizarPorcentajeProgreso(idUsuario, idCurso, porcentaje);
        } catch (error) {
            console.log('Service Error: While updating progress percentage', error);
        }
    }

    async obtenerProgresoCursos(idUsuario) {
        try {
            return await this.usuarioRepo.obtenerProgresoCursos(idUsuario);
        } catch (error) {
            console.log('Service Error: While obtaining student’s course progress', error);
        }
    }

    async agregarCursoImpartido(idUsuario, idCurso, tituloCurso) {
        try {
            return await this.usuarioRepo.agregarCursoImpartido(idUsuario, idCurso, tituloCurso);
        } catch (error) {
            console.log('Service Error: While assigning a course to a teacher', error);
        }
    }

    async eliminarCursoImpartido(idUsuario, idCurso) {
        try {
            return await this.usuarioRepo.eliminarCursoImpartido(idUsuario, idCurso);
        } catch (error) {
            console.log('Service Error: While removing a course from a teacher', error);
        }
    }

    async obtenerCursosImpartidos(idUsuario) {
        try {
            return await this.usuarioRepo.obtenerCursosImpartidos(idUsuario);
        } catch (error) {
            console.log('Service Error: While obtaining teacher’s courses', error);
        }
    }

    async obtenerAlumnos() {
        try {
            return await this.usuarioRepo.obtenerAlumnos();
        } catch (error) {
            console.log('Service Error: While obtaining students from the database', error);
        }
    }

    async obtenerMaestros() {
        try {
            return await this.usuarioRepo.obtenerMaestros();
        } catch (error) {
            console.log('Service Error: While obtaining teachers from the database', error);
        }
    }

    async contarPorTipo() {
        try {
            return await this.usuarioRepo.contarPorTipo();
        } catch (error) {
            console.log('Service Error: While counting users by type', error);
        }
    }
}

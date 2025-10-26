import LeccionRepository from "../repositories/LeccionRepository.js";

export default class LeccionService {

    constructor() {
        this.leccionRepo = new LeccionRepository();
    }

    async agregarLeccion(leccion) {
        try {
            return await this.leccionRepo.agregarLeccion(leccion);
        } catch (error) {
            console.error('Service Error: While adding new Leccion to the database:', error.message);
            throw error;
        }
    }

    async obtenerLecciones() {
        try {
            return await this.leccionRepo.obtenerLecciones();
        } catch (error) {
            console.log('Service Error: While obtaining all the Lecciones from the database', error.message);
            throw error;
        }
    }

    async obtenerLeccionPorTitulo(tituloLeccion) {
        try {
            return await this.leccionRepo.obtenerLeccionPorTitulo(tituloLeccion);
        } catch (error) {
            console.log('Service Error: While obtaining a Leccion by name from the database', error.message);
            throw error;
        }
    }

    async obtenerLeccionPorId(idLeccion) {
        try {
            return await this.leccionRepo.obtenerLeccionPorId(idLeccion);
        } catch (error) {
            console.log('Service Error: While obtaining a Leccion by Id from the database', error.message);
            throw error;
        }
    }

    async actualizarLeccion(idLeccion, leccionModificado) {
        try {
            return await this.leccionRepo.actualizarLeccion(idLeccion, leccionModificado)
        } catch (error) {
            console.log('Service Error: While updating a Leccion from the database', error.message);
            throw error;
        }
    }

    async eliminarLeccion(idLeccion) {
        try {
            return await this.leccionRepo.eliminarLeccion(idLeccion);
        } catch (error) {
            console.log('Service Error: While deleting a Leccion from the database', error.message);
            throw error;
        }
    }
}
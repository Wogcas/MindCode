import LeccionRepository from "../repositories/LeccionRepository.js";

export default class LeccionService {

    constructor() {
        this.leccionRepo = new LeccionRepository();
    }

    async agregarLeccion(leccion) {
        try {
            return await this.leccionRepo.agregarLeccion(leccion);
        } catch (error) {
            console.log('Service Error: While adding new Leccion to the database');
        }
    }

    async obtenerLecciones() {
        try {
            return await this.leccionRepo.obtenerLecciones();
        } catch (error) {
            console.log('Service Error: While obtaining all the Lecciones from the database');
        }
    }

    async obtenerLeccionPorNombre(tituloLeccion) {
        try {
            return await this.leccionRepo.obtenerLeccionPorNombre(tituloLeccion);
        } catch (error) {
            console.log('Service Error: While obtaining a Leccion by name from the database');
        }
    }

    async obtenerLeccionPorId(idLeccion) {
        try {
            return await this.leccionRepo.obtenerLeccionPorId(idLeccion);
        } catch (error) {
            console.log('Service Error: While obtaining a Leccion by Id from the database');
        }
    }

    async actualizarLeccion(idLeccion, leccionModificado) {
        try {
            return await this.leccionRepo.actualizarLeccion(idLeccion, leccionModificado)
        } catch (error) {
            console.log('Service Error: While updating a Leccion from the database');
        }
    }

    async eliminarLeccion(idLeccion) {
        try {
            return await this.leccionRepo.eliminarLeccion(idLeccion);
        } catch (error) {
            console.log('Service Error: While deleting a Leccion from the database');
        }
    }
}
import LeccionRepository from "../repositories/LeccionRepository.js";
import { leccionAdapter } from "../utils/adapters/LeccionAdapter.js";

export default class LeccionService {

    constructor() {
        this.leccionRepo = new LeccionRepository();
    }

    async agregarLeccion(leccion) {
        try {
            const leccionGuardado = await this.leccionRepo.agregarLeccion(leccion);
            return leccionAdapter.toDTO(leccionGuardado);
        } catch (error) {
            console.error('Service Error: While adding new Leccion to the database:', error.message);
            throw error;
        }
    }

    async obtenerLecciones() {
        try {
            const leccionesObtenidas = await this.leccionRepo.obtenerLecciones();
            return leccionesObtenidas.map(leccion => leccionAdapter.toDTO(leccion));
        } catch (error) {
            console.log('Service Error: While obtaining all the Lecciones from the database', error.message);
            throw error;
        }
    }

    async obtenerLeccionPorTitulo(tituloLeccion) {
        try {
            const leccionesObtenidas = await this.leccionRepo.obtenerLeccionPorTitulo(tituloLeccion);
            return leccionesObtenidas.map(leccion => leccionAdapter.toDTO(leccion));
        } catch (error) {
            console.log('Service Error: While obtaining a Leccion by name from the database', error.message);
            throw error;
        }
    }

    async obtenerLeccionPorId(idLeccion) {
        try {
            const leccionObtenidas = await this.leccionRepo.obtenerLeccionPorId(idLeccion);
            return leccionAdapter.toDTO(leccionObtenidas);

        } catch (error) {
            console.log('Service Error: While obtaining a Leccion by Id from the database', error.message);
            throw error;
        }
    }

    async actualizarLeccion(idLeccion, leccionModificado) {
        try {
            const leccionActualizada = await this.leccionRepo.actualizarLeccion(idLeccion, leccionModificado);
            return leccionAdapter.toDTO(leccionActualizada);
        } catch (error) {
            console.log('Service Error: While updating a Leccion from the database', error.message);
            throw error;
        }
    }

    async eliminarLeccion(idLeccion) {
        try {
            const leccionEliminada = await this.leccionRepo.eliminarLeccion(idLeccion);
            return leccionAdapter.toDTO(leccionEliminada);
        } catch (error) {
            console.log('Service Error: While deleting a Leccion from the database', error.message);
            throw error;
        }
    }
}
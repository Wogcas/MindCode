import LeccionRepository from "../repositories/LeccionRepository.js";
import { leccionAdapter } from "../utils/adapters/LeccionAdapter.js";
import { NotFoundError } from "../auth/errorHandler.js";

export default class LeccionService {

    constructor() {
        this.leccionRepo = new LeccionRepository();
    }

    async agregarLeccion(leccion) {
        const leccionGuardado = await this.leccionRepo.agregarLeccion(leccion);
        return leccionAdapter.toDTO(leccionGuardado);
    }

    async obtenerLecciones() {
        const leccionesObtenidas = await this.leccionRepo.obtenerLecciones();
        return leccionesObtenidas.map(leccion => leccionAdapter.toDTO(leccion));
    }
    
    async obtenerLeccionesPorCurso(idCurso) {
        return await this.leccionRepo.obtenerLeccionesPorCurso(idCurso);
    }

    async obtenerLeccionPorTitulo(tituloLeccion) {
        const leccionesObtenidas = await this.leccionRepo.obtenerLeccionPorTitulo(tituloLeccion);
        if (!leccionesObtenidas || leccionesObtenidas.length === 0) {
            throw new NotFoundError(`No se encontraron lecciones con el título: ${tituloLeccion}`);
        }
        return leccionesObtenidas.map(leccion => leccionAdapter.toDTO(leccion));
    }

    async obtenerLeccionPorId(idLeccion) {
        const leccionObtenidas = await this.leccionRepo.obtenerLeccionPorId(idLeccion);
        if (!leccionObtenidas) {
            throw new NotFoundError(`Lección con ID ${idLeccion} no encontrada`);
        }
        return leccionAdapter.toDTO(leccionObtenidas);
    }

    async actualizarLeccion(idLeccion, leccionModificado) {
        const leccion = await this.leccionRepo.obtenerLeccionPorId(idLeccion);
        if (!leccion) {
            throw new NotFoundError(`Lección con ID ${idLeccion} no encontrada`);
        }
        const leccionActualizada = await this.leccionRepo.actualizarLeccion(idLeccion, leccionModificado);
        return leccionAdapter.toDTO(leccionActualizada);
    }

    async eliminarLeccion(idLeccion) {
        const leccion = await this.leccionRepo.obtenerLeccionPorId(idLeccion);
        if (!leccion) {
            throw new NotFoundError(`Lección con ID ${idLeccion} no encontrada`);
        }

        try {
            // 1. Importar modelo de Reto
            const { Reto } = await import('../entities/Reto.js');

            // 2. Eliminar todos los retos asociados a esta lección
            const result = await Reto.deleteMany({ lecciones: idLeccion });
            console.log(`Eliminados ${result.deletedCount} retos asociados a la lección ${idLeccion}`);

            // 3. Eliminar la lección
            const leccionEliminada = await this.leccionRepo.eliminarLeccion(idLeccion);
            
            console.log(`✅ Lección ${idLeccion} eliminada con integridad referencial`);
            return leccionAdapter.toDTO(leccionEliminada);

        } catch (error) {
            console.error('Error al eliminar lección con integridad referencial:', error);
            throw error;
        }
    }
}
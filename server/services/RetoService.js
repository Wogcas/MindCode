import RetoRepository from "../repositories/RetoRepository.js";
import LeccionRepository from "../repositories/LeccionRepository.js";

import { RetoAdapter } from "../utils/adapters/RetoAdapter.js";

import { NotFoundError, ConflictError } from "../auth/errorHandler.js";

export default class RetoService {
    constructor() {
        this.leccionRepo = new LeccionRepository(); 
        this.repository = new RetoRepository();
    }

    async crearReto(reto) {
        const retoExistente = await this.repository.obtenerRetoPorTitulo(reto.titulo);
        if (retoExistente) {
            throw new ConflictError(`Ya existe un reto con el título: ${reto.titulo}`);
        }
        
        const retoCreado = await this.repository.agregarReto(reto);

        return RetoAdapter.toDTO(retoCreado);
    }

    async modificarReto(idReto, retoModificado) {
        const reto = await this.repository.obtenerRetoPorId(idReto);
        if (!reto) {
            throw new NotFoundError(`Reto con ID ${idReto} no encontrado`);
        }
        const retoActualizado = await this.repository.actualizarReto(idReto, retoModificado);
        return RetoAdapter.toDTO(retoActualizado);
    }

    async eliminarReto(idReto) {
        const retoEliminado = await this.repository.eliminarReto(idReto);
        if (!retoEliminado) {
            throw new NotFoundError(`Reto con ID ${idReto} no encontrado`);
        }
        return { mensaje: `Reto '${retoEliminado.titulo}' eliminado exitosamente.` };
    }

    async obtenerTodosLosRetos() {

        const retos = await this.repository.obtenerRetos();

        return retos.map(RetoAdapter.toDTO);
    }

    async obtenerReto(idReto) {
        const reto = await this.repository.obtenerRetoPorId(idReto);
        if (!reto) {
            throw new NotFoundError(`Reto con ID ${idReto} no encontrado`);
        }
        return RetoAdapter.toDTO(reto);
    }

    async obtenerRetoPorTitulo(tituloReto) {
        const reto = await this.repository.obtenerRetoPorTitulo(tituloReto);
        if (!reto) {
            throw new NotFoundError(`No se encontró un reto con el título: ${tituloReto}`);
        }
        return RetoAdapter.toDTO(reto);
    }

    async obtenerRetosPorLeccion(idLeccion) {
        const leccionExiste = await this.leccionRepo.obtenerLeccionPorId(idLeccion);
        if (!leccionExiste) {
            throw new NotFoundError(`Lección con ID ${idLeccion} no encontrada`);
        }
        const retos = await this.repository.obtenerRetosPorLeccion(idLeccion);
        return retos.map(RetoAdapter.toDTO);
    }
}
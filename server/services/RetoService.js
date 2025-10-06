import RetoRepository from "../repositories/RetoRepository.js";
import LeccionRepository from "../repositories/LeccionRepository.js";

export default class RetoService {
    constructor() {
        this.leccionRepo = new LeccionRepository(); 
        this.repository = new RetoRepository();
    }

    async crearReto(reto) {
        const retoExistente = await this.repository.obtenerRetoPorTitulo(reto.titulo);
        if (retoExistente) {
            throw new Error(`Service Error: Already exists one reto with this title ${reto.titulo}.`);
        }
        return await this.repository.agregarReto(reto);
    }

    async modificarReto(idReto, retoModificado) {
        const reto = await this.repository.obtenerRetoPorId(idReto);
        if (!reto) {
            throw new Error(`Service Error: No found the reto with Id ${idReto}.`);
        }
        return await this.repository.actualizarReto(idReto, retoModificado);
    }

    async eliminarReto(idReto) {
        const retoEliminado = await this.repository.eliminarReto(idReto);
        if (!retoEliminado) {
            throw new Error(`Service Error: No found the reto with Id ${idReto} for eliminate.`);
        }
        return { mensaje: `Reto '${retoEliminado.titulo}' eliminado exitosamente.` };
    }

    async obtenerTodosLosRetos() {
        return await this.repository.obtenerRetos();
    }

    async obtenerReto(idReto) {
        const reto = await this.repository.obtenerRetoPorId(idReto);
        if (!reto) {
            throw new Error(`Service Error: No found the reto with Id  ${idReto}.`);
        }
        return reto;
    }

    async obtenerRetoPorTitulo(tituloReto) {
        const reto = await this.repository.obtenerRetoPorTitulo(tituloReto);
        if (!reto) {
            throw new Error(`Service Error: No found the reto with title ${tituloReto}.`);
        }
        return reto;
    }

    async obtenerRetosPorLeccion(idLeccion) {
        const leccionExiste = await this.leccionRepo.obtenerLeccionPorId(idLeccion);
        if (!leccionExiste) {
            throw new Error(`Service Error: No found the Leccion with Id ${idLeccion}.`);
        }
        return await this.repository.obtenerRetosPorLeccion(idLeccion);
    }
}
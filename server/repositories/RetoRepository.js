import { Reto } from "../entities/Reto.js";

export default class RetoRepository {

    constructor() { }

    async agregarReto(reto) {
        const nuevoReto = new Reto(reto);
        return await nuevoReto.save();
    }

    async actualizarReto(idReto, retoModificado) {
        return await Reto.findByIdAndUpdate(idReto, retoModificado, { new: true });
    }

    async eliminarReto(idReto) {
        return await Reto.findByIdAndDelete(idReto);
    }

    async obtenerRetoPorTitulo(tituloReto) {
        return await Reto.findOne({ titulo: tituloReto }).populate('lecciones');
    }

    async obtenerRetos() {
        return await Reto.find({}).populate('lecciones');
    }

    async obtenerRetoPorId(idReto) {
        return await Reto.findById(idReto).populate('lecciones');
    }
    
    async obtenerRetosPorLeccion(idLeccion) {
        return await Reto.find({ lecciones: idLeccion }).populate('lecciones');
    }
}
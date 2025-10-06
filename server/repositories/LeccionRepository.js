import { Leccion } from "../entities/Leccion.js";

export default class LeccionRepository {

    constructor() { }

    async agregarLeccion(leccion) {
        const nuevaLeccion = new Leccion(leccion);
        return await nuevaLeccion.save();
    }

    async obtenerLeccions() {
        return await Leccion.find({});
    }

    async obtenerLeccionPorNombre(tituloLeccion) {
        return await Leccion.findOne({ titulo: tituloLeccion });
    }

    async obtenerLeccionPorId(idLeccion) {
        return await Leccion.findById(idLeccion);
    }

    async actualizarLeccion(idLeccion, leccionModificado) {
        return await Leccion.findByIdAndUpdate(idLeccion, leccionModificado, { new: true });
    }

    async eliminarLeccion(idLeccion) {
        return await Leccion.findByIdAndDelete(idLeccion);
    }

}
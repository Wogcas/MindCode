import { Leccion } from "../entities/Leccion.js";

export default class LeccionRepository {

    constructor() { }

    async agregarLeccion(leccion) {
        const nuevaLeccion = new Leccion(leccion);
        return await nuevaLeccion.save();
    }

    async obtenerLecciones() {
        return await Leccion.find({});
    }

    async obtenerLeccionPorTitulo(tituloLeccion) {
        return await Leccion.find({ titulo: tituloLeccion });
    }

    async obtenerLeccionPorId(idLeccion) {
        return await Leccion.findById(idLeccion);
    }

    async actualizarLeccion(idLeccion, leccionModificada) {
        return await Leccion.findByIdAndUpdate(idLeccion, leccionModificada, { new: true });
    }

    async eliminarLeccion(idLeccion) {
        return await Leccion.findByIdAndDelete(idLeccion);
    }

}
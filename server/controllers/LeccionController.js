import LeccionService from "../services/LeccionService.js";

export default class LeccionController {
    constructor() {
        this.leccionService = new LeccionService();
    }

    agregarLeccion = async (req, res) => {
        const leccion = await this.leccionService.agregarLeccion(req.body);
        res.status(201).json({ success: true, data: leccion });
    }

    obtenerLecciones = async (req, res) => {
        const lecciones = await this.leccionService.obtenerLecciones();
        res.status(200).json({ success: true, data: lecciones });
    }

    obtenerLeccionesPorTitulo = async (req, res) => {
        const lecciones = await this.leccionService.obtenerLeccionPorTitulo(req.params.titulo);
        res.status(200).json({ success: true, data: lecciones });
    }

    obtenerLeccionesPorId = async (req, res) => {
        const leccion = await this.leccionService.obtenerLeccionPorId(req.params.id);
        res.status(200).json({ success: true, data: leccion });
    }

    actualizarLeccion = async (req, res) => {
        const leccion = await this.leccionService.actualizarLeccion(req.params.id, req.body);
        res.status(200).json({ 
            success: true, 
            message: 'Lección actualizada exitosamente', 
            data: leccion 
        });
    }

    eliminarLeccion = async (req, res) => {
        const leccion = await this.leccionService.eliminarLeccion(req.params.id);
        res.status(200).json({ 
            success: true, 
            message: 'Lección eliminada exitosamente', 
            data: leccion 
        });
    }
}
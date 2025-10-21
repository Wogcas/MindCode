import LeccionService from "../services/LeccionService.js"

const leccionService = new LeccionService();

export default class LeccionController {

    agregarLeccion = async (req, res) => {
        const datosLeccion = req.body;
        try {
            const nuevaLeccion = await leccionService.agregarLeccion(datosLeccion);
            if (!nuevaLeccion) {
                return res.status(400).json({ message: 'Error: No hay leccion para registrar.' })
            }
            res.status(201).json(nuevaLeccion);

        } catch (error) {
            console.error('Controller Error:', error);
            res.status(500).json({
                message: 'Controller Error: While adding new Leccion to the database',
                error: error.message
            });

        }
    }

    obtenerLecciones = async (req, res) => {
        try {
            const lecciones = await leccionService.obtenerLecciones();
            return res.status(200).json(lecciones);
        } catch (error) {
            console.error('Controller Error:', error);
            res.status(500).json({
                message: 'Controller Error: Al intentar obtener lecciones',
                error: error.message
            });
        }
    }

    obtenerLeccionesPorId = async (req, res) => {
        const id = req.params.id;
        try {
            const leccionPorIdObtendida = await leccionService.obtenerLeccionPorId(id);
            if (!leccionPorIdObtendida) {
                return res.status(404).json({ message: 'Error: No se encontró la leccion' });
            }
            return res.status(200).json(leccionPorIdObtendida);
        } catch (error) {
            console.error('Controller Error:', error);
            res.status(500).json({
                message: 'Controller Error: Al intentar obtener leccion por id',
                error: error.message
            });
        }
    }

    obtenerLeccionesPorNombre = async (req, res) => {
        const nombre = req.params.nombre;
        try {
            const leccionesPorNombreObtendida = await leccionService.obtenerLeccionPorNombre(nombre);
            if (!leccionesPorNombreObtendida || leccionesPorNombreObtendida.length === 0) {
                return res.status(404).json({ message: 'No se encontraron lecciones con ese nombre' });
            }
            return res.status(200).json(leccionesPorNombreObtendida);
        } catch (error) {
            console.error('Controller Error:', error);
            res.status(500).json({
                message: 'Controller Error: Al intentar obtener lecciones por nombre',
                error: error.message
            });
        }
    }

    actualizarLeccion = async (req, res) => {
        const id = req.params.id;
        const dataLeccion = req.body;
        try {
            const leccionActualizada = await leccionService.actualizarLeccion(id, dataLeccion);
            if (!leccionActualizada) {
                return res.status(404).json({ message: 'Error: No se encontró la leccion para actualizar' });
            }
            return res.status(200).json(leccionActualizada);
        } catch (error) {
            console.error('Controller Error:', error);
            res.status(500).json({
                message: 'Controller Error: Al intentar actualizar leccion',
                error: error.message
            });
        }
    }

    eliminarLeccion = async (req, res) => {
        const id = req.params.id;
        try {
            await leccionService.eliminarLeccion(id);
            return res.status(200).json({ message: "Leccion eliminada exitosamente" });
        } catch (error) {
            console.error('Controller Error:', error);
            res.status(500).json({
                message: 'Controller Error: Al intentar eliminar leccion',
                error: error.message
            });
        }
    }



}
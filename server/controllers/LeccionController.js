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

}
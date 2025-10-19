import CursoService from "../services/CursoService.js";

const cursoService = new CursoService();

export default class CursoController {

    agregarCurso = async (req, res) => {
        const datosCurso = req.body;
        try {
            const nuevoCurso = await cursoService.agregarCurso(datosCurso);
            if (!nuevoCurso) {
                return res.status(400).json({ message: 'Error: No se pudo agregar el curso' });
            }
            res.status(201).json(nuevoCurso);
        } catch (error) {
            console.error('Controller Error:', error);
            res.status(500).json({
                message: 'Controller Error: While adding new Curso to the database',
                error: error.message
            });
        }
    }

}
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
                message: 'Controller Error: Al intentar agregar el curso',
                error: error.message
            });
        }
    }

    obtenerCursos = async (req, res) => {
        try {
            const cursos = await cursoService.obtenerCursos();
            return res.status(200).json(cursos);
        } catch (error) {
            console.error('Controller Error:', error);
            res.status(500).json({
                message: 'Controller Error: Al intentar obtener cursos',
                error: error.message
            });
        }
    }

    obtenerCursoPorId = async (req, res) => {
        const id = req.params.id;
        try {
            const cursoObtenido = await cursoService.obtenerCursoPorId(id);
            if (!cursoObtenido) {
                return res.status(404).json({ message: 'Error: No se encontró el curso' });
            }
            return res.status(200).json(cursoObtenido);
        } catch (error) {
            console.error('Controller Error:', error);
            res.status(500).json({
                message: 'Controller Error: Al intentar obtener curso por id',
                error: error.message
            });
        }
    }

    obtenerCursoPorNombre = async (req, res) => {
        const termino = req.params.nombre;
        try {
            // Coincidencia parcial (ej: "nom" encuentra "nombre")
            const cursos = await cursoService.obtenerCursoPorNombre(termino);
            if (!cursos || cursos.length === 0) {
                return res.status(404).json({ message: 'No se encontraron cursos con ese nombre' });
            }
            return res.status(200).json(cursos);
        } catch (error) {
            console.error('Controller Error:', error);
            res.status(500).json({
                message: 'Controller Error: Al intentar obtener curso por nombre',
                error: error.message
            });
        }
    }

    actualizarCurso = async (req, res) => {
        const id = req.params.id;
        const dataCurso = req.body;
        try {
            const cursoActualizado = await cursoService.actualizarCurso(id, dataCurso);
            if (!cursoActualizado) {
                return res.status(404).json({ message: 'Error: No se encontró el curso para actualizar' });
            }
            return res.status(200).json(cursoActualizado);
        } catch (error) {
            console.error('Controller Error:', error);
            res.status(500).json({
                message: 'Controller Error: Al intentar actualizar curso',
                error: error.message
            });
        }
    }

    eliminarCurso = async (req, res) => {
        const id = req.params.id;
        try {
            await cursoService.eliminarCurso(id);
            return res.status(200).json({ message: "Curso eliminado exitosamente" });
        } catch (error) {
            console.error('Controller Error:', error);
            res.status(500).json({
                message: 'Controller Error: Al intentar eliminar curso',
                error: error.message
            });
        }
    }

}
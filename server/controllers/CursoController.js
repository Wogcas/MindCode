import CursoService from "../services/CursoService.js";

export default class CursoController {
    constructor() {
        this.cursoService = new CursoService();
    }

    agregarCurso = async (req, res) => {
        const curso = await this.cursoService.agregarCurso(req.body);
        res.status(201).json({ success: true, data: curso });
    }

    obtenerCursos = async (req, res) => {
        const cursos = await this.cursoService.obtenerCursos();
        res.status(200).json({ success: true, data: cursos });
    }

    obtenerCursoPorNombre = async (req, res) => {
        const cursos = await this.cursoService.obtenerCursoPorNombre(req.params.nombre);
        res.status(200).json({ success: true, data: cursos });
    }

    obtenerCursoPorId = async (req, res) => {
        const curso = await this.cursoService.obtenerCursoPorId(req.params.id);
        res.status(200).json({ success: true, data: curso });
    }

    actualizarCurso = async (req, res) => {
        const curso = await this.cursoService.actualizarCurso(req.params.id, req.body);
        res.status(200).json({ success: true, message: 'Curso actualizado exitosamente', data: curso });
    }

    eliminarCurso = async (req, res) => {
        const curso = await this.cursoService.eliminarCurso(req.params.id);
        res.status(200).json({ success: true, message: 'Curso eliminado exitosamente', data: curso });
    }

    obtenerCursosMaestro = async (req, res) => {
        const cursos = await this.cursoService.obtenerCursosPorMaestro(req.usuario.id);
        res.status(200).json({ success: true, data: cursos });
    }

    obtenerCursosAlumno = async (req, res) => {
        const cursos = await this.cursoService.obtenerCursosPorAlumno(req.usuario.id);
        res.status(200).json({ success: true, data: cursos });
    }

    obtenerCursosDisponibles = async (req, res) => {
        const cursos = await this.cursoService.obtenerCursosDisponibles();
        res.status(200).json({ success: true, data: cursos });
    }

    inscribirAlumno = async (req, res) => {
        const { cursoId } = req.body;
        if (!cursoId) {
            return res.status(400).json({ success: false, message: 'El ID del curso es requerido' });
        }
        const resultado = await this.cursoService.inscribirAlumno(req.usuario.id, cursoId);
        res.status(200).json({ success: true, message: 'Te has inscrito exitosamente al curso', data: resultado });
    }

    obtenerCursoConParticipantes = async (req, res) => {
        const curso = await this.cursoService.obtenerCursoConParticipantes(req.params.id);
        res.status(200).json({ success: true, data: curso });
    }
}
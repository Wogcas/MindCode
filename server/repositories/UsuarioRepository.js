import { Usuario  } from "../entities/Usuario.js";
import { ForbiddenError, ConflictError, ValidationError } from "../auth/errorHandler.js";

export default class UsuarioReporsitory{
    constructor(){}

    //Operaciones basicas CRUD

    async agregarUsuario(usuario){
        const nuevoUsuario = new Usuario(usuario);
        return await nuevoUsuario.save();
    }

    async obtenerUsuario(){
        return await Usuario.find({});
    }

    async obtenerUsuarioPorId(idUsuario){
        return await Usuario.findById(idUsuario);
    }
    
    async obtenerUsuarioPorCorreo(correo){
        return await Usuario.findOne({correo: correo.toLowerCase()})
    }

    async actualizarUsuario(idUsuario, usuarioModificado){
        return await Usuario.findByIdAndUpdate(idUsuario, usuarioModificado, {new: true});

    }
    async eliminarUsuario(idUsuario){
        return await Usuario.findByIdAndDelete(idUsuario);
    }


    /*Operaciónes solo para los Alumnos*/

    async agregarCursoAProgreso(idUsuario, idCurso){
        const usuario = await Usuario.findById(idUsuario);
        
        if (usuario.tipo !== 'Alumno') {
            throw new ForbiddenError('Esta operación es solo para alumnos');
        }

        const cursoExiste = usuario.progreso_cursos.some(
            curso => curso.id_curso.toString() === idCurso
        );

        if (cursoExiste) {
            throw new ConflictError('El curso ya está en progreso');
        }

        usuario.progreso_cursos.push({
            id_curso: idCurso,
            porcentaje: 0,
            lecciones_completadas: []
        });

        return await usuario.save();
    
    }
    async marcarLeccionCompletada(idUsuario, idCurso, idLeccion) {
        const usuario = await Usuario.findById(idUsuario);

        if (usuario.tipo !== 'Alumno') {
            throw new ForbiddenError('Esta operación es solo para alumnos');
        }

        const progresoCurso = usuario.progreso_cursos.find(
            curso => curso.id_curso.toString() === idCurso
        );

        if (!progresoCurso) {
            throw new ConflictError('El curso no está en progreso');
        }

        const leccionYaCompletada = progresoCurso.lecciones_completadas.some(
            leccion => leccion.toString() === idLeccion
        );

        if (!leccionYaCompletada) {
            progresoCurso.lecciones_completadas.push(idLeccion);
        }

        return await usuario.save();
    }
    async actualizarPorcentajeProgreso(idUsuario, idCurso, porcentaje) {
        if (porcentaje < 0 || porcentaje > 100) {
            throw new ValidationError('El porcentaje debe estar entre 0 y 100');
        }

        const usuario = await Usuario.findById(idUsuario);

        if (usuario.tipo !== 'Alumno') {
            throw new ForbiddenError('Esta operación es solo para alumnos');
        }

        const progresoCurso = usuario.progreso_cursos.find(
            curso => curso.id_curso.toString() === idCurso
        );

        if (!progresoCurso) {
            throw new ConflictError('El curso no está en progreso'); 
        }
        progresoCurso.porcentaje = porcentaje;
        return await usuario.save();
    }

    async obtenerProgresoCursos(idUsuario) {
        const usuario = await Usuario.findById(idUsuario);

        if (usuario.tipo !== 'Alumno') {
            throw new ForbiddenError('Esta operación es solo para alumnos');
        }

        return usuario.progreso_cursos;
    }

    /* Operaciones solo para maestro */
    async agregarCursoImpartido(idUsuario, idCurso, tituloCurso) {
        const usuario = await Usuario.findById(idUsuario);

        if (usuario.tipo !== 'Maestro') {
            throw new ForbiddenError('Esta operación es solo para maestros');
        }

        const cursoExiste = usuario.cursos_impartidos.some(
            curso => curso.id_curso.toString() === idCurso
        );

        if (cursoExiste) {
            throw new ConflictError('El curso ya está asignado a este maestro');
        }

        usuario.cursos_impartidos.push({
            id_curso: idCurso,
            titulo_curso: tituloCurso
        });

        return await usuario.save();
    }

    async eliminarCursoImpartido(idUsuario, idCurso) {
        const usuario = await Usuario.findById(idUsuario);

        if (usuario.tipo !== 'Maestro') {
            throw new ForbiddenError('Esta operación es solo para maestros');
        }
        usuario.cursos_impartidos = usuario.cursos_impartidos.filter(
            curso => curso.id_curso.toString() !== idCurso
        );

        return await usuario.save();
    }

    async obtenerCursosImpartidos(idUsuario) {
        const usuario = await Usuario.findById(idUsuario);

        if (usuario.tipo !== 'Maestro') {
            throw new ForbiddenError('Esta operación es solo para maestros');
        }

        return usuario.cursos_impartidos;
    }

    async obtenerAlumnos() {
        return await Usuario.find({ tipo: 'Alumno' });
    }

    async obtenerMaestros() {
        return await Usuario.find({ tipo: 'Maestro' });
    }

    async contarPorTipo() {
        const totalAlumnos = await Usuario.countDocuments({ tipo: 'Alumno' });
        const totalMaestros = await Usuario.countDocuments({ tipo: 'Maestro' });
        
        return {
            alumnos: totalAlumnos,
            maestros: totalMaestros,
            total: totalAlumnos + totalMaestros
        };
    }

    async contarAlumnosPorCurso(cursoId) {
        return await Usuario.countDocuments({
            tipo: 'Alumno',
            'progreso_cursos.id_curso': cursoId
        });
    }
}
import mongoose from "mongoose";
import { connectToDatabase } from "./database/connection.js";
import { Curso } from "./entities/Curso.js";
import { Leccion } from "./entities/Leccion.js";
import CursoService from "./services/CursoService.js";
import { Usuario } from "./entities/Usuario.js";
import UsuarioService from "./services/UsuarioService.js";
import UsuarioReporsitory from "./repositories/UsuarioRepository.js";
import LeccionService from "./services/LeccionService.js";


async function runTest() {
    await connectToDatabase();

    const usuarioService = new UsuarioService();
    const cursoServicio = new CursoService();
    const leccionService = new LeccionService();


    //const cursoServicio = new CursoService();

    const curso1 = new Curso({
        titulo: 'Curso de principios de React',
        descripcion: 'Este curso esta hecho con la finalidad de dar las oportunidades y herramientas de la libreria de React js...',
        id_maestro: '65147a75c13e61883b23e1aA',
    });

    // IDs de ejemplo para las pruebas
    const idCursoPrueba = new mongoose.Types.ObjectId();
    const idLeccionPrueba = new mongoose.Types.ObjectId();

    // Datos de ejemplo
    const alumno1 = {
        nombre: 'Juan Pérez García',
        correo: 'juan.perez@ejemplo.com',
        contrasena: 'password123',
        tipo: 'Alumno'
    };

    const maestro1 = {
        nombre: 'María López Hernández',
        correo: 'maria.lopez@ejemplo.com',
        contrasena: 'password456',
        tipo: 'Maestro'
    };



    const leccion1 = new Leccion({
        titulo: 'Leccion 2',
        descripcion: 'Por que usar React',
        fecha_creacion: new Date(),
        multimedia: [{
            titulo: 'Video leccion para aprender que es REACT',
            URL: "https://youtu.be/kEMr0rFjB7E?si=RjuIRiHUgQJMOA-x"
        }],
        id_curso: '65147a75c13e61883b23e1aa',
    });


    try {
        // ------  TEST PARA LECCION ------
        // const resultado = await leccionService.agregarLeccion(leccion1);
        // console.log(`Se agrego correctamente la leccion ${resultado}`);

        // const resultados = await leccionService.obtenerLecciones();
        // console.log(`Las lecciones registradas: ${resultados}`);

        // const resultado = await leccionService.obtenerLeccionPorNombre("Leccion 1");
        // console.log(`La leccion buscada es: ${resultado}`);

        // const resultado = await leccionService.obtenerLeccionPorId('68e3629e9e2b734df0a2c2a4');
        // console.log(`La leccion con el id es: ${resultado}`);

        // const resultado = await leccionService.actualizarLeccion('68e369f07d58de85583aa1f8', leccionActualizada);
        // console.log(`La leccion modificada: ${resultado}`);

        // const resultado = await leccionService.eliminarLeccion('68e367ce06822685686fca13');
        // console.log(`La leccion eliminada: ${resultado}`);


        // ------------------------------

        // AHORA TODOS LOS TEST SON CON LOS SERVICIOS

        // TEST CON CREAR UN CURSO
        //const resultado = await cursoRepo.agregarCurso(curso1);
        //console.log('Se ha agregado correctamente el curso:', resultado);

        // TEST CON OBTENER CURSOS
        // const resultadoCurso = await cursoRepo.obtenerCursos();
        // console.log('Estos son los cursos registrados en MindCode', resultadoCurso);

        // TEST CON OBTENER UN CURSO POR ID
        // const resultado = await cursoRepo.obtenerCursoPorId('68df4146500e1781f72810ba');
        // console.log('Este es el cursito que te encontramos mi apa', resultado)

        // TEST CON OBTENER CURSO POR NOMBRE
        // const resultado = await cursoRepo.obtenerCursoPorNombre('Curso de Modelado de Suelos para el Sebas');
        // console.log('Este resultado hace match con tu busqueda', resultado);

        // TEST CON ACTUALIZAR CURSO
        // const resultado = await cursoRepo.actualizarCurso(idCurso, cursoModificado);
        // console.log('Se ha actualizado correctamente el curso', resultado);

        // TEST CON ELIMINAR UN CURSO POR ID
        // await cursoRepo.eliminarCurso('68df73b2d18c34da2e6954bb');
        // console.log('Se ha eliminado el curso correctamente');

        /*========= Pruebas de Usuario ==========*/

        // TEST 1: AGREGAR UN ALUMNO
        // const resultadoAlumno = await usuarioRepo.agregarUsuario(alumno1);
        //console.log('Alumno agregado:', resultadoAlumno);

        // TEST 2: AGREGAR UN MAESTRO
        //const resultadoMaestro = await usuarioRepo.agregarUsuario(maestro1);
        //console.log('Maestro agregado:', resultadoMaestro);

        // TEST 3: OBTENER TODOS LOS USUARIOS 
        //const resultado = await usuarioRepo.obtenerAlumnos();
        //console.log('Usuarios registrados:', resultado);

        // TEST 4: OBTENER USUARIO POR CORREO
        const usuarioPorCorreo = await usuarioService.obtenerUsuarioPorCorreo('juan.perez@ejemplo.com');
        console.log('Usuario encontrado por correo:', usuarioPorCorreo);

        // TEST 5: ACTUALIZAR USUARIO
        //const usuarioModificado = { nombre: 'Juan Pérez García (Actualizado)' };
        //const usuarioActualizado = await usuarioService.actualizarUsuario(usuarioPorCorreo._id, usuarioModificado);
        //console.log('Usuario actualizado:', usuarioActualizado);

        // TEST 6: AGREGAR CURSO A PROGRESO (solo si es alumno)
        //const usuarioConProgreso = await usuarioService.agregarCursoAProgreso(usuarioPorCorreo._id, idCursoPrueba);
        //console.log('Curso agregado al progreso:', usuarioConProgreso);

        // TEST 7: MARCAR LECCIÓN COMPLETADA
        //const leccionCompletada = await usuarioService.marcarLeccionCompletada(usuarioPorCorreo._id, idCursoPrueba, idLeccionPrueba);
       // console.log('Lección completada:', leccionCompletada);

        // TEST 8: ACTUALIZAR PORCENTAJE DE PROGRESO
        //const progresoActualizado = await usuarioService.actualizarPorcentajeProgreso(usuarioPorCorreo._id, idCursoPrueba, 75);
        //console.log('Porcentaje actualizado:', progresoActualizado);

        // TEST 9: AGREGAR CURSO IMPARTIDO (solo si es maestro)
        //const maestro = await usuarioService.obtenerUsuarioPorCorreo('maria.lopez@ejemplo.com');
        //const cursoImpartido = await usuarioService.agregarCursoImpartido(maestro._id, idCursoPrueba, 'Curso de Introducción a React');
        //console.log('Curso impartido agregado:', cursoImpartido);

        // TEST 10: CONTAR USUARIOS POR TIPO
        //const conteo = await usuarioService.contarPorTipo();
        //console.log('Conteo de usuarios por tipo:', conteo);


    } catch (error) {
        console.error('Error durante la operacion', error);
    } finally {
        await mongoose.disconnect();
        console.log("Conexion cerrada despues del test.");
    }
}

runTest();
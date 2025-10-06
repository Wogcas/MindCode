import mongoose from "mongoose";
import { connectToDatabase } from "./database/connection.js";
import { Curso } from "./entities/Curso.js";
import { Leccion } from "./entities/Leccion.js";
import CursoService from "./services/CursoService.js";
import { Usuario } from "./entities/Usuario.js";
import UsuarioReporsitory from "./repositories/UsuarioRepository.js";
import LeccionService from "./services/LeccionService.js";


async function runTest() {
    await connectToDatabase();

    const usuarioRepo = new UsuarioReporsitory();
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
    const alumno1 = new Usuario({
        nombre: 'Juan Pérez García',
        correo: 'juan.perez@ejemplo.com',
        contrasena: 'password123',
        tipo: 'Alumno'
    });


    const maestro1 = new Usuario({
        nombre: 'María López Hernández',
        correo: 'maria.lopez@ejemplo.com',
        contrasena: 'password456',
        tipo: 'Maestro'
    });




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
         const resultado = await cursoRepo.agregarCurso(curso1);
         console.log('Se ha agregado correctamente el curso:', resultado);

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
         const resultadoAlumno = await usuarioRepo.agregarUsuario(alumno1);
         console.log('Alumno agregado:', resultadoAlumno);
 
         // TEST 2: AGREGAR UN MAESTRO
         //const resultadoMaestro = await usuarioRepo.agregarUsuario(maestro1);
         //console.log('Maestro agregado:', resultadoMaestro);
 
         // TEST 3: OBTENER TODOS LOS USUARIOS 
          //const resultado = await usuarioRepo.obtenerAlumnos();
          //console.log('Usuarios registrados:', resultado);
 
         // TEST 4: OBTENER USUARIO POR ID
         //const resultado = await usuarioRepo.obtenerUsuarioPorId('68e374d6f741c2d5903d7cdf');

         //console.log('Usuario encontrado:', resultado);
 
         // TEST 5: OBTENER USUARIO POR CORREO
         //const resultado = await usuarioRepo.obtenerUsuarioPorCorreo('juan.perez@ejemplo.com');
         //console.log('Usuario encontrado por correo:', resultado);
 
         // TEST 6: ACTUALIZAR USUARIO
         //const usuarioModificado = { nombre: 'Juan Pérez García (Actualizado)' };
         //const resultado = await usuarioRepo.actualizarUsuario('68e374d6f741c2d5903d7cde', usuarioModificado);
         //console.log('Usuario actualizado:', resultado);
 
         // TEST 7: AGREGAR CURSO A PROGRESO (ALUMNO)
          //const resultadoUsuario = await usuarioRepo.agregarCursoAProgreso('68e374d6f741c2d5903d7cde', curso1);
          //console.log('Curso agregado al progreso:', resultadoUsuario);
 
         // TEST 8: MARCAR LECCIÓN COMPLETADA
         // const resultado = await usuarioRepo.marcarLeccionCompletada('68e374d6f741c2d5903d7cde', idCursoPrueba, idLeccionPrueba);
         // console.log('Lección marcada como completada:', resultado);
 
         // TEST 9: ACTUALIZAR PORCENTAJE DE PROGRESO
         // const resultado = await usuarioRepo.actualizarPorcentajeProgreso('68e374d6f741c2d5903d7cde', idCursoPrueba, 35);
         // console.log('Porcentaje actualizado:', resultado);
 
         // TEST 10: AGREGAR CURSO IMPARTIDO (MAESTRO)
         // const resultado = await usuarioRepo.agregarCursoImpartido('ID_MAESTRO', idCursoPrueba, 'Introducción a JavaScript');
         // console.log('Curso impartido agregado:', resultado);
 
         // TEST 11: OBTENER SOLO ALUMNOS
         // const resultado = await usuarioRepo.obtenerAlumnos();
         // console.log('Alumnos registrados:', resultado);
 
         // TEST 12: OBTENER SOLO MAESTROS
         // const resultado = await usuarioRepo.obtenerMaestros();
         // console.log('Maestros registrados:', resultado);
 
         // TEST 13: CONTAR USUARIOS POR TIPO
         // const resultado = await usuarioRepo.contarPorTipo();
         // console.log('Estadísticas de usuarios:', resultado);
 
         // TEST 14: OBTENER PROGRESO DE CURSOS
         // const resultado = await usuarioRepo.obtenerProgresoCursos('ID_ALUMNO');
         // console.log('Progreso de cursos:', resultado);
 
         // TEST 15: OBTENER CURSOS IMPARTIDOS
         // const resultado = await usuarioRepo.obtenerCursosImpartidos('ID_MAESTRO');
         // console.log('Cursos impartidos:', resultado);
 
         // TEST 16: ELIMINAR USUARIO
         // await usuarioRepo.eliminarUsuario('AQUI_TU_ID');
         // console.log('Usuario eliminado correctamente');
    } catch (error) {
        console.error('Error durante la operacion', error);
    } finally {
        await mongoose.disconnect();
        console.log("Conexion cerrada despues del test.");
    }
}

runTest();
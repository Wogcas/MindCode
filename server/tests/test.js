import mongoose from "mongoose";
import { connectToDatabase } from "../database/connection.js";
import { Curso } from "../entities/Curso.js";
import { Leccion } from "../entities/Leccion.js";
import CursoService from "../services/CursoService.js";
import { Usuario } from "../entities/Usuario.js";
import UsuarioService from "../services/UsuarioService.js";
import UsuarioReporsitory from "../repositories/UsuarioRepository.js";
import LeccionService from "../services/LeccionService.js";
import RetoService from "../services/RetoService.js";


async function runTest() {
    await connectToDatabase();

    const usuarioService = new UsuarioService();
    const cursoServicio = new CursoService();
    const leccionService = new LeccionService();
    const retoService = new RetoService();


    //const cursoServicio = new CursoService();

    const curso1 = new Curso({
        titulo: 'Curso de principios de Chema',
        descripcion: 'Este curso esta hecho con la finalidad de dar las oportunidades y herramientas de la libreria de React js...',
        id_maestro: '68e374d6f741c2d5903d7cdf',
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

    const retoData = {
        titulo: 'Reto de Algoritmos Básicos',
        descripcion: 'Un reto para practicar lógica de programación.',
        preguntas: [
            {
                contenido: '¿Cuanto es 1+1?', tipo: 'opcion_multiple',
                respuestas: [
                    { contenido: "5", esCorrecta: false },
                    { contenido: "4", esCorrecta: false },
                    { contenido: "2", esCorrecta: true }
                ]
            },
            { contenido: '¿`const` permite reasignación?', tipo: 'verdadero_falso', respuestas: [{ contenido: 'Falso', esCorrecta: true }] }
        ],
        lecciones: []
    };

    try {
        /*========= Pruebas de Leccion ==========*/
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

        // ------------------------------

        /*========= Pruebas de Curso ==========*/

        // TEST CON CREAR UN CURSO
        const resultadoCurso = await cursoServicio.agregarCurso(curso1);
        console.log('Se ha agregado correctamente el curso');

        // TEST CON OBTENER CURSOS
        // const resultadoCurso = await cursoServicio.obtenerCursos();
        // console.log('Estos son los cursos registrados en MindCode', resultadoCurso);

        // TEST CON OBTENER UN CURSO POR ID
        // const resultado = await cursoServicio.obtenerCursoPorId('68df4146500e1781f72810ba');
        // console.log('Este es el cursito que te encontramos mi apa', resultado)

        // TEST CON OBTENER CURSO POR NOMBRE
        // const resultado = await cursoServicio.obtenerCursoPorNombre('Curso de Modelado de Suelos para el Sebas');
        // console.log('Este resultado hace match con tu busqueda', resultado);

        // TEST CON ACTUALIZAR CURSO
        // const resultado = await cursoServicio.actualizarCurso(idCurso, cursoModificado);
        // console.log('Se ha actualizado correctamente el curso', resultado);

        // TEST CON ELIMINAR UN CURSO POR ID
        // await cursoRepo.eliminarCurso('68df73b2d18c34da2e6954bb');
        // console.log('Se ha eliminado el curso correctamente');

        /*========= Pruebas de Usuario ==========*/

        // TEST 1: AGREGAR UN ALUMNO

        // const resultadoAlumno = await usuarioRepo.agregarUsuario(alumno1);

        //const resultadoAlumno = await usuarioRepo.agregarUsuario(alumno1);

        //console.log('Alumno agregado:', resultadoAlumno);

        // TEST 2: AGREGAR UN MAESTRO
        //const resultadoMaestro = await usuarioRepo.agregarUsuario(maestro1);
        //console.log('Maestro agregado:', resultadoMaestro);

        // TEST 3: OBTENER TODOS LOS USUARIOS 

        //const resultado = await usuarioRepo.obtenerAlumnos();
        //console.log('Usuarios registrados:', resultado);

        // TEST 4: OBTENER USUARIO POR CORREO
        // const usuarioPorCorreo = await usuarioService.obtenerUsuarioPorCorreo('juan.perez@ejemplo.com');
        // console.log('Usuario encontrado por correo:', usuarioPorCorreo);

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

        /*========= Pruebas de Reto ==========*/
        // TEST 1: CREAR UN RETO
        // const resultaReto = await retoService.crearReto(retoData);
        //console.log('Reto registrado:', resultaReto);

        /**  TEST 2: MODIFICAR UN RETO
        const datosModificados = {
            lecciones: [resultado._id]
        };

        const retoModificado = await retoService.modificarReto(resultaReto._id, datosModificados);
        //console.log('Reto modificado:', retoModificado);
        */

        /**  TEST 3: MOSTRAR TODOS LOS RETOS
        const todosLosRetos = await retoService.obtenerTodosLosRetos();
        todosLosRetos.forEach(reto => {
            console.log('--- DETALLE DEL RETO ---');
            console.log(`Título: ${reto.titulo}`);
            console.log(`Descripción: ${reto.descripcion}`);
            console.log(`ID: ${reto._id}`);
            console.log(`Fecha de Creación: ${reto.fechaCreacion.toLocaleDateString()}`);
            console.log('\n--- Preguntas ---');

            if (reto.preguntas.length === 0) {
                console.log("Este reto no tiene preguntas.");
            } else {
                reto.preguntas.forEach((pregunta, index) => {
                    console.log(` ${index + 1}. ${pregunta.contenido} (Tipo: ${pregunta.tipo})`);
                    pregunta.respuestas.forEach(respuesta => {
                        const esCorrecta = respuesta.esCorrecta ? 'Verdadero' : 'Falso';
                        console.log(`    - ${respuesta.contenido} [${esCorrecta}]`);
                    });
                });
            }
        });
        */

        /**  
        // TEST 4: MOSTRAR RETOS POR LECCIONES
        const retosLecciones = await retoService.obtenerRetosPorLeccion(resultado._id);
        retosLecciones.forEach(reto => {
            console.log('--- DETALLE DEL RETO ---');
            console.log(`Título: ${reto.titulo}`);
            console.log(`Descripción: ${reto.descripcion}`);
            console.log(`ID: ${reto._id}`);
            console.log(`Fecha de Creación: ${reto.fechaCreacion.toLocaleDateString()}`);
            console.log('\n--- Preguntas ---');

            if (reto.preguntas.length === 0) {
                console.log("Este reto no tiene preguntas.");
            } else {
                reto.preguntas.forEach((pregunta, index) => {
                    console.log(` ${index + 1}. ${pregunta.contenido} (Tipo: ${pregunta.tipo})`);
                    pregunta.respuestas.forEach(respuesta => {
                        const esCorrecta = respuesta.esCorrecta ? 'Verdadero' : 'Falso';
                        console.log(`    - ${respuesta.contenido} [${esCorrecta}]`);
                    });
                });
            }
        });
        */

        /**  TEST 5: MOSTRAR RETO POR TITULO
        const retoPorTitulo = await retoService.obtenerRetoPorTitulo("Reto de Algoritmos Básicos");
        console.log('--- DETALLE DEL RETO ---');
        console.log(`Título: ${retoPorTitulo.titulo}`);
        console.log(`Descripción: ${retoPorTitulo.descripcion}`);
        console.log(`ID: ${retoPorTitulo._id}`);
        console.log(`Fecha de Creación: ${retoPorTitulo.fechaCreacion.toLocaleDateString()}`);
        console.log('\n--- Preguntas ---');

        if (retoPorTitulo.preguntas.length === 0) {
            console.log("Este reto no tiene preguntas.");
        } else {
            retoPorTitulo.preguntas.forEach((pregunta, index) => {
                console.log(` ${index + 1}. ${pregunta.contenido} (Tipo: ${pregunta.tipo})`);
                pregunta.respuestas.forEach(respuesta => {
                    const esCorrecta = respuesta.esCorrecta ? 'Verdadero' : 'Falso';
                    console.log(`    - ${respuesta.contenido} [${esCorrecta}]`);
                });
            });
        }
        */

        /** TEST 6: MOSTRAR RETO POR ID
        const retoPorId = await retoService.obtenerReto(resultaReto._id);
        console.log('--- DETALLE DEL RETO ---');
        console.log(`Título: ${retoPorId.titulo}`);
        console.log(`Descripción: ${retoPorId.descripcion}`);
        console.log(`ID: ${retoPorId._id}`);
        console.log(`Fecha de Creación: ${retoPorId.fechaCreacion.toLocaleDateString()}`);
        console.log('\n--- Preguntas ---');

        if (retoPorId.preguntas.length === 0) {
            console.log("Este reto no tiene preguntas.");
        } else {
            retoPorId.preguntas.forEach((pregunta, index) => {
                console.log(` ${index + 1}. ${pregunta.contenido} (Tipo: ${pregunta.tipo})`);
                pregunta.respuestas.forEach(respuesta => {
                    const esCorrecta = respuesta.esCorrecta ? 'Verdadero' : 'Falso';
                    console.log(`    - ${respuesta.contenido} [${esCorrecta}]`);
                });
            });
        }
        */

        // TEST 7: ELIMINAR RETO
        //const resultadoEliminacion = await retoService.eliminarReto(resultaReto._id);
        //console.log("Se elimino correctamente el reto");

    } catch (error) {
        console.error('Error durante la operacion', error);
    } finally {
        await mongoose.disconnect();
        console.log("Conexion cerrada despues del test.");
    }
}

runTest();
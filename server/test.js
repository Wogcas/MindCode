import mongoose from "mongoose";
import { connectToDatabase } from "./database/connection.js";
import { Curso } from "./entities/Curso.js";
import { Leccion } from "./entities/Leccion.js";
import CursoService from "./services/CursoService.js";
import LeccionService from "./services/LeccionService.js";

async function runTest() {
    await connectToDatabase();

    const cursoServicio = new CursoService();
    const leccionService = new LeccionService();

    const curso1 = new Curso({
        titulo: 'Curso de principios de React',
        descripcion: 'Este curso esta hecho con la finalidad de dar las oportunidades y herramientas de la libreria de React js...',
        id_maestro: '65147a75c13e61883b23e1aA',
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

    const leccionActualizada = {
        "titulo": 'Leccion 2',
        "descripcion": 'Por que usar React',
        "multimedia": [{
            "titulo": 'Video leccion para aprender que es REACT',
            "URL": "https://youtu.be/kEMr0rFjB7E?si=RjuIRiHUgQJMOA-x"
        }],
        "id_curso": '65147a75c13e61883b23e1aa',
    }

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

        const resultado = await leccionService.actualizarLeccion('68e369f07d58de85583aa1f8', leccionActualizada);
        console.log(`La leccion modificada: ${resultado}`);

        // const resultado = await leccionService.eliminarLeccion('68e367ce06822685686fca13');
        // console.log(`La leccion eliminada: ${resultado}`);


        // ------------------------------

        // AHORA TODOS LOS TEST SON CON LOS SERVICIOS

        // TEST CON CREAR UN CURSO
        // const resultado = await cursoRepo.agregarCurso(curso1);
        // console.log('Se ha agregado correctamente el curso:', resultado);

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

    } catch (error) {
        console.error('Error durante la operacion', error);
    } finally {
        await mongoose.disconnect();
        console.log("Conexion cerrada despues del test.");
    }
}

runTest();
import mongoose from "mongoose";
import { connectToDatabase } from "./database/connection.js";
import { Curso } from "./entities/Curso.js";
import CursoService from "./services/CursoService.js";

async function runTest() {
    await connectToDatabase();

    const cursoServicio = new CursoService();

    const curso1 = new Curso({
        titulo: 'Curso de principios de React',
        descripcion: 'Este curso esta hecho con la finalidad de dar las oportunidades y herramientas de la libreria de React js...',
        id_maestro: '65147a75c13e61883b23e1aA',
    });

    try {

        // AHORA TODOS LOS TEST SON CON LOS SERVICIOS

        // TEST CON CREAR UN CURSO
        // const resultado = await cursoRepo.agregarCurso(curso1);
        // console.log('Se ha agregado correctamente el curso:', resultado);

        // TEST CON OBTENER CURSOS
        // const resultado = await cursoRepo.obtenerCursos();
        // console.log('Estos son los cursos registrados en MindCode', resultado);

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
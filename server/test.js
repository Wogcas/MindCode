import mongoose from "mongoose";
import { connectToDatabase } from "./database/connection.js";
import { Curso } from "./entities/Curso.js";
import CursoRepository from "./repositories/CursoRepository.js";

async function runTest() {
    await connectToDatabase();

    const cursoRepo = new CursoRepository();

    const curso1 = new Curso({
        titulo: 'Curso de NodeJS para principiantes',
        descripcion: 'Este curso esta hecho con la finalidad de dar a conocer sobre NodeJS y sus ventajas en el entorno de desarrollo web...',
        id_maestro: '65147a75c13e61883b23e1aA',
    });

    try {
        const resultado = await cursoRepo.agregarCurso(curso1);
        console.log('Se ha agregado correctamente el curso:', resultado);
    } catch (error) {
        console.error('Error durante la operacion', error);
    } finally {
        await mongoose.disconnect();
        console.log("Conexion cerrada despues del test.");
    }
}

runTest();
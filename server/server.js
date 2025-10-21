import express from 'express';
import { connectToDatabase } from './database/connection.js';
import cursoRouter from './routes/CursoRoute.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// Conexión a la base de datos
await connectToDatabase();

// De acuerdo a la entidad se redirige a sus rutas correspondientes
app.use('/cursos', cursoRouter);






app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});
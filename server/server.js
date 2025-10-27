import express from 'express';
import { connectToDatabase } from './database/connection.js';
import cursoRouter from './routes/CursoRoute.js';
import authRouter from './routes/AuthRoute.js';
import leccionRouter from './routes/LeccionRoute.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// Conexión a la base de datos
await connectToDatabase();

// De acuerdo a la entidad se redirige a sus rutas correspondientes
app.use('/api/cursos', cursoRouter);
app.use('/api/auth', authRouter);
app.use('/api/lecciones', leccionRouter);


app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});
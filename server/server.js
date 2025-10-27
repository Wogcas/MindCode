import express from 'express';
import { connectToDatabase } from './database/connection.js';
import cursoRouter from './routes/CursoRoute.js';
import authRouter from './routes/AuthRoute.js';
import retoRouter from './routes/RetoRoute.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// Conexión a la base de datos
await connectToDatabase();

// De acuerdo a la entidad se redirige a sus rutas correspondientes
app.use('/api/cursos', cursoRouter);
app.use('/api/auth', authRouter);
app.use('/api/retos', retoRouter);

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});
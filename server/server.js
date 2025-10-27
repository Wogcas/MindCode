import express from 'express';
import { connectToDatabase } from './database/connection.js';
import cursoRouter from './routes/CursoRoute.js';
import leccionRouter from './routes/LeccionRoute.js';
import authRouter from './routes/AuthRoute.js';

import retoRouter from './routes/RetoRoute.js';


import usuarioRouter from './routes/UsuarioRoute.js';
import { errorHandler, notFound } from './auth/errorHandler.js';


const app = express();
const PORT = 3000;

app.use(express.json());

// Conexión a la base de datos
await connectToDatabase();

// De acuerdo a la entidad se redirige a sus rutas correspondientes
app.use('/api/cursos', cursoRouter);
app.use('/api/lecciones', leccionRouter);

app.use('/api/auth', authRouter);
app.use('/api/retos', retoRouter);


app.use('/api/usuarios', usuarioRouter);
app.use('/api/auth', authRouter);

// Manejo de rutas no encontradas (404)
app.use(notFound);

// Middleware centralizado de manejo de errores
app.use(errorHandler);


app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});
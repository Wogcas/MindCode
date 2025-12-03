import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectToDatabase } from './database/connection.js';
import cursoRouter from './routes/CursoRoute.js';
import leccionRouter from './routes/LeccionRoute.js';
import authRouter from './routes/AuthRoute.js';

import retoRouter from './routes/RetoRoute.js';


import usuarioRouter from './routes/UsuarioRoute.js';
import { errorHandler, notFound } from './auth/errorHandler.js';

// Obtener __dirname en módulos ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar CORS - Permitir todas las direcciones (desarrollo)
const corsOptions = {
    origin: '*',  // Permitir todas las direcciones
    credentials: false,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// Servir archivos estáticos del frontend
app.use('/app', express.static(path.join(__dirname, '../app')));

// Ruta raíz para servir index.html del login
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../app/src/login/index.html'));
});

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
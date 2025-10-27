import { Router } from 'express';
import { UsuarioController } from '../controllers/UsuarioController.js';
import { asyncHandler } from '../auth/errorHandler.js';

const usuarioRouter = Router();
const usuarioController = new UsuarioController();

// ========== RUTAS PÚBLICAS ==========
// Rutas específicas PRIMERO (antes de /:id para evitar conflictos de routing)
usuarioRouter.get('/filtro/alumnos', asyncHandler(usuarioController.obtenerAlumnos));
usuarioRouter.get('/filtro/maestros', asyncHandler(usuarioController.obtenerMaestros));
usuarioRouter.get('/filtro/conteo-tipo', asyncHandler(usuarioController.contarPorTipo));
usuarioRouter.get('/correo/:correo', asyncHandler(usuarioController.obtenerUsuarioPorCorreo));

// Obtener todos los usuarios
usuarioRouter.get('/', asyncHandler(usuarioController.obtenerUsuarios));

// Obtener usuario por ID
usuarioRouter.get('/:id', asyncHandler(usuarioController.obtenerUsuarioPorId));

// ========== OPERACIONES CRUD ==========

// Crear usuario
usuarioRouter.post('/agregar', asyncHandler(usuarioController.crearUsuario));

// Actualizar usuario
usuarioRouter.put('/actualizar/:id', asyncHandler(usuarioController.actualizarUsuario));

// Eliminar usuario
usuarioRouter.delete('/eliminar/:id', asyncHandler(usuarioController.eliminarUsuario));

// ========== OPERACIONES DE PROGRESO (ALUMNO) ==========

// Obtener progreso de cursos del alumno
usuarioRouter.get('/:id/progreso', asyncHandler(usuarioController.obtenerProgresoCursos));

// Agregar curso al progreso del alumno
usuarioRouter.post('/:id/progreso/agregar-curso', asyncHandler(usuarioController.agregarCursoAProgreso));

// Marcar lección como completada
usuarioRouter.put('/:id/progreso/completar-leccion', asyncHandler(usuarioController.marcarLeccionCompletada));

// Actualizar porcentaje de progreso
usuarioRouter.put('/:id/progreso/actualizar-porcentaje', asyncHandler(usuarioController.actualizarPorcentajeProgreso));

// ========== OPERACIONES DE CURSOS IMPARTIDOS (MAESTRO) ==========

// Obtener cursos impartidos
usuarioRouter.get('/:id/cursos-impartidos', asyncHandler(usuarioController.obtenerCursosImpartidos));

// Agregar curso impartido
usuarioRouter.post('/:id/cursos-impartidos/agregar', asyncHandler(usuarioController.agregarCursoImpartido));

// Eliminar curso impartido
usuarioRouter.delete('/:id/cursos-impartidos/eliminar', asyncHandler(usuarioController.eliminarCursoImpartido));

export default usuarioRouter;
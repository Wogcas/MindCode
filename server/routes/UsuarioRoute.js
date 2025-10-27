import { Router } from 'express';
import { UsuarioController } from '../controllers/UsuarioController.js';
import { asyncHandler } from '../auth/errorHandler.js';

const usuarioRouter = Router();
const usuarioController = new UsuarioController();

usuarioRouter.get('/filtro/alumnos', asyncHandler(usuarioController.obtenerAlumnos));
usuarioRouter.get('/filtro/maestros', asyncHandler(usuarioController.obtenerMaestros));
usuarioRouter.get('/filtro/conteo-tipo', asyncHandler(usuarioController.contarPorTipo));
usuarioRouter.get('/correo/:correo', asyncHandler(usuarioController.obtenerUsuarioPorCorreo));

usuarioRouter.get('/', asyncHandler(usuarioController.obtenerUsuarios));
usuarioRouter.get('/:id', asyncHandler(usuarioController.obtenerUsuarioPorId));
usuarioRouter.post('/agregar', asyncHandler(usuarioController.crearUsuario));
usuarioRouter.put('/actualizar/:id', asyncHandler(usuarioController.actualizarUsuario));
usuarioRouter.delete('/eliminar/:id', asyncHandler(usuarioController.eliminarUsuario));
usuarioRouter.get('/:id/progreso', asyncHandler(usuarioController.obtenerProgresoCursos));
usuarioRouter.post('/:id/progreso/agregar-curso', asyncHandler(usuarioController.agregarCursoAProgreso));
usuarioRouter.put('/:id/progreso/completar-leccion', asyncHandler(usuarioController.marcarLeccionCompletada));
usuarioRouter.put('/:id/progreso/actualizar-porcentaje', asyncHandler(usuarioController.actualizarPorcentajeProgreso));
usuarioRouter.get('/:id/cursos-impartidos', asyncHandler(usuarioController.obtenerCursosImpartidos));
usuarioRouter.post('/:id/cursos-impartidos/agregar', asyncHandler(usuarioController.agregarCursoImpartido));
usuarioRouter.delete('/:id/cursos-impartidos/eliminar', asyncHandler(usuarioController.eliminarCursoImpartido));

export default usuarioRouter;
import { Router } from 'express';
import { UsuarioController } from '../controllers/UsuarioController.js';
import { verifyToken, esMentor, esPropietarioOAdmin } from '../auth/authMiddleware.js';
import { asyncHandler } from '../auth/errorHandler.js';

const usuarioRouter = Router();
const usuarioController = new UsuarioController();

usuarioRouter.get('/filtro/alumnos', asyncHandler(usuarioController.obtenerAlumnos));
usuarioRouter.get('/filtro/maestros', asyncHandler(usuarioController.obtenerMaestros));
usuarioRouter.get('/filtro/conteo-tipo', asyncHandler(usuarioController.contarPorTipo));

// Rutas de perfil propio
usuarioRouter.get('/perfil/mi-perfil', verifyToken, asyncHandler(usuarioController.obtenerMiPerfil));
usuarioRouter.put('/perfil/actualizar', verifyToken, asyncHandler(usuarioController.actualizarMiPerfil));

usuarioRouter.get('/', verifyToken, asyncHandler(usuarioController.obtenerUsuarios));
usuarioRouter.get('/correo/:correo', verifyToken, asyncHandler(usuarioController.obtenerUsuarioPorCorreo));
usuarioRouter.get('/:id', verifyToken, asyncHandler(usuarioController.obtenerUsuarioPorId));

usuarioRouter.post('/agregar', verifyToken, esMentor, asyncHandler(usuarioController.crearUsuario));
usuarioRouter.put('/actualizar/:id', verifyToken, esPropietarioOAdmin, asyncHandler(usuarioController.actualizarUsuario));
usuarioRouter.delete('/eliminar/:id', verifyToken, esMentor, asyncHandler(usuarioController.eliminarUsuario));

usuarioRouter.get('/:id/progreso', verifyToken, asyncHandler(usuarioController.obtenerProgresoCursos));
usuarioRouter.post('/:id/progreso/agregar-curso', verifyToken, asyncHandler(usuarioController.agregarCursoAProgreso));
usuarioRouter.put('/:id/progreso/completar-leccion', verifyToken, asyncHandler(usuarioController.marcarLeccionCompletada));
usuarioRouter.put('/:id/progreso/actualizar-porcentaje', verifyToken, asyncHandler(usuarioController.actualizarPorcentajeProgreso));

usuarioRouter.get('/:id/cursos-impartidos', verifyToken, asyncHandler(usuarioController.obtenerCursosImpartidos));
usuarioRouter.post('/:id/cursos-impartidos/agregar', verifyToken, esMentor, asyncHandler(usuarioController.agregarCursoImpartido));
usuarioRouter.delete('/:id/cursos-impartidos/eliminar', verifyToken, esMentor, asyncHandler(usuarioController.eliminarCursoImpartido));

export default usuarioRouter;
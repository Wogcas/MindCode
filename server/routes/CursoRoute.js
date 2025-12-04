import { Router } from "express";
import CursoController from "../controllers/CursoController.js";
import { esMentor, esAlumno, verifyToken } from "../auth/authMiddleware.js";
import { asyncHandler } from "../auth/errorHandler.js";

const cursoRouter = Router();
const cursoController = new CursoController();

cursoRouter.get("/maestro/mis-cursos", verifyToken, esMentor, asyncHandler(cursoController.obtenerCursosMaestro));
cursoRouter.post("/agregar", verifyToken, esMentor, asyncHandler(cursoController.agregarCurso));
cursoRouter.put("/actualizar/:id", verifyToken, esMentor, asyncHandler(cursoController.actualizarCurso));
cursoRouter.delete("/eliminar/:id", verifyToken, esMentor, asyncHandler(cursoController.eliminarCurso));

cursoRouter.get("/alumno/mis-cursos", verifyToken, esAlumno, asyncHandler(cursoController.obtenerCursosAlumno));
cursoRouter.post("/alumno/inscribirse", verifyToken, esAlumno, asyncHandler(cursoController.inscribirAlumno));

cursoRouter.get("/disponibles", asyncHandler(cursoController.obtenerCursosDisponibles));
cursoRouter.get("/curso/:nombre", asyncHandler(cursoController.obtenerCursoPorNombre));
cursoRouter.get("/detalle/:id", asyncHandler(cursoController.obtenerCursoConParticipantes));

cursoRouter.get("/", asyncHandler(cursoController.obtenerCursos));
cursoRouter.get("/:id", asyncHandler(cursoController.obtenerCursoPorId));

export default cursoRouter;
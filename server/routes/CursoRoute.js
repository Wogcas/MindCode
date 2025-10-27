import { Router } from "express";
import CursoController from "../controllers/CursoController.js";
import { esMentor, verifyToken } from "../auth/authMiddleware.js";
import { asyncHandler } from "../auth/errorHandler.js";

const cursoRouter = Router();
const cursoController = new CursoController();

// Rutas publicas
cursoRouter.get("/", asyncHandler(cursoController.obtenerCursos));
cursoRouter.get("/:id", asyncHandler(cursoController.obtenerCursoPorId));
cursoRouter.get("/curso/:nombre", asyncHandler(cursoController.obtenerCursoPorNombre));

// Rutas protegidas
cursoRouter.post("/agregar", verifyToken, esMentor, asyncHandler(cursoController.agregarCurso));
cursoRouter.put("/actualizar/:id", verifyToken, esMentor, asyncHandler(cursoController.actualizarCurso));
cursoRouter.delete("/eliminar/:id", verifyToken, esMentor, asyncHandler(cursoController.eliminarCurso));

export default cursoRouter;
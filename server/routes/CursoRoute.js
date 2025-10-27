import { Router } from "express";
import CursoController from "../controllers/CursoController.js";
import { esMentor, verifyToken } from "../auth/authMiddleware.js";

const cursoRouter = Router();
const cursoController = new CursoController();

// Rutas publicas
cursoRouter.get("/", cursoController.obtenerCursos); // Funciona
cursoRouter.get("/:id", cursoController.obtenerCursoPorId); // Funciona
cursoRouter.get("/curso/:nombre", cursoController.obtenerCursoPorNombre); // Funciona

// Rutas protegidas
cursoRouter.post("/agregar", verifyToken, esMentor, cursoController.agregarCurso); // Funciona
cursoRouter.put("/actualizar/:id", verifyToken, esMentor, cursoController.actualizarCurso); // Funciona
cursoRouter.delete("/eliminar/:id", verifyToken, esMentor, cursoController.eliminarCurso); // Funciona

export default cursoRouter;
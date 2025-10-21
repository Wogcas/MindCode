import { Router } from "express";
import CursoController from "../controllers/CursoController.js";

const cursoRouter = Router();
const cursoController = new CursoController();

cursoRouter.post("/agregar", cursoController.agregarCurso); // Funciona
cursoRouter.get("/", cursoController.obtenerCursos); // Funciona
cursoRouter.get("/:id", cursoController.obtenerCursoPorId); // Funciona
cursoRouter.get("/curso/:nombre", cursoController.obtenerCursoPorNombre); // Funciona
cursoRouter.put("/actualizar/:id", cursoController.actualizarCurso); // Funciona
cursoRouter.delete("/eliminar/:id", cursoController.eliminarCurso); // Funciona

export default cursoRouter;
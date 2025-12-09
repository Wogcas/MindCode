import { Router } from "express";
import LeccionController from "../controllers/LeccionController.js";
import { verifyToken, esMentor } from "../auth/authMiddleware.js";
import { asyncHandler } from "../auth/errorHandler.js";

const leccionController = new LeccionController();
const leccionRouter = new Router();

// Rutas públicas (consulta)
leccionRouter.get("/", asyncHandler(leccionController.obtenerLecciones));
leccionRouter.get("/id/:id", asyncHandler(leccionController.obtenerLeccionesPorId));
leccionRouter.get("/curso/:id", asyncHandler(leccionController.obtenerLeccionesPorCurso));
leccionRouter.get("/titulo/:titulo", asyncHandler(leccionController.obtenerLeccionesPorTitulo));

// Rutas protegidas (solo Mentor puede crear/modificar/eliminar)
leccionRouter.post('/agregar', verifyToken, esMentor, asyncHandler(leccionController.agregarLeccion));
leccionRouter.put("/:id", verifyToken, esMentor, asyncHandler(leccionController.actualizarLeccion));
leccionRouter.delete("/:id", verifyToken, esMentor, asyncHandler(leccionController.eliminarLeccion));

export default leccionRouter;

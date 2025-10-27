import { Router } from "express";
import LeccionController from "../controllers/LeccionController.js";
import { asyncHandler } from "../auth/errorHandler.js";

const leccionController = new LeccionController();
const leccionRouter = new Router();

leccionRouter.post('/agregar', asyncHandler(leccionController.agregarLeccion));
leccionRouter.get("/", asyncHandler(leccionController.obtenerLecciones));
leccionRouter.get("/id/:id", asyncHandler(leccionController.obtenerLeccionesPorId));
leccionRouter.get("/titulo/:titulo", asyncHandler(leccionController.obtenerLeccionesPorTitulo));
leccionRouter.put("/:id", asyncHandler(leccionController.actualizarLeccion));
leccionRouter.delete("/:id", asyncHandler(leccionController.eliminarLeccion));

export default leccionRouter;
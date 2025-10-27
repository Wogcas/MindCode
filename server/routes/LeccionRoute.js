import { Router } from "express";
<<<<<<< HEAD
import LeccionController from "../controllers/LeccionController.js"
import { esMentor } from "../auth/authMiddleware.js";
=======
import LeccionController from "../controllers/LeccionController.js";
import { asyncHandler } from "../auth/errorHandler.js";
>>>>>>> Rama-Esmeralda

const leccionController = new LeccionController();
const leccionRouter = new Router();

<<<<<<< HEAD
// Rutas protegidas Mentor
leccionRouter.post('/agregar', verifyToken, esMentor, leccionController.agregarLeccion);
leccionRouter.get("/", verifyToken, esMentor, leccionController.obtenerLecciones);
leccionRouter.get("/id/:id", verifyToken, esMentor, leccionController.obtenerLeccionesPorId);
leccionRouter.get("/titulo/:titulo", verifyToken, esMentor, leccionController.obtenerLeccionesPorTitulo);
leccionRouter.put("/:id", verifyToken, esMentor, leccionController.actualizarLeccion);
leccionRouter.delete("/:id", verifyToken, esMentor, leccionController.eliminarLeccion);
=======
leccionRouter.post('/agregar', asyncHandler(leccionController.agregarLeccion));
leccionRouter.get("/", asyncHandler(leccionController.obtenerLecciones));
leccionRouter.get("/id/:id", asyncHandler(leccionController.obtenerLeccionesPorId));
leccionRouter.get("/titulo/:titulo", asyncHandler(leccionController.obtenerLeccionesPorTitulo));
leccionRouter.put("/:id", asyncHandler(leccionController.actualizarLeccion));
leccionRouter.delete("/:id", asyncHandler(leccionController.eliminarLeccion));
>>>>>>> Rama-Esmeralda

export default leccionRouter;
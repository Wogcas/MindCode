import { Router } from "express";
import LeccionController from "../controllers/LeccionController.js"
import { esMentor } from "../auth/authMiddleware.js";

const leccionController = new LeccionController();
const leccionRouter = new Router();

// Rutas protegidas Mentor
leccionRouter.post('/agregar', verifyToken, esMentor, leccionController.agregarLeccion);
leccionRouter.get("/", verifyToken, esMentor, leccionController.obtenerLecciones);
leccionRouter.get("/id/:id", verifyToken, esMentor, leccionController.obtenerLeccionesPorId);
leccionRouter.get("/titulo/:titulo", verifyToken, esMentor, leccionController.obtenerLeccionesPorTitulo);
leccionRouter.put("/:id", verifyToken, esMentor, leccionController.actualizarLeccion);
leccionRouter.delete("/:id", verifyToken, esMentor, leccionController.eliminarLeccion);

export default leccionRouter;
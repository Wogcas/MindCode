import { Router } from "express";
import LeccionController from "../controllers/LeccionController.js"

const leccionController = new LeccionController();
const leccionRouter = new Router();

leccionRouter.post('/agregar', leccionController.agregarLeccion);
leccionRouter.get("/", leccionController.obtenerLecciones);
leccionRouter.get("/:id", leccionController.obtenerLeccionesPorId);
leccionRouter.get("/leccion/:nombre", leccionController.obtenerLeccionesPorNombre);
leccionRouter.put("/actualizar/:id", leccionController.actualizarLeccion);
leccionRouter.delete("/eliminar/:id", leccionController.eliminarLeccion);

export default leccionRouter;
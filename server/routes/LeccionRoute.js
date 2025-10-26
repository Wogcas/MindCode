import { Router } from "express";
import LeccionController from "../controllers/LeccionController.js"

const leccionController = new LeccionController();
const leccionRouter = new Router();

leccionRouter.post('/agregar', leccionController.agregarLeccion);
leccionRouter.get("/", leccionController.obtenerLecciones);
leccionRouter.get("/id/:id", leccionController.obtenerLeccionesPorId);
leccionRouter.get("/titulo/:titulo", leccionController.obtenerLeccionesPorTitulo);
leccionRouter.put("/:id", leccionController.actualizarLeccion);
leccionRouter.delete("/:id", leccionController.eliminarLeccion);

export default leccionRouter;
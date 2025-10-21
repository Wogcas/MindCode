import { Router } from "express";
import LeccionController from "../controllers/LeccionController.js"

const leccionController = new LeccionController();
const leccionRouter = new Router();

leccionRouter.post('/agregarLeccion', leccionController.agregarLeccion);

export default leccionRouter;
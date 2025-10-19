import { Router } from "express";
import CursoController from "../controllers/CursoController.js";

const cursoRouter = Router();
const cursoController = new CursoController();

cursoRouter.post('/agregar', cursoController.agregarCurso);

export default cursoRouter;
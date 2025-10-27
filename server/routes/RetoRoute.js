import { Router } from "express";
import RetoController from "../controllers/RetoController.js";
import { esMentor, verifyToken } from "../auth/authMiddleware.js";

const retoRouter = Router();
const retoController = new RetoController();

retoRouter.get("/", verifyToken, retoController.obtenerTodosLosRetos); // ya jaló tu
retoRouter.get("/:id", verifyToken, retoController.obtenerReto); // ya jaló tu
retoRouter.get("/retoTitulo/:titulo", verifyToken, retoController.obtenerRetoPorTitulo);// ya jaló tu
retoRouter.get("/retoLeccion/:id", verifyToken, retoController.obtenerRetosPorLeccion); // ya jaló tu
retoRouter.post("/agregar", verifyToken, esMentor, retoController.crearReto);// ya jaló tu
retoRouter.put("/actualizar/:id", verifyToken, esMentor, retoController.modificarReto); // ya jaló tu
retoRouter.delete("/eliminar/:id", verifyToken, esMentor, retoController.eliminarReto);// ya jaló tu

export default retoRouter;  
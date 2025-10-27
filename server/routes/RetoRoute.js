import { Router } from "express";
import RetoController from "../controllers/RetoController.js";
import { esMentor, verifyToken } from "../auth/authMiddleware.js";

const retoRouter = Router();
const retoController = new RetoController();

// Rutas publicas
retoRouter.get("/", retoController.obtenerTodosLosRetos); // ya jaló tu
retoRouter.get("/:id", retoController.obtenerReto); // ya jaló tu
retoRouter.get("/retoTitulo/:titulo", retoController.obtenerRetoPorTitulo);// ya jaló tu
retoRouter.get("/retoLeccion/:id", retoController.obtenerRetosPorLeccion); // ya jaló tu

// Rutas protegidas
retoRouter.post("/agregar", verifyToken, esMentor, retoController.crearReto);// ya jaló tu
retoRouter.put("/actualizar/:id", verifyToken, esMentor, retoController.modificarReto); // ya jaló tu
retoRouter.delete("/eliminar/:id", verifyToken, esMentor, retoController.eliminarReto);// ya jaló tu

export default retoRouter;  
import express, { Router } from 'express';
import AuthController from '../controllers/AuthController.js';
import { verifyToken } from '../auth/authMiddleware.js';

const authRouter = Router();
const authController = new AuthController();

// Publicas
authRouter.post('/registrar', authController.registrar);
authRouter.post('/login', authController.login);

// Protegida
authRouter.get('/perfil', verifyToken, authController.perfil);

export default authRouter;

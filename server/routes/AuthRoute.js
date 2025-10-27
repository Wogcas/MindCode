import { Router } from 'express';
import AuthController from '../controllers/AuthController.js';
import { verifyToken } from '../auth/authMiddleware.js';
import { asyncHandler } from '../auth/errorHandler.js';

const authRouter = Router();
const authController = new AuthController();

// Publicas
authRouter.post('/registrar', asyncHandler(authController.registrar));
authRouter.post('/login', asyncHandler(authController.login));

// Protegida
authRouter.get('/perfil', verifyToken, asyncHandler(authController.perfil));

export default authRouter;
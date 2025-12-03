import AuthService from "../services/AuthService.js";
import { ValidationError } from "../auth/errorHandler.js";

class AuthController {
    constructor() {
        this.authService = new AuthService();
    }

    registrar = async (req, res) => {
        const { nombre, correo, contrasena, tipo } = req.body;

        // Validaciones básicas
        if (!nombre || !correo || !contrasena || !tipo) {
            throw new ValidationError('Todos los campos son requeridos (nombre, correo, contrasena, tipo)');
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo)) {
            throw new ValidationError('El correo electrónico no es válido');
        }

        // Validar nombre
        if (nombre.trim().length < 3) {
            throw new ValidationError('El nombre debe tener mínimo 3 caracteres');
        }

        // Validar tipo de usuario
        if (tipo !== 'Alumno' && tipo !== 'Maestro') {
            throw new ValidationError('El tipo debe ser "Alumno" o "Maestro"');
        }

        // Validar contraseña
        if (contrasena.length < 8) {
            throw new ValidationError('La contraseña debe tener mínimo 8 caracteres');
        }

        // Validar requisitos de contraseña fuerte
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};:'",.<>?])/;
        if (!passwordRegex.test(contrasena)) {
            throw new ValidationError('La contraseña debe contener mayúsculas, minúsculas, números y caracteres especiales');
        }

        const resultado = await this.authService.registrar({ nombre, correo, contrasena, tipo });
        res.status(201).json(resultado);
    };

    login = async (req, res) => {
        const { correo, contrasena } = req.body;

        // Validaciones básicas
        if (!correo || !contrasena) {
            throw new ValidationError('Correo y contraseña son requeridos');
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo)) {
            throw new ValidationError('El correo electrónico no es válido');
        }

        const resultado = await this.authService.login(correo, contrasena);
        res.status(200).json(resultado);
    };

    // Información del perfil del usuario autenticado
    perfil = async (req, res) => {
        // El usuario viene del middleware verifyToken
        const { iat, exp, ...usuario } = req.usuario; 
        res.status(200).json({
            success: true,
            data: {
                usuario
            }
        });
    };
}

export default AuthController;
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

        if (tipo !== 'Alumno' && tipo !== 'Maestro') {
            throw new ValidationError('El tipo debe ser "Alumno" o "Maestro"');
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

        const resultado = await this.authService.login(correo, contrasena);
        res.status(200).json(resultado);
    };

    // Información del perfil del usuario autenticado
    perfil = async (req, res) => {
        // El usuario viene del middleware verifyToken
        const { iat, exp, ...usuario } = req.usuario; // Removemos iat y exp
        res.status(200).json({
            success: true,
            data: {
                usuario
            }
        });
    };
}

export default AuthController;
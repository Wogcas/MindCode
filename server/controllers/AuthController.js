import AuthService from "../services/AuthService.js";

class AuthController {
    constructor() {
        this.authService = new AuthService();
    }

    registrar = async (req, res) => {
        try {
            const { nombre, correo, contrasena, tipo } = req.body;

            // Validaciones básicas
            if (!nombre || !correo || !contrasena || !tipo) {
                return res.status(400).json({
                    success: false,
                    message: 'Todos los campos son requeridos (nombre, correo, contrasena, tipo)'
                });
            }

            if (tipo !== 'Alumno' && tipo !== 'Maestro') {
                return res.status(400).json({
                    success: false,
                    message: 'El tipo debe ser "Alumno" o "Maestro"'
                });
            }

            const resultado = await this.authService.registrar({ nombre, correo, contrasena, tipo });
            return res.status(201).json(resultado);
        } catch (error) {
            console.error('Error en registro:', error);
            return res.status(400).json({
                success: false,
                message: error.message || 'Error al registrar usuario'
            });
        }
    };

    login = async (req, res) => {
        try {
            const { correo, contrasena } = req.body;

            // Validaciones básicas
            if (!correo || !contrasena) {
                return res.status(400).json({
                    success: false,
                    message: 'Correo y contraseña son requeridos'
                });
            }
            const resultado = await this.authService.login(correo, contrasena);
            return res.status(200).json(resultado);
        } catch (error) {
            console.error('Error en login:', error);
            return res.status(401).json({
                success: false,
                message: error.message || 'Error al iniciar sesión'
            });
        }
    };

    // Informacion del perfil del usuario autenticado
    perfil = async (req, res) => {
        try {
            // El usuario viene del middleware verifyToken
            const { iat, exp, ...usuario } = req.usuario; // Removemos iat y exp
            return res.status(200).json({
                success: true,
                data: {
                    usuario
                }
            });
        } catch (error) {
            console.error('Error al obtener perfil:', error);
            return res.status(500).json({
                success: false,
                message: 'Error al obtener perfil de usuario'
            });
        }
    };
}

export default AuthController;

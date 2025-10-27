import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UsuarioService from "./UsuarioService.js";
import { authConfig } from '../auth/authConfig.js';

class AuthService {
    constructor() {
        this.usuarioService = new UsuarioService();
    }

    async hashPassword(password) {
        return await bcrypt.hash(password, authConfig.bcryptSaltRounds);
    }

    async comparePassword(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }

    generateToken(usuario) {
        const payload = {
            id: usuario._id.toString(),
            correo: usuario.correo,
            nombre: usuario.nombre,
            tipo: usuario.tipo
        };

        return jwt.sign(payload, authConfig.jwtSecret, {
            expiresIn: authConfig.jwtExpiresIn
        });
    }

    async registrar(datosUsuario) {
        try {
            const { nombre, correo, contrasena, tipo } = datosUsuario;

            // Validar que el tipo sea válido
            if (tipo !== 'Alumno' && tipo !== 'Maestro') {
                throw new Error('Tipo de usuario inválido. Debe ser "Alumno" o "Maestro"');
            }

            // Verificar si el usuario ya existe
            const usuarioExistente = await this.usuarioService.obtenerUsuarioPorCorreo(correo);
            if (usuarioExistente) {
                throw new Error('El correo ya está registrado');
            }

            // Encriptar contraseña
            const contrasenaHash = await this.hashPassword(contrasena);

            // Crear usuario
            const nuevoUsuario = {
                nombre,
                correo,
                contrasena: contrasenaHash,
                tipo
            };

            const usuarioCreado = await this.usuarioService.agregarUsuario(nuevoUsuario);

            // Generar token
            const token = this.generateToken(usuarioCreado);

            return {
                success: true,
                message: 'Usuario registrado exitosamente',
                data: {
                    usuario: {
                        id: usuarioCreado._id,
                        nombre: usuarioCreado.nombre,
                        correo: usuarioCreado.correo,
                        tipo: usuarioCreado.tipo
                    },
                    token
                }
            };
        } catch (error) {
            throw error;
        }
    }

    async login(correo, contrasena) {
        try {
            // Buscar usuario por correo
            const usuario = await this.usuarioService.obtenerUsuarioPorCorreo(correo);

            if (!usuario) {
                throw new Error('Credenciales inválidas');
            }

            // Verificar contraseña
            const contrasenaValida = await this.comparePassword(contrasena, usuario.contrasena);

            if (!contrasenaValida) {
                throw new Error('Credenciales inválidas');
            }

            // Generar token
            const token = this.generateToken(usuario);

            return {
                success: true,
                message: 'Inicio de sesión exitoso',
                data: {
                    usuario: {
                        id: usuario._id,
                        nombre: usuario.nombre,
                        correo: usuario.correo,
                        tipo: usuario.tipo
                    },
                    token
                }
            };
        } catch (error) {
            throw error;
        }
    }

    verifyToken(token) {
        try {
            return jwt.verify(token, authConfig.jwtSecret);
        } catch (error) {
            throw new Error('Token inválido o expirado');
        }
    }
}

export default AuthService;
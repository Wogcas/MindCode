import jwt from 'jsonwebtoken';
import { authConfig } from './authConfig.js';

// Middleware para verificar el token JWT
export const verifyToken = (req, res, next) => {
    try {
        // Obtener token del header
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No se proporcionó token de autenticación'
            });
        }

        // Verificar token
        jwt.verify(token, authConfig.jwtSecret, (error, decoded) => {
            if (error) {
                return res.status(403).json({
                    success: false,
                    message: 'Token inválido o expirado'
                });
            }

            // Agregar información del usuario decodificada al request
            req.usuario = decoded;
            next();
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al verificar token',
            error: error.message
        });
    }
};

// Middleware para verificar que el usuario sea un Alumno
export const esAlumno = (req, res, next) => {
    if (req.usuario && req.usuario.tipo === 'Alumno') {
        next();
    } else {
        return res.status(403).json({
            success: false,
            message: 'Acceso denegado. Se requiere rol de Alumno'
        });
    }
};

// Middleware para verificar que el usuario sea un Mentor (Maestro)
export const esMentor = (req, res, next) => {
    if (req.usuario && req.usuario.tipo === 'Maestro') {
        next();
    } else {
        return res.status(403).json({
            success: false,
            message: 'Acceso denegado. Se requiere rol de Mentor'
        });
    }
};
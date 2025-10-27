//Clase para errores customatizados
export class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

//Errores especificos
export class ValidationError extends AppError {
    constructor(message = "Error de validación") {
        super(message, 400);
        this.name = 'ValidationError';
    }
}

export class NotFoundError extends AppError {
    constructor(message = 'Recurso no encontrado') {
        super(message, 404);
        this.name = 'NotFoundError';
    }
}

export class UnauthorizedError extends AppError {
    constructor(message = 'No autorizado') {
        super(message, 401);
        this.name = 'UnauthorizedError';
    }
}

export class ForbiddenError extends AppError {
    constructor(message = 'Acceso prohibido') {
        super(message, 403);
        this.name = 'ForbiddenError';
    }
}

export class ConflictError extends AppError {
    constructor(message = 'Conflicto con el estado actual del recurso') {
        super(message, 409);
        this.name = 'ConflictError';
    }
}


// Middleware principal de manejo de errores
export const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // Log del error para debugging
    console.error('Error:', {
        name: err.name,
        message: err.message,
        stack: err.stack
    });

    // Error de validación de Mongoose
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message).join(', ');
        error = new ValidationError(message);
    }

    // Error de Cast de Mongoose
    if (err.name === 'CastError') {
        const message = `Formato de ID inválido: ${err.value}`;
        error = new ValidationError(message);
    }

    // Error de duplicado 
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        const message = `El campo ${field} ya existe`;
        error = new ConflictError(message);
    }

    // Error de JWT
    if (err.name === 'JsonWebTokenError') {
        error = new UnauthorizedError('Token inválido');
    }

    if (err.name === 'TokenExpiredError') {
        error = new UnauthorizedError('Token expirado');
    }

    // Respuesta al cliente
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Error interno del servidor';

    res.status(statusCode).json({
        success: false,
        error: {
            message: message,
            statusCode: statusCode,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        }
    });
};

// Middleware para rutas no encontradas
export const notFound = (req, res, next) => {
    const error = new NotFoundError(`Ruta no encontrada: ${req.originalUrl}`);
    next(error);
};

export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};


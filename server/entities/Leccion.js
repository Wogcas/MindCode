import mongoose from 'mongoose';

const LeccionSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true
    },
    fecha_creacion: {
        type: Date,
        required: true
    },
    multimedia: [{
        titulo: {
            type: String,
            required: true
        },
        URL: {
            type: String,
            required: true
        }
    }],
    id_curso: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
}, { timestamps: true });

export const Leccion = mongoose.model('Leccion', LeccionSchema);
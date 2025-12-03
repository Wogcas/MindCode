import mongoose from 'mongoose';

const CursoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        unique: true
    },
    descripcion: {
        type: String,
        required: true
    }, 
    imagen: {
        type: String, 
        default: ''
    },
    publico: {
        type: Boolean,
        default: true
    },
    id_maestro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuarios',
        required: true
    },
}, { timestamps: true });

export const Curso = mongoose.model('Curso', CursoSchema);

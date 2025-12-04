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
    id_maestro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuarios',
        required: true
    },
    visibilidad: {
        type: String,
        enum: ['Público', 'Privado'],
        default: 'Privado'
    },
    imagen: {
        type: String,
        default: 'https://via.placeholder.com/800x450?text=Curso'
    }
}, { timestamps: true });

export const Curso = mongoose.model('Curso', CursoSchema);

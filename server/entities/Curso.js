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
        required: true
    },
}, { timestamps: true });

export const Curso = mongoose.model('Curso', CursoSchema);

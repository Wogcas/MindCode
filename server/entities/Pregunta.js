import mongoose from 'mongoose';
const { Schema } = mongoose;

const respuestaSchema = new Schema({
    contenido: {
        type: String,
        required: true,
        trim: true
    },
    es_correcta: {
        type: Boolean,
        required: true,
        default: false
    }
});

export const preguntaSchema = new Schema({
    contenido: {
        type: String,
        required: true,
    },
    tipo: {
        type: String,
        required: true,
        enum: ['opcion_multiple', 'abierta']
    },
    respuestas: [respuestaSchema]
});

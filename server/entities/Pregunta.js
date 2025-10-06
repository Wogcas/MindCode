import mongoose from 'mongoose';
const { Schema } = mongoose;

const respuestaSchema = new Schema({
    contenido: {
        type: String,
        required: true,
        // trim: true - - - no estoy seguro si es necesario, si alguien me corrige
    },
    es_correcta: {
        type: Boolean,
        required: true,
    }
});

export const preguntaSchema = new Schema({
    contenido: {
        type: String,
        required: true,
        unique: true
    },
    tipo: {
        type: String,
        required: true,
        enum: ['opcion_multiple', 'verdadero_falso', 'codigo']
    },
    respuestas: [respuestaSchema]
});

export const Pregunta = mongoose.model('Pregunta', preguntaSchema);
import mongoose from 'mongoose';
const { Schema } = mongoose;

const respuestaSchema = new Schema({
    contenido: String,
    esCorrecta: Boolean
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
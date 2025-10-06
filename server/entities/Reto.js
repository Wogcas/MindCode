import mongoose from 'mongoose';
const { Schema } = mongoose;
import { preguntaSchema } from "./Pregunta.js";

const retoSchema = new Schema({
    titulo: {
        type: String,
        required: true,
        unique: true
    },
    descripcion: {
        type: String,
        required: true

    },
    fecha_creacion: {
        type: Date,
        default: Date.now
    },
    preguntas: [preguntaSchema],
    lecciones: [{
        type: Schema.Types.ObjectId,
        ref: 'Lecciones'
    }]
});


export const Reto = mongoose.model('Reto', retoSchema);

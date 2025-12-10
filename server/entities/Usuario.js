import mongoose from 'mongoose';


const progresoCursoSchema = new mongoose.Schema({
    id_curso: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Curso',
        required: true
    },
    porcentaje: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    lecciones_completadas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lecciones'
    }]
}, { _id: false });


const cursoImpartidoSchema = new mongoose.Schema({
    id_curso: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Curso',
        required: true
    },
    titulo_curso: {
        type: String,
        required: true
    }
}, { _id: false });


const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true //Elimina espacios vacios
    },
    correo: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    contrasena: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true,
        enum: ['Alumno', 'Maestro'],
        default: 'Alumno'
    },
    sobreMi: {
        type: String,
        trim: true,
        default: ''
    },
    fotoPerfil: {
        type: String,
        default: ''
    },
    progreso_cursos: {
        type: [progresoCursoSchema],
        default: undefined
    },
    cursos_impartidos: {
        type: [cursoImpartidoSchema],
        default: undefined
    }
}, { timestamps: true });


usuarioSchema.pre('save', function (next) {
    if (this.tipo == 'Alumno') {
        if (!this.progreso_cursos) {
            this.progreso_cursos = [];
        }
        this.cursos_impartidos = undefined;
    } else if (this.tipo == 'Maestro') {
        if (!this.cursos_impartidos) {
            this.cursos_impartidos = [];
        }
        this.progreso_cursos = undefined;
    }
    next();
});

export const Usuario = mongoose.model('Usuario', usuarioSchema);


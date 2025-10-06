import mongoose from 'mongoose';


const progresoCursoSchema = new mongoose.Schema({
    id_curso: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Curso',
        require: true
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
}, {_id: false});


const cursoImpartidoSchema = new mongoose.Schema({
    id_curso: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Curso',
        require: true
    },
    titulo_curso: {
        type: String,
        require: true
    }
}, {_id: false});


const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        require: true,
        trim: true //Elimina espacios vacios
    },
   correo: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
    trim: true
   },
   contrasena: {
    type: String,
    require: true
   },
   tipo: {
    type: String,
    require: true,
    enum: ['Alumno', 'Maestro'],
    default: 'Alumno'
   },
   progreso_Cursos:{
    type: [progresoCursoSchema],
    default: undefined
   },
   cursos_Impartidos:{
    type: [cursoImpartidoSchema],
    default: undefined
   }
}, { timestamps: true});


usuarioSchema.pre('save', function(next){
    if(this.tipo == 'Alumno'){
        if(!this.progreso_Cursos){
            this.progreso_Cursos = [];
        }
        this.cursos_Impartidos = undefined;
    }else if (this.tipo == 'Maestro'){
        if(!this.cursos_Impartidos){
            this.cursos_Impartidos = [];
        }
        this.progreso_Cursos = undefined;
    }
    next();
});

export const Usuario = mongoose.model('Usuario', usuarioSchema);


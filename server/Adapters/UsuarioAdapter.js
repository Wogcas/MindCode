import { UsuarioDTO, ProgresoCursoDTO, CursoImpartidoDTO } from "../dtos/usuario.dto.js";

export const UsuarioAdapter = {
  toDTO: (document) => {
    if (!document) return null;
    
    const doc = document.toObject ? document.toObject() : document;

    let progreso_cursos = undefined;
    if (doc.tipo === 'Alumno' && doc.progreso_cursos) {
      progreso_cursos = doc.progreso_cursos.map(p => new ProgresoCursoDTO({
        id_curso: p.id_curso.toString(),
        porcentaje: p.porcentaje,
        lecciones_completadas: p.lecciones_completadas.map(lc => lc.toString()),
      }));
    }

    let cursos_impartidos = undefined;
    if (doc.tipo === 'Maestro' && doc.cursos_impartidos) {
      cursos_impartidos = doc.cursos_impartidos.map(c => new CursoImpartidoDTO({
        id_curso: c.id_curso.toString(),
        titulo_curso: c.titulo_curso,
      }));
    }

    return new UsuarioDTO({
      id: doc._id.toString(),
      nombre: doc.nombre,
      correo: doc.correo,
      tipo: doc.tipo,
      progreso_cursos: progreso_cursos,
      cursos_impartidos: cursos_impartidos,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }
};
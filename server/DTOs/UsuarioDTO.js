// Aquí no supe que pedo, es que no tiene id, lo dejo así como le hacemos?

export class ProgresoCursoDTO {
  constructor({ id_curso, porcentaje, lecciones_completadas }) {
    this.id_curso = id_curso;
    this.porcentaje = porcentaje;
    this.lecciones_completadas = lecciones_completadas;
  }
}

export class CursoImpartidoDTO {
  constructor({ id_curso, titulo_curso }) {
    this.id_curso = id_curso;
    this.titulo_curso = titulo_curso;
  }
}

export class UsuarioDTO {
  constructor({ id, nombre, correo, tipo, progreso_cursos, cursos_impartidos, createdAt, updatedAt }) {
    this.id = id;
    this.nombre = nombre;
    this.correo = correo;
    this.tipo = tipo;
    this.progreso_cursos = progreso_cursos;
    this.cursos_impartidos = cursos_impartidos;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
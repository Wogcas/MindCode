
export class RespuestaDTO {
  constructor({ id, contenido, es_correcta }) {
    this.id = id;
    this.contenido = contenido;
    this.es_correcta = es_correcta;
  }
}

export class PreguntaDTO {
  constructor({ id, contenido, tipo, respuestas }) {
    this.id = id;
    this.contenido = contenido;
    this.tipo = tipo;
    // Array de objetos RespuestaDTO
    this.respuestas = respuestas;
  }
}

export class RetoDTO {
  constructor({ id, titulo, descripcion, fecha_creacion, preguntas, lecciones }) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.fecha_creacion = fecha_creacion;
    // Array de objetos PreguntaDTO
    this.preguntas = preguntas;
    // Array de IDs de lecciones relacionadas
    this.lecciones = lecciones;
  }
}
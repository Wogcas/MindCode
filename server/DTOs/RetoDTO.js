
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
    // Esto es un array como ya saben
    this.respuestas = respuestas;
  }
}

export class RetoDTO {
  constructor({ id, titulo, descripcion, fecha_creacion, preguntas, lecciones }) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.fecha_creacion = fecha_creacion;
    // Esto es un array como ya saben
    this.preguntas = preguntas;
    // Esto es un array como ya saben
    this.lecciones = lecciones;
  }
}
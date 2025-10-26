export class MultimediaDTO {
  constructor({ id, titulo, URL }) {
    this.id = id;
    this.titulo = titulo;
    this.URL = URL;
  }
}

export class LeccionDTO {
  constructor({ id, titulo, descripcion, multimedia, id_curso, createdAt, updatedAt }) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.multimedia = multimedia;
    this.id_curso = id_curso;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
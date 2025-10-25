export class MultimediaDTO {
  constructor({ id, titulo, URL }) {
    this.id = id;
    this.titulo = titulo;
    this.URL = URL;
  }
}

export class LeccionDTO {
  constructor({ id, titulo, descripcion, fecha_creacion, multimedia, id_curso, createdAt, updatedAt }) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.fecha_creacion = fecha_creacion;
    // multimedia es un array ojo jsjss
    this.multimedia = multimedia; 
    this.id_curso = id_curso;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
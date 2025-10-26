export class CursoDTO {
  constructor({ id, titulo, descripcion, id_maestro, createdAt, updatedAt }) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.id_maestro = id_maestro;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
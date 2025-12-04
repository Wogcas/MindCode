export class CursoDTO {
  constructor({ id, titulo, descripcion, id_maestro, visibilidad, imagen, createdAt, updatedAt }) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.id_maestro = id_maestro;
    this.visibilidad = visibilidad || 'Privado';
    this.imagen = imagen || 'https://via.placeholder.com/800x450?text=Curso';
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
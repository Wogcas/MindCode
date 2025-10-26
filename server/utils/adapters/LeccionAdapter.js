import { LeccionDTO, MultimediaDTO } from "../dtos/LeccionDTO.js";

export const LeccionAdapter = {
  toDTO: (document) => {
    if (!document) return null;
    
    const doc = document.toObject ? document.toObject() : document;

    return new LeccionDTO({
      id: doc._id.toString(),
      titulo: doc.titulo,
      descripcion: doc.descripcion,
      fecha_creacion: doc.fecha_creacion,
      multimedia: doc.multimedia.map(m => new MultimediaDTO({
        id: m._id.toString(),
        titulo: m.titulo,
        URL: m.URL
      })),
      id_curso: doc.id_curso.toString(),
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }
};
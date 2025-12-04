import { CursoDTO } from "../dtos/CursoDTO.js";

export const CursoAdapter = {
  toDTO: (document) => {
    if (!document) return null;
    
    const doc = document.toObject ? document.toObject() : document;

    return new CursoDTO({
      id: doc._id.toString(),
      titulo: doc.titulo,
      descripcion: doc.descripcion,
      id_maestro: doc.id_maestro.toString(),
      visibilidad: doc.visibilidad,
      imagen: doc.imagen,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }
};
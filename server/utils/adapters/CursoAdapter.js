import { CursoDTO } from "../dtos/CursoDTO.js";

export const CursoAdapter = {
  toDTO: (document) => {
    if (!document) return null;
    
    // esto es para que si el documento es el resultado de .lean(), 
    // el id no será un objectid
    const doc = document.toObject ? document.toObject() : document;

    return new CursoDTO({
      id: doc._id.toString(),
      titulo: doc.titulo,
      descripcion: doc.descripcion,
      id_maestro: doc.id_maestro.toString(),
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }
};
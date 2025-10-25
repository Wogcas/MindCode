import { RetoDTO, PreguntaDTO, RespuestaDTO } from "../dtos/reto.dto.js";

export const RetoAdapter = {
  toDTO: (document) => {
    if (!document) return null;
    
    const doc = document.toObject ? document.toObject() : document;

    return new RetoDTO({
      id: doc._id.toString(),
      titulo: doc.titulo,
      descripcion: doc.descripcion,
      fecha_creacion: doc.fecha_creacion,
      preguntas: doc.preguntas.map(p => new PreguntaDTO({
        id: p._id.toString(),
        contenido: p.contenido,
        tipo: p.tipo,
        respuestas: p.respuestas.map(r => new RespuestaDTO({
          id: r._id.toString(),
          contenido: r.contenido,
          es_correcta: r.es_correcta,
        }))
      })),
      lecciones: doc.lecciones.map(l => l.toString()),
    });
  }
};
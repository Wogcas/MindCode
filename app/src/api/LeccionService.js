import { client } from './apiClient.js';

export class LeccionService {
  
  // Obtener lecciones (Tu backend parece usar /lecciones/curso/:id)
  static async getByCursoId(cursoId) {
    try {
      // Pide al backend: GET /api/lecciones/curso/123
      const response = await client.request(`/lecciones/curso/${cursoId}`, { method: 'GET' });
      return response.data || [];
    } catch (error) {
      // Si no hay lecciones, tu backend podría devolver 404, lo manejamos limpio
      if (error.status === 404) return [];
      throw error;
    }
  }

  // 2. Crear lección (Usa tu ruta existente POST /agregar)
  static async create(data) {
    // Pide al backend: POST /api/lecciones/agregar
    return await client.request('/lecciones/agregar', {
        method: 'POST',
        body: JSON.stringify(data)
    });
  }

  // Si tienes endpoints para contenido multimedia, ajusta aquí también
  static async addContenido(leccionId, contenidoData) {
     // Verifica en tu LeccionRoute.js cómo se llama esta ruta
     // Por ahora asumimos una estructura estándar:
    return await client.request(`/lecciones/${leccionId}/contenido`, {
        method: 'POST',
        body: JSON.stringify(contenidoData)
    });
  }
}
import { client } from './apiClient.js';

export class LeccionService {
  
  // 1. Obtener lecciones por curso
  static async getByCursoId(cursoId) {
    try {
      // Esta ruta coincide con tu 'LeccionRoute.js' -> router.get('/curso/:id_curso', ...)
      const response = await client.request(`/lecciones/curso/${cursoId}`, { 
          method: 'GET' 
      });
      
      console.log("Lecciones obtenidas:", response);
      // Tu backend parece devolver la respuesta directa o dentro de un objeto data.
      // Esto maneja ambos casos para prevenir errores.
      if (Array.isArray(response)) return response;
      if (response.data && Array.isArray(response.data)) return response.data;
      if (response.lecciones && Array.isArray(response.lecciones)) return response.lecciones;
      
      return [];
    } catch (error) {
      console.error("Error fetching lecciones:", error);
      // Si no hay lecciones (404), devolvemos array vacío
      if (error.status === 404) return [];
      throw error;
    }
  }

  // 2. Crear lección
  static async create(data) {
    // Aseguramos que los nombres de los campos coincidan con lo que espera tu 'LeccionController.js'
    // Tu backend espera: { id_curso, titulo, descripcion, ... }
    return await client.request('/lecciones/agregar', {
        method: 'POST',
        body: JSON.stringify(data)
    });
  }
}
const API_BASE_URL = 'http://localhost:3000/api';

class RetoAPI {
  
  // 1. Obtener Token (CORREGIDO)
  getHeaders() {
    // CORRECCIÓN AQUÍ: Usamos JSON.parse en lugar de localStorage.parse
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    const token = usuario.token || localStorage.getItem('token');
    
    const headers = {
      'Content-Type': 'application/json'
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }

  // 2. Manejar Errores
  async handleResponse(response) {
    const text = await response.text();
    // Si la respuesta está vacía (ej. 204), devolvemos objeto vacío
    const data = text ? JSON.parse(text) : {};
    
    if (!response.ok) {
      const error = new Error(data.message || 'Error en la petición');
      error.status = response.status;
      error.data = data;
      throw error;
    }
    
    return data;
  }

  // 3. Método Genérico
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers
      }
    };

    try {
      const response = await fetch(url, config);
      return await this.handleResponse(response);
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // --- MÉTODOS DE NEGOCIO ---

  async crearReto(retoData) {
    return this.request('/retos/agregar', {
      method: 'POST',
      body: JSON.stringify(retoData)
    });
  }

  async obtenerRetosPorLeccion(leccionId) {
    return this.request(`/retos/retoLeccion/${leccionId}`, {
        method: 'GET'
    });
  }

  async actualizarReto(retoId, retoData) {
    return this.request(`/retos/actualizar/${retoId}`, {
        method: 'PUT',
        body: JSON.stringify(retoData)
    });
  }

  async eliminarReto(retoId) {
    return this.request(`/retos/eliminar/${retoId}`, {
        method: 'DELETE'
    });
  }
}

const retoAPI = new RetoAPI();
export default retoAPI;
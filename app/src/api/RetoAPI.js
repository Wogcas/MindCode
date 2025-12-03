const API_BASE_URL = 'http://localhost:3000/api';

class RetoAPI {
  
  getHeaders() {
    const token = localStorage.getItem('token');
    
    const headers = {
      'Content-Type': 'application/json'
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }

  async handleResponse(response) {
    const data = await response.json();
    
    if (!response.ok) {
      const error = new Error(data.message || 'Error en la petición');
      error.status = response.status;
      error.data = data;
      throw error;
    }
    
    return data;
  }

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

  async crearReto(retoData) {
    return this.request('/retos/agregar', {
      method: 'POST',
      body: JSON.stringify(retoData)
    });
  }

  async obtenerTodosLosRetos() {
    return this.request('/retos', {
      method: 'GET'
    });
  }
}

const retoAPI = new RetoAPI();
export default retoAPI;
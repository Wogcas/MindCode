import RetoService from "../services/RetoService.js";

const retoService = new RetoService();

export default class RetoController {

  async crearReto(req, res) {
    try {
      const retoBody = req.body;
      const nuevoReto = await retoService.crearReto(retoBody);
      
      res.status(201).json(nuevoReto); 
    } catch (error) {
      if (error.message.startsWith('Service Error:')) {
        res.status(400).json({ message: error.message });
      } else {
        console.error('Error al crear reto:', error);
        res.status(500).json({ message: 'Error interno del servidor al crear el reto.' });
      }
    }
  }

  async modificarReto(req, res) {
    try {
      const idReto = req.params.id; 
      const retoModificadoBody = req.body;

      const retoActualizado = await retoService.modificarReto(idReto, retoModificadoBody);
      
      res.status(200).json(retoActualizado);
    } catch (error) {
      if (error.message.startsWith('Service Error:')) {
        res.status(404).json({ message: error.message });
      } else {
        console.error(`Error al modificar reto ${idReto}:`, error);
        res.status(500).json({ message: 'Error interno del servidor al modificar el reto.' });
      }
    }
  }

  async eliminarReto(req, res) {
    try {
      const idReto = req.params.id;
      const mensaje = await retoService.eliminarReto(idReto);
      
      res.status(200).json(mensaje);
    } catch (error) {
      if (error.message.startsWith('Service Error:')) {
        res.status(404).json({ message: error.message });
      } else {
        console.error(`Error al eliminar reto ${idReto}:`, error);
        res.status(500).json({ message: 'Error interno del servidor al eliminar el reto.' });
      }
    }
  }

  async obtenerTodosLosRetos(req, res) {
    try {
      const retos = await retoService.obtenerTodosLosRetos();
      res.status(200).json(retos);
    } catch (error) {
      console.error('Error al obtener todos los retos:', error);
      res.status(500).json({ message: 'Error interno del servidor al obtener los retos.' });
    }
  }

  async obtenerReto(req, res) {
    try {
      const idReto = req.params.id;
      const reto = await retoService.obtenerReto(idReto);

      res.status(200).json(reto);
    } catch (error) {
      if (error.message.startsWith('Service Error:')) {
        res.status(404).json({ message: error.message });
      } else {
        console.error(`Error al obtener reto ${idReto}:`, error);
        res.status(500).json({ message: 'Error interno del servidor al obtener el reto.' });
      }
    }
  }

  async obtenerRetoPorTitulo(req, res) {
    try {
      const titulo = req.params.titulo; 

      if (!titulo) {
        return res.status(400).json({ message: "El parámetro 'titulo' es requerido." });
      }
      const reto = await retoService.obtenerRetoPorTitulo(titulo);

      res.status(200).json(reto);
    } catch (error) {
      if (error.message.startsWith('Service Error:')) {
        res.status(404).json({ message: error.message });
      } else {
        console.error(`Error al obtener reto por título ${titulo}:`, error);
        res.status(500).json({ message: 'Error interno del servidor al buscar el reto.' });
      }
    }
  }

  async obtenerRetosPorLeccion(req, res) {
    try {
      const idLeccion = req.params.id; 

      const retos = await retoService.obtenerRetosPorLeccion(idLeccion);
      
      res.status(200).json(retos);
    } catch (error) {
      if (error.message.startsWith('Service Error:')) {
        res.status(404).json({ message: error.message });
      } else {
        console.error(`Error al obtener retos para lección ${idLeccion}:`, error);
        res.status(500).json({ message: 'Error interno del servidor al obtener los retos de la lección.' });
      }
    }
  }
    
}
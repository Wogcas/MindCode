// controllers/UsuarioController.js

import UsuarioRepository from '../repositories/UsuarioRepository.js';
import { UsuarioAdapter } from '../utils/adapters/UsuarioAdapter.js';
import { NotFoundError, ValidationError, ConflictError } from '../auth/errorHandler.js';
import bcrypt from 'bcryptjs';

const usuarioRepository = new UsuarioRepository();

export class UsuarioController {
  
  // Crear un nuevo usuario
  async crearUsuario(req, res) {
    const { nombre, correo, contrasena, tipo } = req.body;

    // Verificar si el correo ya existe
    const usuarioExistente = await usuarioRepository.obtenerUsuarioPorCorreo(correo);
    if (usuarioExistente) {
      throw new ConflictError('El correo electrónico ya está registrado');
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const contrasenaEncriptada = await bcrypt.hash(contrasena, salt);

    // Crear usuario
    const nuevoUsuario = await usuarioRepository.agregarUsuario({
      nombre,
      correo,
      contrasena: contrasenaEncriptada,
      tipo
    });

    const usuarioDTO = UsuarioAdapter.toDTO(nuevoUsuario);

    res.status(201).json({
      success: true,
      message: 'Usuario creado exitosamente',
      data: usuarioDTO
    });
  }

  // Obtener todos los usuarios
  async obtenerUsuarios(req, res) {
    const usuarios = await usuarioRepository.obtenerUsuario();
    const usuariosDTO = UsuarioAdapter.toDTOArray(usuarios);

    res.status(200).json({
      success: true,
      count: usuariosDTO.length,
      data: usuariosDTO
    });
  }

  // Obtener un usuario por ID
  async obtenerUsuarioPorId(req, res) {
    const { id } = req.params;

    const usuario = await usuarioRepository.obtenerUsuarioPorId(id);
    
    if (!usuario) {
      throw new NotFoundError('Usuario no encontrado');
    }

    const usuarioDTO = UsuarioAdapter.toDTO(usuario);

    res.status(200).json({
      success: true,
      data: usuarioDTO
    });
  }

  // Obtener un usuario por correo
  async obtenerUsuarioPorCorreo(req, res) {
    const { correo } = req.params;

    const usuario = await usuarioRepository.obtenerUsuarioPorCorreo(correo);
    
    if (!usuario) {
      throw new NotFoundError('Usuario no encontrado');
    }

    const usuarioDTO = UsuarioAdapter.toDTO(usuario);

    res.status(200).json({
      success: true,
      data: usuarioDTO
    });
  }

  // Actualizar un usuario
  async actualizarUsuario(req, res) {
    const { id } = req.params;
    const { nombre, correo, tipo, sobreMi, fotoPerfil } = req.body;

    // Verificar si el usuario existe
    const usuarioExistente = await usuarioRepository.obtenerUsuarioPorId(id);
    if (!usuarioExistente) {
      throw new NotFoundError('Usuario no encontrado');
    }

    // Si se actualiza el correo, verificar que no esté en uso
    if (correo && correo !== usuarioExistente.correo) {
      const correoEnUso = await usuarioRepository.obtenerUsuarioPorCorreo(correo);
      if (correoEnUso) {
        throw new ConflictError('El correo electrónico ya está en uso');
      }
    }

    const datosActualizados = {};
    if (nombre) datosActualizados.nombre = nombre;
    if (correo) datosActualizados.correo = correo;
    if (tipo) datosActualizados.tipo = tipo;
    if (sobreMi !== undefined) datosActualizados.sobreMi = sobreMi;
    if (fotoPerfil !== undefined) datosActualizados.fotoPerfil = fotoPerfil;

    const usuarioActualizado = await usuarioRepository.actualizarUsuario(id, datosActualizados);
    const usuarioDTO = UsuarioAdapter.toDTO(usuarioActualizado);

    res.status(200).json({
      success: true,
      message: 'Usuario actualizado exitosamente',
      data: usuarioDTO
    });
  }

  // Obtener perfil del usuario autenticado
  async obtenerMiPerfil(req, res) {
    const { id } = req.usuario;

    const usuario = await usuarioRepository.obtenerUsuarioPorId(id);
    
    if (!usuario) {
      throw new NotFoundError('Usuario no encontrado');
    }

    const usuarioDTO = UsuarioAdapter.toDTO(usuario);

    res.status(200).json({
      success: true,
      data: usuarioDTO
    });
  }

  // Actualizar perfil del usuario autenticado
  async actualizarMiPerfil(req, res) {
    const { id } = req.usuario;
    const { nombre, sobreMi, fotoPerfil } = req.body;

    // Verificar si el usuario existe
    const usuarioExistente = await usuarioRepository.obtenerUsuarioPorId(id);
    if (!usuarioExistente) {
      throw new NotFoundError('Usuario no encontrado');
    }

    const datosActualizados = {};
    if (nombre !== undefined) datosActualizados.nombre = nombre;
    if (sobreMi !== undefined) datosActualizados.sobreMi = sobreMi;
    if (fotoPerfil !== undefined) datosActualizados.fotoPerfil = fotoPerfil;

    const usuarioActualizado = await usuarioRepository.actualizarUsuario(id, datosActualizados);
    const usuarioDTO = UsuarioAdapter.toDTO(usuarioActualizado);

    res.status(200).json({
      success: true,
      message: 'Perfil actualizado exitosamente',
      data: usuarioDTO
    });
  }

  // Eliminar un usuario
  async eliminarUsuario(req, res) {
    const { id } = req.params;

    const usuario = await usuarioRepository.obtenerUsuarioPorId(id);
    if (!usuario) {
      throw new NotFoundError('Usuario no encontrado');
    }

    await usuarioRepository.eliminarUsuario(id);

    res.status(200).json({
      success: true,
      message: 'Usuario eliminado exitosamente'
    });
  }

  // Operaciones para el alumno

  // Agregar curso a progreso
  async agregarCursoAProgreso(req, res) {
    const { id } = req.params;
    const { id_curso } = req.body;

    const usuario = await usuarioRepository.agregarCursoAProgreso(id, id_curso);
    const usuarioDTO = UsuarioAdapter.toDTO(usuario);

    res.status(200).json({
      success: true,
      message: 'Curso agregado al progreso exitosamente',
      data: usuarioDTO
    });
  }

  // Marcar lección como completada
  async marcarLeccionCompletada(req, res) {
    const { id } = req.params;
    const { id_curso, id_leccion } = req.body;

    const usuario = await usuarioRepository.marcarLeccionCompletada(id, id_curso, id_leccion);
    const usuarioDTO = UsuarioAdapter.toDTO(usuario);

    res.status(200).json({
      success: true,
      message: 'Lección marcada como completada',
      data: usuarioDTO
    });
  }

  // Actualizar porcentaje de progreso
  async actualizarPorcentajeProgreso(req, res) {
    const { id } = req.params;
    const { id_curso, porcentaje } = req.body;

    const usuario = await usuarioRepository.actualizarPorcentajeProgreso(id, id_curso, porcentaje);
    const usuarioDTO = UsuarioAdapter.toDTO(usuario);

    res.status(200).json({
      success: true,
      message: 'Porcentaje de progreso actualizado',
      data: usuarioDTO
    });
  }

  // Obtener progreso de cursos
  async obtenerProgresoCursos(req, res) {
    const { id } = req.params;

    const progreso = await usuarioRepository.obtenerProgresoCursos(id);

    res.status(200).json({
      success: true,
      data: progreso
    });
  }

  //Operaciones para el Maestro/instructor

  // Agregar curso impartido
  async agregarCursoImpartido(req, res) {
    const { id } = req.params;
    const { id_curso, titulo_curso } = req.body;

    const usuario = await usuarioRepository.agregarCursoImpartido(id, id_curso, titulo_curso);
    const usuarioDTO = UsuarioAdapter.toDTO(usuario);

    res.status(200).json({
      success: true,
      message: 'Curso impartido agregado exitosamente',
      data: usuarioDTO
    });
  }

  // Eliminar curso impartido
  async eliminarCursoImpartido(req, res) {
    const { id } = req.params;
    const { id_curso } = req.body;

    const usuario = await usuarioRepository.eliminarCursoImpartido(id, id_curso);
    const usuarioDTO = UsuarioAdapter.toDTO(usuario);

    res.status(200).json({
      success: true,
      message: 'Curso impartido eliminado exitosamente',
      data: usuarioDTO
    });
  }

  // Obtener cursos impartidos
  async obtenerCursosImpartidos(req, res) {
    const { id } = req.params;

    const cursos = await usuarioRepository.obtenerCursosImpartidos(id);

    res.status(200).json({
      success: true,
      data: cursos
    });
  }

  // Operaciones de filtrado

  // Obtener solo alumnos
  async obtenerAlumnos(req, res) {
    const alumnos = await usuarioRepository.obtenerAlumnos();
    const alumnosDTO = UsuarioAdapter.toDTOArray(alumnos);

    res.status(200).json({
      success: true,
      count: alumnosDTO.length,
      data: alumnosDTO
    });
  }

  // Obtener solo maestros
  async obtenerMaestros(req, res) {
    const maestros = await usuarioRepository.obtenerMaestros();
    const maestrosDTO = UsuarioAdapter.toDTOArray(maestros);

    res.status(200).json({
      success: true,
      count: maestrosDTO.length,
      data: maestrosDTO
    });
  }

  // Contar usuarios por tipo
  async contarPorTipo(req, res) {
    const conteo = await usuarioRepository.contarPorTipo();

    res.status(200).json({
      success: true,
      data: conteo
    });
  }
}
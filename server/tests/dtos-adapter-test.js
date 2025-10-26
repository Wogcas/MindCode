/**
 * Test de DTOs y Adapters
 * Prueba la correcta transformación de documentos MongoDB a DTOs
 */

import { CursoAdapter } from '../utils/adapters/CursoAdapter.js';
import { LeccionAdapter } from '../utils/adapters/LeccionAdapter.js';
import { RetoAdapter } from '../utils/adapters/RetoAdapter.js';
import { UsuarioAdapter } from '../utils/adapters/UsuarioAdapter.js';

// Documentos de prueba simulando respuestas de MongoDB
const mockCursoDocument = {
  _id: '507f1f77bcf86cd799439011',
  titulo: 'Introducción a JavaScript',
  descripcion: 'Aprende los fundamentos de JavaScript',
  id_maestro: '507f1f77bcf86cd799439012',
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-01-20'),
  toObject: function() { return this; }
};

const mockLeccionDocument = {
  _id: '507f1f77bcf86cd799439013',
  titulo: 'Variables y Tipos de Datos',
  descripcion: 'Conceptos básicos de variables',
  fecha_creacion: new Date('2024-01-16'),
  multimedia: [
    {
      _id: '507f1f77bcf86cd799439014',
      titulo: 'Video Tutorial',
      URL: 'https://example.com/video1.mp4'
    },
    {
      _id: '507f1f77bcf86cd799439015',
      titulo: 'PDF de Apoyo',
      URL: 'https://example.com/doc1.pdf'
    }
  ],
  id_curso: '507f1f77bcf86cd799439011',
  createdAt: new Date('2024-01-16'),
  updatedAt: new Date('2024-01-17'),
  toObject: function() { return this; }
};

const mockRetoDocument = {
  _id: '507f1f77bcf86cd799439016',
  titulo: 'Quiz de JavaScript Básico',
  descripcion: 'Evalúa tus conocimientos básicos',
  fecha_creacion: new Date('2024-01-18'),
  preguntas: [
    {
      _id: '507f1f77bcf86cd799439017',
      contenido: '¿Qué es una variable?',
      tipo: 'opcion_multiple',
      respuestas: [
        {
          _id: '507f1f77bcf86cd799439018',
          contenido: 'Un contenedor para almacenar datos',
          es_correcta: true
        },
        {
          _id: '507f1f77bcf86cd799439019',
          contenido: 'Una función',
          es_correcta: false
        }
      ]
    }
  ],
  lecciones: ['507f1f77bcf86cd799439013', '507f1f77bcf86cd799439020'],
  toObject: function() { return this; }
};

const mockUsuarioAlumnoDocument = {
  _id: '507f1f77bcf86cd799439021',
  nombre: 'Juan Pérez',
  correo: 'juan@example.com',
  tipo: 'Alumno',
  progreso_cursos: [
    {
      id_curso: '507f1f77bcf86cd799439011',
      porcentaje: 45,
      lecciones_completadas: ['507f1f77bcf86cd799439013']
    }
  ],
  cursos_impartidos: undefined,
  createdAt: new Date('2024-01-10'),
  updatedAt: new Date('2024-01-22'),
  toObject: function() { return this; }
};

const mockUsuarioMaestroDocument = {
  _id: '507f1f77bcf86cd799439012',
  nombre: 'María García',
  correo: 'maria@example.com',
  tipo: 'Maestro',
  progreso_cursos: undefined,
  cursos_impartidos: [
    {
      id_curso: '507f1f77bcf86cd799439011',
      titulo_curso: 'Introducción a JavaScript'
    }
  ],
  createdAt: new Date('2024-01-05'),
  updatedAt: new Date('2024-01-20'),
  toObject: function() { return this; }
};

// Funciones de prueba
console.log('=== PRUEBA DE ADAPTERS Y DTOs ===\n');

// Test 1: CursoAdapter
console.log('1. Test CursoAdapter:');
const cursoDTO = CursoAdapter.toDTO(mockCursoDocument);
console.log('✓ DTO generado:', cursoDTO);
console.log('✓ Verifica id como string:', typeof cursoDTO.id === 'string');
console.log('✓ Verifica id_maestro como string:', typeof cursoDTO.id_maestro === 'string');
console.log('✓ Verifica null handling:', CursoAdapter.toDTO(null) === null);
console.log('');

// Test 2: LeccionAdapter
console.log('2. Test LeccionAdapter:');
const leccionDTO = LeccionAdapter.toDTO(mockLeccionDocument);
console.log('✓ DTO generado:', leccionDTO);
console.log('✓ Verifica multimedia es array:', Array.isArray(leccionDTO.multimedia));
console.log('✓ Cantidad de multimedia:', leccionDTO.multimedia.length);
console.log('✓ Primer multimedia:', leccionDTO.multimedia[0]);
console.log('');

// Test 3: RetoAdapter
console.log('3. Test RetoAdapter:');
const retoDTO = RetoAdapter.toDTO(mockRetoDocument);
console.log('✓ DTO generado:', retoDTO);
console.log('✓ Verifica preguntas es array:', Array.isArray(retoDTO.preguntas));
console.log('✓ Cantidad de preguntas:', retoDTO.preguntas.length);
console.log('✓ Primera pregunta:', retoDTO.preguntas[0]);
console.log('✓ Respuestas de primera pregunta:', retoDTO.preguntas[0].respuestas);
console.log('✓ Lecciones asociadas:', retoDTO.lecciones);
console.log('');

// Test 4: UsuarioAdapter - Alumno
console.log('4. Test UsuarioAdapter (Alumno):');
const alumnoDTO = UsuarioAdapter.toDTO(mockUsuarioAlumnoDocument);
console.log('✓ DTO generado:', alumnoDTO);
console.log('✓ Tipo de usuario:', alumnoDTO.tipo);
console.log('✓ Tiene progreso_cursos:', alumnoDTO.progreso_cursos !== undefined);
console.log('✓ cursos_impartidos es undefined:', alumnoDTO.cursos_impartidos === undefined);
console.log('✓ Progreso del curso:', alumnoDTO.progreso_cursos[0]);
console.log('✓ Lecciones completadas (detalle):', alumnoDTO.progreso_cursos[0].lecciones_completadas);
console.log('');

// Test 5: UsuarioAdapter - Maestro
console.log('5. Test UsuarioAdapter (Maestro):');
const maestroDTO = UsuarioAdapter.toDTO(mockUsuarioMaestroDocument);
console.log('✓ DTO generado:', maestroDTO);
console.log('✓ Tipo de usuario:', maestroDTO.tipo);
console.log('✓ Tiene cursos_impartidos:', maestroDTO.cursos_impartidos !== undefined);
console.log('✓ progreso_cursos es undefined:', maestroDTO.progreso_cursos === undefined);
console.log('✓ Cursos impartidos:', maestroDTO.cursos_impartidos);
console.log('');

// Test 6: Verificación de estructura de DTOs
console.log('6. Verificación de campos obligatorios:');
console.log('✓ CursoDTO tiene todos los campos:', 
  cursoDTO.id && cursoDTO.titulo && cursoDTO.descripcion && cursoDTO.id_maestro);
console.log('✓ LeccionDTO tiene todos los campos:', 
  leccionDTO.id && leccionDTO.titulo && leccionDTO.fecha_creacion && leccionDTO.id_curso);
console.log('✓ RetoDTO tiene todos los campos:', 
  retoDTO.id && retoDTO.titulo && retoDTO.preguntas && retoDTO.lecciones);
console.log('✓ UsuarioDTO tiene todos los campos:', 
  alumnoDTO.id && alumnoDTO.nombre && alumnoDTO.correo && alumnoDTO.tipo);
console.log('');

console.log('=== TODAS LAS PRUEBAS COMPLETADAS ===');

// Mock data para cursos del alumno

export const cursosEstudiante = [
  {
    id: 1,
    titulo: "Todo lo que tienes que saber de iOS",
    imagen: "https://img.uxcel.com/cdn-cgi/image/format=auto/tags/ios-1721717446446-2x.jpg",
    profesor: "Abdul",
    progreso: 80,
    participantes: "20/25",
    totalLecciones: 15,
    leccionesCompletadas: 12
  },
  {
    id: 2,
    titulo: "Todo lo que tienes que saber de React",
    imagen: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
    profesor: "Abdul",
    progreso: 40,
    participantes: "10/25",
    totalLecciones: 20,
    leccionesCompletadas: 8
  },
  {
    id: 3,
    titulo: "Todo lo que tienes que saber de React",
    imagen: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
    profesor: "Abdul",
    progreso: 32,
    participantes: "08/25",
    totalLecciones: 18,
    leccionesCompletadas: 6
  }
];

export const cursosDetalles = {
  1: {
    id: 1,
    titulo: "Todo lo que tienes que saber de iOS",
    descripcion: "¡Hola 👋 Soy Abdul, tu profesor y me emociona mucho que te unas a este curso. Si estas interesado en el funcionamiento de iOS, deseas conocer mas de esta plataforma, este es el lugar.",
    imagen: "https://img.uxcel.com/cdn-cgi/image/format=auto/tags/ios-1721717446446-2x.jpg",
    profesor: {
      nombre: "Abdul",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    fechaPublicacion: "11/09/2025",
    modulos: [
      {
        id: "modulo-1",
        titulo: "Lección 1: Tu primer \"Hola Mundo!\"",
        lecciones: [
          { id: "leccion-1-1", titulo: "Lección 1: Tu primer \"Hola Mundo!\"", tipo: "video", completada: true, contenido: { videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" } },
          { id: "leccion-1-2", titulo: "Lección 1: Tu primer \"Hola Mundo!\"", tipo: "texto", completada: true, contenido: { texto: "Contenido" } },
          { id: "leccion-1-3", titulo: "Lección 1: Tu primer \"Hola Mundo!\"", tipo: "texto", completada: true, contenido: { texto: "Contenido" } },
          { id: "leccion-1-4", titulo: "Lección 1: Tu primer \"Hola Mundo!\"", tipo: "texto", completada: false, contenido: { texto: "Contenido" } }
        ]
      },
      {
        id: "modulo-2",
        titulo: "Lección 2: Almacenando Información con Variables",
        lecciones: [
          { id: "leccion-2-1", titulo: "Lección 2: Almacenando Información con Variables", tipo: "video", completada: false, contenido: { videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" } }
        ]
      },
      {
        id: "modulo-3",
        titulo: "Lección 3: Tipos de Datos: los \"ingredientes\" de tu código",
        lecciones: [
          { id: "leccion-3-1", titulo: "Lección 3: Lorem Ipsum", tipo: "texto", completada: false, contenido: { texto: "Contenido" } },
          { id: "leccion-3-2", titulo: "Reto 1", tipo: "reto", completada: false, contenido: null }
        ]
      },
      {
        id: "modulo-4",
        titulo: "Lección 4: Operadores: lo que hace que tu código funcione",
        lecciones: [
          { id: "leccion-4-1", titulo: "Lección 4: Operadores: lo que hace que tu código funcione", tipo: "texto", completada: false, contenido: null }
        ]
      },
      {
        id: "modulo-5",
        titulo: "Lección 5: Tomando Decisiones con Condicionales",
        lecciones: [
          { id: "leccion-5-1", titulo: "Lección 5: Tomando Decisiones con Condicionales", tipo: "texto", completada: false, contenido: null }
        ]
      },
      {
        id: "modulo-6",
        titulo: "Lección 6: Bloques Switch y Bucles",
        lecciones: [
          { id: "leccion-6-1", titulo: "Lección 6: Bloques Switch y Bucles", tipo: "texto", completada: false, contenido: null }
        ]
      }
    ]
  },
  2: {
    id: 2,
    titulo: "Todo lo que tienes que saber de React",
    descripcion: "¡Hola 👋 Soy Abdul, tu profesor y me emociona mucho que te unas a este curso. Si estas interesado en el funcionamiento de React, deseas conocer mas de esta librería adelante, este es el lugar.",
    imagen: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
    profesor: {
      nombre: "Abdul",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    fechaPublicacion: "12/09/2025",
    modulos: [
      {
        id: "modulo-1",
        titulo: "Lección 1: Tu primer \"Hola Mundo!\"",
        lecciones: [
          { id: "leccion-1-1", titulo: "Lección 1: Tu primer \"Hola Mundo!\"", tipo: "video", completada: true, contenido: { videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" } },
          { id: "leccion-1-2", titulo: "Lección 2: Componentes de React", tipo: "video", completada: false, contenido: { videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" } },
          { id: "leccion-1-3", titulo: "Lección 3: Lorem Ipsum", tipo: "texto", completada: false, contenido: { texto: "Contenido" } },
          { id: "reto-1", titulo: "Reto 1", tipo: "reto", completada: false, contenido: null }
        ]
      },
      {
        id: "modulo-2",
        titulo: "Lección 2: Almacenando Información con Variables",
        lecciones: [
          { id: "leccion-2-1", titulo: "Lección 2: Almacenando Información con Variables", tipo: "video", completada: false, contenido: { videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" } }
        ]
      },
      {
        id: "modulo-3",
        titulo: "Lección 3: Tipos de Datos: los \"ingredientes\" de tu código",
        lecciones: [
          { id: "leccion-3-1", titulo: "Lección 3: Tipos de Datos", tipo: "texto", completada: false, contenido: null }
        ]
      }
    ]
  },
  3: {
    id: 3,
    titulo: "Todo lo que tienes que saber de React",
    descripcion: "¡Hola 👋 Soy Abdul, tu profesor y me emociona mucho que te unas a este curso.",
    imagen: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
    profesor: { nombre: "Abdul", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
    fechaPublicacion: "10/09/2025",
    modulos: [
      {
        id: "modulo-1",
        titulo: "Lección 1: Tu primer \"Hola Mundo!\"",
        lecciones: [
          { id: "leccion-1-1", titulo: "Lección 1: Tu primer \"Hola Mundo!\"", tipo: "video", completada: true, contenido: { videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" } }
        ]
      }
    ]
  }
};

export const retos = {
  "reto-1": {
    id: "reto-1",
    titulo: "Reto - Lección 2",
    leccion: "Lección 2: Componentes de React",
    cursoId: 2,
    descripcion: "¡Es hora de empezar con React! El principio más importante de esta librería es la idea del componente. Antes de preocuparte por el código y la sintaxis, debes entender qué función cumple un componente dentro de una aplicación web. ¡Demuéstranos que entiendes la base!",
    pregunta: "En el contexto de la librería React, ¿cuál es el propósito fundamental de un Componente?",
    opciones: [
      { id: "a", texto: "Actuar como un reemplazo para el lenguaje de programación JavaScript.", correcta: false },
      { id: "b", texto: "Organizar la base de datos y manejar la lógica del servidor (backend).", correcta: false },
      { id: "c", texto: "Dividir la Interfaz de Usuario (UI) en partes independientes y reutilizables.", correcta: true },
      { id: "d", texto: "Definir los estilos y el diseño visual de la página web (CSS).", correcta: false }
    ]
  },
  "leccion-3-2": {
    id: "leccion-3-2",
    titulo: "Reto - Lección 3",
    leccion: "Lección 3: Tipos de Datos",
    cursoId: 1,
    descripcion: "Ahora que comprendes los tipos de datos básicos en programación, es momento de poner a prueba tus conocimientos.",
    pregunta: "¿Cuál de los siguientes NO es un tipo de dato primitivo en JavaScript?",
    opciones: [
      { id: "a", texto: "String", correcta: false },
      { id: "b", texto: "Number", correcta: false },
      { id: "c", texto: "Array", correcta: true },
      { id: "d", texto: "Boolean", correcta: false }
    ]
  }
};

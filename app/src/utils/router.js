// Router simple basado en hash para navegación SPA sin frameworks

class Router {
  constructor(routes) {
    this.routes = routes;
    this.rootElement = null;
    this.currentComponent = null;
    
    // Esperar a que el DOM esté listo
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init());
    } else {
      this.init();
    }
  }

  init() {
    this.rootElement = document.getElementById('vista');
    
    if (!this.rootElement) {
      console.error('Element with id "app-root" not found');
      return;
    }

    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('load', () => this.handleRoute());
    
    // Manejar navegación inicial
    this.handleRoute();
  }

  handleRoute() {
    if (!this.rootElement) return;

    const hash = window.location.hash.slice(1) || '/';
    const [path, ...params] = hash.split('/').filter(p => p);
    
    const routePath = path ? `/${path}` : '/';
    const route = this.routes[routePath] || this.routes['/404'];
    
    if (route) {
      // Limpiar el contenedor
      this.rootElement.innerHTML = '';
      
      // Crear el nuevo componente
      const component = route.component;
      const element = document.createElement(component);
      
      // Pasar parámetros como atributos
      if (params.length > 0 && route.params) {
        route.params.forEach((paramName, index) => {
          if (params[index]) {
            element.setAttribute(paramName, params[index]);
          }
        });
      }
      
      this.rootElement.appendChild(element);
      this.currentComponent = element;

      // Scroll al top al cambiar de ruta
      window.scrollTo(0, 0);
    }
  }

  navigate(path) {
    window.location.hash = path;
  }
}

// Configuración de rutas
export const router = new Router({
  '/': { 
    component: 'dashboard-maestro' 
  },
  '/dashboard-maestro': { 
    component: 'dashboard-maestro' 
  },
  '/mis-cursos': { 
    component: 'mis-cursos-maestro' 
  },
  '/mis-cursos-maestro': { 
    component: 'mis-cursos-maestro' 
  },
  '/dashboard-alumno': { 
    component: 'dashboard-alumno' 
  },
  '/mis-cursos-alumno': { 
    component: 'mis-cursos-alumno' 
  },
  '/perfil': {
    component: 'editar-perfil'
  },
  '/curso': { 
    component: 'visor-leccion',
    params: ['cursoId', 'leccionId']
  },
  '/reto': {
    component: 'vista-reto',
    params: ['retoId']
  },
  '/404': { 
    component: 'pagina-404' 
  }
});

// Helper para navegación programática
export function navigateTo(path) {
  router.navigate(path);
}

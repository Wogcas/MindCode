// Router para la aplicación de estudiantes

class Router {
  constructor(routes) {
    this.routes = routes;
    this.rootElement = null;
    this.currentComponent = null;
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init());
    } else {
      this.init();
    }
  }

  init() {
    this.rootElement = document.getElementById('app-root');
    
    if (!this.rootElement) {
      console.error('Element with id "app-root" not found');
      return;
    }

    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('load', () => this.handleRoute());
    
    this.handleRoute();
  }

  handleRoute() {
    if (!this.rootElement) return;

    const hash = window.location.hash.slice(1) || '/';
    const [path, ...params] = hash.split('/').filter(p => p);
    
    const routePath = path ? `/${path}` : '/';
    const route = this.routes[routePath] || this.routes['/404'];
    
    if (route) {
      this.rootElement.innerHTML = '';
      
      const component = route.component;
      const element = document.createElement(component);
      
      if (params.length > 0 && route.params) {
        route.params.forEach((paramName, index) => {
          if (params[index]) {
            element.setAttribute(paramName, params[index]);
          }
        });
      }
      
      this.rootElement.appendChild(element);
      this.currentComponent = element;

      window.scrollTo(0, 0);
    }
  }

  navigate(path) {
    window.location.hash = path;
  }
}

// Configuración de rutas para estudiantes
export const router = new Router({
  '/': { 
    component: 'dashboard-alumno' 
  },
  '/dashboard': { 
    component: 'dashboard-alumno' 
  },
  '/mis-cursos': { 
    component: 'mis-cursos-alumno' 
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

export function navigateTo(path) {
  router.navigate(path);
}

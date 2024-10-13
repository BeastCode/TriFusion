import { Component, createElement } from './component';
import { Store } from './store';

interface Route {
  path: string;
  component: new (props: any) => Component;
  children?: Route[];
}

export class Router {
  private routes: Route[];
  private currentComponent: Component | null = null;
  private store: Store<any, any>;

  constructor(routes: Route[], store: Store<any, any>) {
    this.routes = routes;
    this.store = store;
    window.addEventListener('popstate', () => this.handleRouteChange());
    this.handleRouteChange();
  }

  private handleRouteChange() {
    const path = window.location.pathname;
    const matchedRoute = this.findMatchingRoute(this.routes, path);
    if (matchedRoute) {
      if (this.currentComponent) {
        this.currentComponent.unmount();
      }
      this.currentComponent = new matchedRoute.component({ store: this.store });
      const appElement = document.getElementById('app');
      if (appElement) {
        this.currentComponent.mount(appElement);
      } else {
        console.error('App element not found');
      }
    }
  }

  private findMatchingRoute(routes: Route[], path: string): Route | null {
    for (const route of routes) {
      if (route.path === path) {
        return route;
      }
      if (route.children) {
        const matchedChild = this.findMatchingRoute(route.children, path);
        if (matchedChild) {
          return matchedChild;
        }
      }
    }
    return null;
  }
}

export class Link extends Component {
  constructor(props: { to: string; children: string }) {
    super(props);
  }

  handleClick = (e: Event) => {
    e.preventDefault();
    history.pushState(null, '', this.props.to);
    window.dispatchEvent(new Event('popstate'));
  }

  render() {
    return createElement('a', { href: this.props.to, onClick: this.handleClick }, this.props.children);
  }
}
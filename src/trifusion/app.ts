import { Router } from './router';

export function createApp(router: Router) {
  return {
    mount(selector: string) {
      const root = document.querySelector(selector);
      if (!root) throw new Error(`Element ${selector} not found`);
      
      router.handleRouteChange();
    }
  };
}
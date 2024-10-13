import { createApp } from './trifusion/app';
import { Router, Link } from './trifusion/router';
import { createStore } from './trifusion/store';
import App from './App';
import About from './About';

// Create a simple store
const initialState = { count: 0 };
const reducer = (state = initialState, action: { type: string }) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
};
const store = createStore(reducer, initialState);

// Set up routing
const router = new Router([
  { path: '/', component: App },
  { path: '/about', component: About },
], store);

// Create and mount the app
const app = createApp(router);
app.mount('#app');

// Add this line for debugging
console.log('App mounted');
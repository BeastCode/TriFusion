export interface VNode {
  type: string | Function;
  props: { [key: string]: any };
  children: (VNode | string | null | boolean)[];
}

export function createElement(type: string | Function, props: { [key: string]: any } = {}, ...children: (VNode | string | null | boolean)[]): VNode {
  return { type, props, children: children.flat() };
}

// Helper functions for common HTML elements
export const div = (props: { [key: string]: any } = {}, ...children: (VNode | string | null | boolean)[]) => createElement('div', props, ...children);
export const p = (props: { [key: string]: any } = {}, ...children: (VNode | string | null | boolean)[]) => createElement('p', props, ...children);
export const h1 = (props: { [key: string]: any } = {}, ...children: (VNode | string | null | boolean)[]) => createElement('h1', props, ...children);
export const h2 = (props: { [key: string]: any } = {}, ...children: (VNode | string | null | boolean)[]) => createElement('h2', props, ...children);
export const button = (props: { [key: string]: any } = {}, ...children: (VNode | string | null | boolean)[]) => createElement('button', props, ...children);
export const input = (props: { [key: string]: any } = {}, ...children: (VNode | string | null | boolean)[]) => createElement('input', props, ...children);
export const form = (props: { [key: string]: any } = {}, ...children: (VNode | string | null | boolean)[]) => createElement('form', props, ...children);
export const label = (props: { [key: string]: any } = {}, ...children: (VNode | string | null | boolean)[]) => createElement('label', props, ...children);
export const span = (props: { [key: string]: any } = {}, ...children: (VNode | string | null | boolean)[]) => createElement('span', props, ...children);
export const br = () => createElement('br', {});
export const ul = (props: { [key: string]: any } = {}, ...children: (VNode | string | null | boolean)[]) => createElement('ul', props, ...children);
export const li = (props: { [key: string]: any } = {}, ...children: (VNode | string | null | boolean)[]) => createElement('li', props, ...children);

export function render(vnode: VNode | string | null | boolean, container: HTMLElement) {
  console.log('Rendering:', vnode);

  if (vnode === null || vnode === undefined || vnode === false) {
    return;
  }

  if (typeof vnode === 'string' || typeof vnode === 'number' || vnode === true) {
    container.appendChild(document.createTextNode(String(vnode)));
    return;
  }

  let element: HTMLElement;
  if (typeof vnode.type === 'string') {
    element = document.createElement(vnode.type);
    Object.entries(vnode.props).forEach(([key, value]) => {
      if (key.startsWith('on')) {
        element.addEventListener(key.slice(2).toLowerCase(), value as EventListener);
      } else {
        element.setAttribute(key, value as string);
      }
    });
  } else if (typeof vnode.type === 'function') {
    const component = new (vnode.type as any)(vnode.props);
    const renderedElement = component.render();
    render(renderedElement, container);
    return;
  } else {
    console.error('Invalid vnode type:', vnode.type);
    return;
  }

  vnode.children.forEach(child => {
    render(child, element);
  });
  container.appendChild(element);
}
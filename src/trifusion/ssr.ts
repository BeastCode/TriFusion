import { VNode } from './vdom';

export function renderToString(component: new () => any): string {
  const instance = new component();
  const vnode = instance.render();
  return renderVNodeToString(vnode);
}

function renderVNodeToString(vnode: VNode): string {
  if (typeof vnode === 'string') {
    return vnode;
  }

  if (typeof vnode.type === 'string') {
    const attrs = Object.entries(vnode.props)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ');
    const children = vnode.children.map(renderVNodeToString).join('');
    return `<${vnode.type} ${attrs}>${children}</${vnode.type}>`;
  }

  if (typeof vnode.type === 'function') {
    const component = new (vnode.type as any)(vnode.props);
    return renderVNodeToString(component.render());
  }

  return '';
}
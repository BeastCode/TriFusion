import { VNode, createElement, render, div, p, h1, h2, button, input, form, label, span, br, ul, li } from './vdom';
import { reactive, effect } from './reactive';

export abstract class Component {
  props: { [key: string]: any };
  state: { [key: string]: any };
  private element: HTMLElement | null = null;

  constructor(props: { [key: string]: any } = {}) {
    this.props = props;
    this.state = reactive({});
    this.componentWillMount();
    effect(() => this.update());
  }

  abstract render(): VNode;

  setState(newState: Partial<this['state']>) {
    Object.assign(this.state, newState);
  }

  mount(element: HTMLElement) {
    this.element = element;
    this.update();
    this.componentDidMount();
  }

  update() {
    if (this.element) {
      this.componentWillUpdate();
      this.element.innerHTML = '';
      const vnode = this.render();
      console.log('Component update, rendered:', vnode);
      render(vnode, this.element);
      this.componentDidUpdate();
    }
  }

  unmount() {
    this.componentWillUnmount();
    if (this.element) {
      this.element.innerHTML = '';
    }
  }

  // Lifecycle hooks
  componentWillMount() {}
  componentDidMount() {}
  componentWillUpdate() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
}

export { createElement, div, p, h1, h2, button, input, form, label, span, br, ul, li };
import { Component, createElement } from './trifusion/component';
import { Link } from './trifusion/router';
import { Store } from './trifusion/store';

interface AboutProps {
  store: Store<any, any>;
}

export default class About extends Component {
  private store: Store<any, any>;

  constructor(props: AboutProps) {
    super(props);
    this.store = props.store;
  }

  render() {
    return createElement('div', {},
      createElement('h1', {}, 'About TriFusion'),
      createElement('p', {}, 'TriFusion is a modern web framework combining the best features of Angular, React, and Vue.'),
      createElement(Link, { to: '/' }, 'Go to Home')
    );
  }
}
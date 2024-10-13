import { Component, div, h1, p, button, br, h2, ul, li } from './trifusion/component';
import { Link } from './trifusion/router';
import { Form, FormField } from './trifusion/form';
import { Store } from './trifusion/store';

interface AppProps {
  store: Store<any, any>;
}

export default class App extends Component {
  private store: Store<any, any>;

  constructor(props: AppProps) {
    super(props);
    this.store = props.store;
    this.state = {
      showForm: false,
      items: ['Apple', 'Banana', 'Cherry']
    };
  }

  componentDidMount() {
    console.log('App component mounted');
    // Subscribe to store changes
    this.store.subscribe(() => this.forceUpdate());
  }

  increment = () => {
    console.log('Increment button clicked');
    this.store.dispatch({ type: 'INCREMENT' });
  }

  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm });
  }

  render() {
    console.log('App render called');
    const count = this.store.getState().count;

    const formFields: FormField[] = [
      { name: 'username', type: 'text', value: '', validate: (value) => value ? null : 'Username is required' },
      { name: 'email', type: 'email', value: '', validate: (value) => /@/.test(value) ? null : 'Invalid email' },
    ];

    return div({},
      h1({}, 'Welcome to TriFusion'),
      p({}, 'This is a simple counter app built with TriFusion.'),
      p({}, `Count: ${count}`),
      button({ onClick: this.increment }, 'Increment'),
      br(),
      new Link({ to: '/about', children: 'About TriFusion' }).render(),
      
      button({ onClick: this.toggleForm }, this.state.showForm ? 'Hide Form' : 'Show Form'),
      this.state.showForm && div({},
        h2({}, 'Sample Form'),
        new Form({ fields: formFields }).render()
      ),

      h2({}, 'Fruit List'),
      ul({},
        this.state.items.map(item => li({}, item))
      ),

      this.state.items.length > 0 ?
        p({}, `There are ${this.state.items.length} fruits in the list.`) :
        p({}, 'The fruit list is empty.')
    );
  }

  forceUpdate() {
    this.update();
  }
}
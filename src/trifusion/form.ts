import { Component, form, div, label, input, span, button } from './component';

export interface FormField {
  name: string;
  type: string;
  value: string;
  validate?: (value: string) => string | null;
}

interface FormProps {
  fields: FormField[];
}

export class Form extends Component {
  state = {
    fields: {} as Record<string, FormField>,
    errors: {} as Record<string, string | null>,
  };

  constructor(props: FormProps) {
    super(props);
    const fieldMap = {} as Record<string, FormField>;
    props.fields.forEach(field => {
      fieldMap[field.name] = field;
    });
    this.state.fields = fieldMap;
  }

  handleChange = (name: string, value: string) => {
    this.setState({
      fields: {
        ...this.state.fields,
        [name]: { ...this.state.fields[name], value },
      },
    });
    this.validateField(name, value);
  };

  validateField(name: string, value: string) {
    const field = this.state.fields[name];
    if (field.validate) {
      const error = field.validate(value);
      this.setState({
        errors: { ...this.state.errors, [name]: error },
      });
    }
  }

  validateAll(): boolean {
    let isValid = true;
    Object.entries(this.state.fields).forEach(([name, field]) => {
      if (field.validate) {
        const error = field.validate(field.value);
        this.setState({
          errors: { ...this.state.errors, [name]: error },
        });
        if (error) {
          isValid = false;
        }
      }
    });
    return isValid;
  }

  handleSubmit = (e: Event) => {
    e.preventDefault();
    if (this.validateAll()) {
      // Form is valid, you can submit the data
      console.log('Form data:', this.state.fields);
    }
  };

  render() {
    return form({ onSubmit: this.handleSubmit },
      Object.entries(this.state.fields).map(([name, field]) =>
        div({},
          label({}, name),
          input({
            type: field.type,
            value: field.value,
            onChange: (e: Event) => this.handleChange(name, (e.target as HTMLInputElement).value),
          }),
          this.state.errors[name] && span({}, this.state.errors[name])
        )
      ),
      button({ type: 'submit' }, 'Submit')
    );
  }
}
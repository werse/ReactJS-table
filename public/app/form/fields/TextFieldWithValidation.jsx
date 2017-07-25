import React from 'react';
import {FormGroup, Col, FormControl, ControlLabel} from 'react-bootstrap';


export default class TextFieldWithValidation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formObject: props.formObject
    };
    this.getValidationState = this.getValidationState.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getValidationState() {
    const {id, field} = this.props;
    const value = this.state.formObject[id];
    if (!value) return 'warning';
    if (!field.pattern) return null;
    if (value.match(new RegExp(field.pattern, 'g'))) {
      return 'success';
    }
    return 'error';
  }

  handleChange(event) {
    const {formObject} = this.state;
    const {id} = this.props;
    formObject[id] = event.target.value;
    this.setState({formObject: formObject});
  }

  render() {
    const {label, hidden, required} = this.props.field;
    const {id} = this.props;
    const {formObject} = this.state;
    const placeholder = `Enter your ${label.toLowerCase()} ...`;
    return (
      <FormGroup controlId={id} validationState={required && this.getValidationState()}
                 className={`${hidden ? 'hidden' : ''}`}>
        <Col sm={3} componentClass={ControlLabel}>{label}</Col>
        <Col sm={9}>
          <FormControl type="text" autoComplete='off' placeholder={placeholder} onChange={this.handleChange}
                       value={formObject[id] || undefined} onBlur={this.props.onBlur}/>
          <FormControl.Feedback/>
        </Col>
      </FormGroup>
    );
  }
}

import React from 'react';
import {FormGroup, FormControl, ControlLabel, Col} from 'react-bootstrap';
import InputMask from 'react-input-mask';

export default class MaskedField extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formObject: props.formObject
    };
    this.handleChange = this.handleChange.bind(this);
  }

  getValidationState() {
    const {mask, pattern} = this.props.field;
    const {formObject} = this.state;
    const value = formObject[this.props.id];
    if (!value) return 'warning';
    if (!pattern) return null;
    if (value.match(new RegExp(pattern, 'g'))) {
      return 'success';
    }
    return 'error';
  }

  handleChange(event) {
    const {formObject} = this.state;
    formObject[this.props.id] = event.target.value;
    this.setState({formObject: formObject});
  }

  render() {
    const {label, mask, hidden, required} = this.props.field;
    const placeholder = `Enter your ${label.toLowerCase()} ...`;
    return (
      <FormGroup controlId={this.props.id} className={`${hidden ? 'hidden' : ''}`}
                 validationState={required && this.getValidationState()}>
        <Col sm={3} componentClass={ControlLabel}>{label}</Col>
        <Col sm={9}>
          <InputMask mask={mask} maskChar={'_'} placeholder={placeholder} className={'form-control'}
                     onChange={this.handleChange}
                     value={this.state.formObject[this.props.id]} onBlur={this.props.onBlur}/>
          <FormControl.Feedback/>
        </Col>
      </FormGroup>
    );
  }
}

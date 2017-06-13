import React from 'react';
import {FormGroup, Col, FormControl, ControlLabel} from 'react-bootstrap';
import _ from 'lodash';


export default class TextFieldWithValidation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formObject: props.formObject
    }
    this.getValidationState = this.getValidationState.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getValidationState() {
    const {id, pattern} = this.props;
    const {formObject} = this.state;
    const value = formObject[id];
    if (!value && !pattern) return null;
    if (value.match(pattern)) {
      return 'success';
    }
    return 'error';
  }

  handleChange(event) {
    const {formObject} = this.state;
    const {id} = this.props;
    formObject[id] = event.target.value;
    this.setState({formObject: formObject});
    console.log(this.state.formObject);
  }

  render() {
    console.log('in render of TextFieldWithValidation');
    const {id, value, placeholder, label, validationState, onBlur, formObject} = this.props;
    console.log(this.props.pattern);
    return (
      <FormGroup controlId={id} validationState={this.getValidationState()}>
        <Col sm={3} componentClass={ControlLabel}>{label}</Col>
        <Col sm={9}>
          <FormControl type="text" placeholder={placeholder} value={value} onChange={this.handleChange} onBlur={onBlur}/>
          <FormControl.Feedback />
        </Col>
      </FormGroup>
    );
  }
}

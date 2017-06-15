import React from 'react';
import {FormGroup, FormControl, Col, ControlLabel} from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';

export default class DatePickerComp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formObject: props.formObject
    }
    this.handleChange = this.handleChange.bind(this);
  }

  getValidationState() {
    const datePattern = /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)$/g;
    const {formObject} = this.state;
    const {id} = this.props;
    const value = formObject[id] ? new Date(formObject[id]).toISOString() : undefined;
    if (!value) return 'warning';
    if (value.match(datePattern)) {
      return 'success';
    }
    return 'error';
  }

  handleChange(value) {
    const {formObject} = this.state;
    formObject[this.props.id] = value;
    this.setState({formObject: formObject});
  }

  render() {
    const {id} = this.props;
    const {label, hidden, required} = this.props.field;
    const {formObject} = this.state;
    const placeholder = `Enter your ${label.toLowerCase()} ...`;
    const value = formObject[id] ? new Date(formObject[id]).toISOString() : undefined;
    return (
      <FormGroup controlId={id} validationState={required ? this.getValidationState() : null} className={`${hidden ? 'hidden':''}`}>
        <Col sm={3} componentClass={ControlLabel}>{label}</Col>
        <Col sm={9}>
          <DatePicker placeholder={placeholder} showClearButton={false} onChange={this.handleChange} value={value} onBlur={this.props.onBlur} />
          <FormControl.Feedback />
        </Col>
      </FormGroup>
    );
  }
}

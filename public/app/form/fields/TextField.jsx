import React from 'react';
import {FormGroup, Col, FormControl, ControlLabel} from 'react-bootstrap';

export default class TextField extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formObject: props.formObject
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const {formObject} = this.state;
    formObject[this.props.id] = event.target.value;
    this.setState({formObject: formObject});
  }

  render() {
    const {label, hidden} = this.props.field;
    const placeholder = `Enter your ${label.toLowerCase()} ...`;
    return (
      <FormGroup controlId={this.props.id} className={`${hidden ? 'hidden' : ''}`}>
        <Col sm={3} componentClass={ControlLabel}>{label}</Col>
        <Col sm={9}>
          <FormControl type="text" placeholder={placeholder} onChange={this.handleChange}
                       value={this.state.formObject[this.props.id] || undefined} onBlur={this.props.onBlur}/>
        </Col>
      </FormGroup>
    );
  }
}

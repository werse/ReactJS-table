import React from 'react';
import {FormGroup, Col, FormControl, ControlLabel} from 'react-bootstrap';

export default class TextField extends React.Component {
  render() {
    console.log('in text field');
    const {id, placeholder, label} = this.props;
    return (
      <FormGroup controlId={id}>
        <Col sm={3} componentClass={ControlLabel}>{label}</Col>
        <Col sm={9}>
          <FormControl type="text" placeholder={placeholder} />
        </Col>
      </FormGroup>
    );
  }
}

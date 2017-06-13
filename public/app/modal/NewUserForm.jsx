import React from 'react';
import {Modal, Form} from 'react-bootstrap';
import TextFieldWithValidation from '../form/fields/TextFieldWithValidation';
import TextField from '../form/fields/TextField';

export default class NewUserForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checkValue: false,
      user: {},
      currentField: ''
    };
    this.saveUser = this.saveUser.bind(this);
    // this.getValidationStatus = this.getValidationStatus.bind(this);
  }

  saveUser() {
    const {user} = this.state;
    console.log('in saveUser method');
    console.log(user);
    // if all required fields not empty - save it on blur on every change if validation state is success;
  }

  render() {
    const {show, onHide, fields} = this.props;
    const {value, user} = this.state;
    return (
      <Modal onHide={onHide} show={show}>
        <Modal.Header closeButton onHide={onHide}>
          <Modal.Title>{'Create New User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form horizontal>
            {Object.keys(fields).map(key => {
              const $field = fields[key]
              if ($field.type === 'text') {
                return <TextFieldWithValidation key={key} id={key} label={$field.label}
                  placeholder={`Enter your ${$field.label.toLowerCase()} ...`} pattern={new RegExp($field.pattern, 'g')}
                  validationState={this.getValidationStatus} formObject={user} onBlur={this.saveUser}/>
              }
            })}
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

import React from 'react';
import {Modal, Form, Button, Alert} from 'react-bootstrap';
import TextFieldWithValidation from '../form/fields/TextFieldWithValidation.jsx';
import TextField from '../form/fields/TextField.jsx';
import TextArea from '../form/fields/TextArea.jsx';
import DatePickerComp from '../form/fields/DatePickerComp.jsx';
import MaskedField from '../form/fields/MaskedField.jsx';

export default class NewUserForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checkValue: false,
      user: {},
      currentField: '',
      alertMessage: ''
    };
  }

  saveUser() {
    const {user} = this.state;
    console.log('in saveUser method');
    console.log(user);
    let message = this.checkUserFields(user, this.props.fields);
    console.log(message);
    if(message) {
      console.log('here')
      this.setState({alertIsVisible: true, alertMessage: message});
    }
  }

  checkUserFields(user, fields) {
    console.log('in checkUserFields()');
    console.log(fields);
    let alerts = [];
    const requiredFields = Object.keys(fields).filter(key => fields[key].required);
    if (requiredFields > Object.keys(user)) {
      return 'Check the inputs, probably you miss one or more';
    }
    let invalidFields = Object.keys(user).filter(key => !user[key].match(new RegExp(fields[key].pattern, 'g')));
    if (invalidFields.length === 0) return;
    let message = invalidFields.map(key => fields[key].label).join(', ');
    console.log();
    return `Check again the required fields: ${message}`;
  }

  handleAlertDismiss() {
    this.setState({alertIsVisible: false});
  }

  render() {
    const {show, onHide, fields} = this.props;
    const {value, user, alertIsVisible, alertMessage} = this.state;
    return (
      <Modal onHide={onHide} show={show} bsSize='lg'>
        <Modal.Header closeButton onHide={onHide}>
          <Modal.Title>{'Create New User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {alertIsVisible && <Alert bsStyle='danger' onDismiss={this.handleAlertDismiss.bind(this)}>
              <p>{alertMessage}</p>
          </Alert>}
          <Form horizontal>
            {Object.keys(fields).map(key => {
              const $field = fields[key]
              if ($field.type === 'text' && $field.required) {
                return <TextFieldWithValidation id={key} field={$field} key={key} formObject={user} />;
              }
              if ($field.type === 'text' && !$field.required) {
                return <TextField field={$field} id={key} key={key} formObject={user} />;
              }
              if ($field.type === 'textarea') {
                return <TextArea field={$field} id={key} key={key} formObject={user} />;
              }
              if ($field.type === 'date') {
                return <DatePickerComp field={$field} id={key} key={key} formObject={user}/>;
              }
              if ($field.type === 'mask') {
                return <MaskedField field={$field} id={key} key={key} formObject={user}/>;
              }
            })}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={this.saveUser.bind(this)}>{'Save'}</Button>
          <Button onClick={onHide}>{'Close'}</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

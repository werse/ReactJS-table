import React from 'react';
import {Modal, Form, Alert, Button, Fade} from 'react-bootstrap';
import moment from 'moment';
import TextFieldWithValidation from '../form/fields/TextFieldWithValidation.jsx';
import TextField from '../form/fields/TextField.jsx';
import TextArea from '../form/fields/TextArea.jsx';
import DatePickerComp from '../form/fields/DatePickerComp.jsx';
import MaskedField from '../form/fields/MaskedField.jsx';

export default class UserDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      alertIsVisible: false,
      user: props.user,
      alertMessage: undefined,
      tmpUser: $.extend({}, props.user)
    }
    this.updateUser = this.updateUser.bind(this);
  }

  updateUser() {
    let {tmpUser} = this.state;
    let {user, fields} = this.props;
    let message = this.checkUserFields(tmpUser, fields);
    if (message) {
      this.setState({alertIsVisible: true, alertMessage: message});
      return;
    }
    tmpUser.dateOfBirth = moment(tmpUser.dateOfBirth).format('YYYY-MM-DD');
    tmpUser.phone = tmpUser.phone.replace(/\+|[\(]|[\)]|\s|-/g, '');
    if (JSON.stringify(user) !== JSON.stringify(tmpUser)) {
      $.post(`/user/${user.id}`, tmpUser)
       .done((response) => {
         this.handleAlertDismiss();
         for (let key in user) {
           user[key] = response[key];
         }
       })
       .fail(error => {
         this.setState({alertIsVisible: true, alertMessage: error.responseJSON.message});
       });
    }
  }

  checkUserFields(user, fields) {
    const requiredFields = Object.keys(fields).filter(key => fields[key].required);
    let invalidFields = requiredFields.filter(key => !user[key].match(new RegExp(fields[key].pattern, 'g')));
    if (invalidFields.length === 0) return;
    let message = invalidFields.map(key => fields[key].label).join(', ');
    return `Check again the required fields: ${message}`;
  }

  handleAlertDismiss() {
    this.setState({alertIsVisible: false});
  }

  render() {
    const {show, onHide, fields} = this.props;
    const {alertIsVisible, alertMessage, tmpUser} = this.state;
    console.log('alert is visible: ', alertIsVisible);
    return (
      <Modal onHide={onHide} show={show} bsSize='lg'>
        <Modal.Header closeButton onHide={onHide}>
          <Modal.Title>{'Create New User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Fade in={alertIsVisible} transitionAppear={true} unmountOnExit={true} mountOnEnter={true}>
            <Alert bsStyle='danger' onDismiss={this.handleAlertDismiss.bind(this)}>
              <p>{alertMessage}</p>
            </Alert>
          </Fade>
          <Form horizontal>
            {Object.keys(fields).map(key => {
              const $field = fields[key]
              if ($field.type === 'text' && $field.required) {
                return <TextFieldWithValidation id={key} field={$field} key={key} formObject={tmpUser}
                                                onBlur={this.updateUser}/>;
              }
              if ($field.type === 'text' && !$field.required) {
                return <TextField field={$field} id={key} key={key} formObject={tmpUser} onBlur={this.updateUser}/>;
              }
              if ($field.type === 'textarea') {
                return <TextArea field={$field} id={key} key={key} formObject={tmpUser} onBlur={this.updateUser}/>;
              }
              if ($field.type === 'date' || $field.type === 'datetime') {
                return <DatePickerComp field={$field} id={key} key={key} formObject={tmpUser}
                                       onBlur={this.updateUser}/>;
              }
              if ($field.mask) {
                return <MaskedField field={$field} id={key} key={key} formObject={tmpUser} onBlur={this.updateUser}/>;
              }
            })}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>{'Close'}</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

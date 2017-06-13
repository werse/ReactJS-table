import React, {Component} from 'react';
import ReactModal from 'react-modal';
import style from './user-table.css';
import {Modal, Form, FormGroup, FormControl, ControlLabel, FieldGroup, Col} from 'react-bootstrap';
import TextField from '../form/fields/TextField';
import TextFieldWithValidation from '../form/fields/TextFieldWithValidation';
import UserDetails from '../modal/UserDetails';
import NewUserForm from '../modal/NewUserForm';

export default class UserTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showUserDetails: false,
      showNewUserForm: false
    }
    this.showUserDetails = this.showUserDetails.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.showNewUserForm = this.showNewUserForm.bind(this);
    this.isModalOpen = this.isModalOpen.bind(this);
  }

  showUserDetails(user) {
    this.setState({showUserDetails: true, user: user});
  }

  closeModal() {
    this.setState({showUserDetails: false, showNewUserForm: false});
  }

  isModalOpen() {
    const {showUserDetails, showNewUserForm} = this.state;
    return showUserDetails || showNewUserForm;
  }

  showNewUserForm(event) {
    event.preventDefault;
    this.setState({showNewUserForm: true});
  }

  getModalJSX() {
    console.log('in getNewUserFormBodyJSX');
    const {user, showUserDetails, showNewUserForm} = this.state;
    const {fields} = this.props;
    if (showUserDetails) {
      return <UserDetails show={showUserDetails} user={user}
          fields={fields} onHide={this.closeModal} type='user-details'/>;
    }
    if (showNewUserForm) {
      return <NewUserForm show={showNewUserForm} onHide={this.closeModal} fields={fields}/>;
    }
  }

  render() {
    const {users, fields} = this.props;
    const {isUserDetailsOpenned, isNewUserFormOpenned} = this.state;
    return (
      <div className='row'>
        {this.isModalOpen() && this.getModalJSX()}
        <table className={this.props.className}>
          <thead className='thead-inverse'>
            <HeaderRow fields={fields}/>
          </thead>
          <tbody>
            {users.map((user, index) => <TableRow key={`tableRow-${index}`} keys={Object.keys(fields)}
                                                  user={user} showUserDetails={this.showUserDetails}/>)}
            <tr>
              <td className='text-right pr-5' colSpan={`${Object.keys(fields).length}`} onClick={this.showNewUserForm}>
                <button className="btn btn-secondary" type="button" aria-disabled="true">
                  <b>{'Add new user'}</b>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

class HeaderCell extends Component {
  render() {
    return <th className='text-center'>{this.props.label}</th>;
  }
}

class HeaderRow extends Component {
  render() {
    const {fields} = this.props;
    return (
      <tr>{Object.keys(fields).map(item => <HeaderCell key={item} label={fields[item].label}/>)}</tr>
    );
  }
}

class TableCell extends Component {
  render() {
    const {value, colspan} = this.props;
    return <td className='text-center'>{this.props.value}</td>;
  }
}

class TableRow extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const {showUserDetails, user} = this.props;
    event.preventDefault();
    showUserDetails(user);
  }

  render() {
    const {keys, user} = this.props;
    return (
      <tr onClick={this.handleClick}>{keys.map(key => <TableCell key={`${key}`} value={user[key] || '' } />)}</tr>
    );
  }
}

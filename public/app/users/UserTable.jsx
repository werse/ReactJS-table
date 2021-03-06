import React, {Component} from 'react';
import ReactModal from 'react-modal';
import style from './style.css';
import {Modal, Form, FormGroup, FormControl, ControlLabel, FieldGroup, Col} from 'react-bootstrap';
import TextField from '../form/fields/TextField';
import TextFieldWithValidation from '../form/fields/TextFieldWithValidation';
import UserDetails from '../modal/UserDetails';
import NewUserForm from '../modal/NewUserForm';
import TableRow from './table/TableRow.jsx';
import HeaderRow from './table/HeaderRow.jsx';

export default class UserTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showUserDetails: false,
      showNewUserForm: false,
      users: props.users
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
    const {user, users, showUserDetails, showNewUserForm} = this.state;
    const {fields} = this.props;
    if (showUserDetails) {
      return <UserDetails show={showUserDetails} fields={fields} onHide={this.closeModal} user={user} users={users} />;
    }
    if (showNewUserForm) {
      return <NewUserForm show={showNewUserForm} onHide={this.closeModal} fields={fields} users={users} />;
    }
  }

  render() {
    const {fields} = this.props;
    const {users} = this.state;
    return (
      <div className='row'>
        {this.isModalOpen() && this.getModalJSX()}
        <table className={this.props.className}>
          <thead className='thead-inverse'>
            <HeaderRow schema={fields}/>
          </thead>
          <tbody>
            {users.map((user, index) => <TableRow key={`tableRow-${index}`} schema={fields}
                                                  user={user} showUserDetails={this.showUserDetails}/>)}
            <tr>
              <td className='text-right' colSpan={`${Object.keys(fields).length}`} onClick={this.showNewUserForm}>
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

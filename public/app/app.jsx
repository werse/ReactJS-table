import React, {Component} from 'react';
import {render} from 'react-dom';
import UserTable from './users/UserTable.jsx';
import ReactModal from 'react-modal';
import style from './app.css'
import fields from './user-fields.json'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isNotificationOpenned: false,
      id: 4,
      notificationMessage: "Technical Error",
      columnNames: [],
      isLoading: true
    };
    this.showNotification = this.showNotification.bind(this);
    this.afterShowingModal = this.afterShowingModal.bind(this);
    this.closeNotification = this.closeNotification.bind(this);
    this.addUser = this.addUser.bind(this);
  }

  getInitialState() {
    return {users: undefined}
  }

  loadUsers() {
    $.ajax({
      method: 'GET',
      url: '/users',
      success: response => this.setState({users: response, isLoading: false}),
      error: () => this.setState({isNotificationOpenned: true, isLoading: false})
    });
  }

  componentDidMount() {
    this.loadUsers();
  }

  showNotification() {
    this.setState({isNotificationOpenned: true});
  }

  afterShowingModal() {
    setTimeout(this.closeNotification, 750);
  }

  closeNotification() {
    this.setState({isNotificationOpenned: false});
  }

  addUser() {
    data.push({id: this.state.id, firstName: 'John'});
    this.setState({
      users: data,
      id: this.state.id + 1
    });
  }

getDataTableJSX() {
  const {users} = this.state;
  if (users) {
    return (
      <UserTable
        className='table table-hover mt-3'
        users={users}
        fields={fields}
        showNotification={this.showNotification}/>);
  }
  return this.getEmptyViewJSX();
}

  getEmptyViewJSX() {
    return <p className='text-center'>{'No users were loaded'}</p>;
  }

  getSpinnerJSX() {
    return (
      <p className='text-center'>{'data is loading...'}</p>);
  }

  getNotificationPopupJSX() {
    const {isNotificationOpenned, notificationMessage} = this.state;
    return <ReactModal
      isOpen={isNotificationOpenned}
      onAfterOpen={this.afterShowingModal}
      onRequestClose={this.closeNotification}
      contentLabel="Example Modal"
      className='modalWindow'
      overlayClassName='modalWindowOverlay'>
      <div className="modalWindowAligner">
        <h3 className="text-center errorMessageModal">{notificationMessage}</h3>
      </div>
    </ReactModal>
  }

  render() {
    const {isLoading} = this.state;
    return (
      <div className='container'>
        <h2 className='mt-3 text-center'>Users</h2>
        {isLoading ? this.getSpinnerJSX() : this.getDataTableJSX()}
        {this.getNotificationPopupJSX()}
      </div>
    );
  }
}

render(
  <App/>, document.getElementById('app'));

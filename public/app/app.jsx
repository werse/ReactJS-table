import React from 'react';
import {render} from 'react-dom';
import DataTable from './data-table';
import {tables, grid, type} from 'bootstrap-css';
import ReactModal from 'react-modal';
import styles from './app.css'

console.log(styles);

const data = [
  {
    id: 1,
    firstName: 'John'
  }, {
    id: 2,
    firstName: 'Jim'
  }, {
    id: 3,
    firstName: 'July'
  }
];

const columnNames = [
  {
    key: 'id',
    value: 'Id'
  }, {
    key: 'firstName',
    value: 'First Name'
  }, {
    key: 'lastNane',
    value: 'Last Name'
  }
];

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <div className='container'>
        <h2 className='mt-3'>Users</h2>
        <div className='row'>
          <DataTable className='table table-hover mt-3' data={data} columnNames={columnNames} />
        </div>

        <button onClick={this.openModal}>Open Modal</button>
        <ReactModal isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          className='modalWindow'
          overlayClassName='modalWindowOverlay'>
          <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
          <div>I am a modal</div>
        </ReactModal>
      </div>
    );
  }
}



const header = <h1>This is h1 block</h1>;

render(
  <App/>, document.getElementById('app'));

function getUsers(success, error) {
  return $.get('/users').done(response => success(response)).catch(response => error(response));
};

const isDev = project => project === 'Dev';

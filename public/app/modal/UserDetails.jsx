import React from 'react';
import {Modal} from 'react-bootstrap';

export default class UserDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('in UserDetails');
    console.log(this.props);
    const {show, onHide, user, fields} = this.props;
    return (
      <Modal onHide={onHide} show={show}>
        <Modal.Header closeButton onHide={onHide}>
          <Modal.Title>{'Create New User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {Object.entries(user).map(entry => (
            <dl className='row' key={entry[0]}>
              <dt className='col-sm-4 text-right'>{fields[entry[0]].value || entry[0]}</dt>
              <dd className='col-sm-8'>{entry[1]}</dd>
            </dl>
          ))}
        </Modal.Body>
      </Modal>
    );
  }
}

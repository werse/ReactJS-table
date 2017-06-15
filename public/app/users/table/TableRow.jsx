import React from 'react';
import TableCell from './TableCell.jsx';

export default class TableRow extends React.Component {

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

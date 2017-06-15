import React from 'react';
import TableCell from './TableCell.jsx';
import moment from 'moment';

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
    const {schema, user} = this.props;
    return (
      <tr onClick={this.handleClick}>
        {Object.keys(schema).map(key => {
          if (!schema[key].overviewExcluded) {
            let value = user[key] || '';
            if (value && schema[key].type === 'date') {
              value = moment(value).format('DD/MM/YYYY');
            }
            if (value && schema[key].type === 'datetime') {
              value = moment(value).format('DD.MM.YYYY HH:mm:ss');
            }
            if (value && schema[key].type === 'mobile phone') {
              let tmp = value.match(/(\d)(\d{3})(\d{3})(\d{2})(\d{2})/);
              value = `+${tmp[1]} (${tmp[2]}) ${tmp[3]}-${tmp[4]}-${tmp[5]}`;
            }
            return <TableCell key={`${key}`} value={value} />;
          }
        })}
      </tr>
    );
  }
}

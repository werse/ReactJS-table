import React from 'react';
import HeaderCell from './HeaderCell.jsx';

export default class HeaderRow extends React.Component {

  render() {
    const {fields} = this.props;
    return (
      <tr>{Object.keys(fields).map(item => <HeaderCell key={item} label={fields[item].label}/>)}</tr>
    );
  }
}

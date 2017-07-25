import React from 'react';

export default class TableCell extends React.Component {

  render() {
    return <td>{this.props.value}</td>;
  }
}

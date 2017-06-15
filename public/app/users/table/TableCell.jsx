import React from 'react';

export default class TableCell extends React.Component {

  render() {
    const {value, colspan} = this.props;
    return <td>{this.props.value}</td>;
  }
}

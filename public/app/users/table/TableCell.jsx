import React from 'react';

export default class TableCell extends React.Component {

  render() {
    const {value, colspan} = this.props;
    return <td className='text-center'>{this.props.value}</td>;
  }
}

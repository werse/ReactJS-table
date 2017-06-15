import React from 'react';

export default class HeaderCell extends React.Component {

  render() {
    return <th className='text-center'>{this.props.label}</th>;
  }
}

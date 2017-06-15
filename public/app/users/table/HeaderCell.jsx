import React from 'react';

export default class HeaderCell extends React.Component {

  render() {
    return <th className>{this.props.label}</th>;
  }
}

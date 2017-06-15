import React from 'react';
import HeaderCell from './HeaderCell.jsx';

export default class HeaderRow extends React.Component {

  render() {
    const {schema} = this.props;
    return (
      <tr>{Object.keys(schema).map(key => {
          if (schema[key].overviewExcluded != true) {
            return <HeaderCell key={key} label={schema[key].label}/>;
          }})
        }
      </tr>
    );
  }
}

import $ from 'jquery';
import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  render () {
    return <p> Hello React!</p>;
  }
}

  render(<App />, document.getElementById('app'));


function getUsers(success, error) {
  return $.get('/users')
    .done(response => success(response))
    .catch(response => error(response));
}

getUsers(e => console.log(e), () => console.log('error'));

const isDev = project => project === 'Dev';

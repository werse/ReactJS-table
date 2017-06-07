import $ from 'jquery';
import { Component } from 'react';
import { render } from 'react-dom';


console.log(document.getElementById('app'));

class App extends Component {
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

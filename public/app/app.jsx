import React from 'react';
import { render } from 'react-dom';
import DataTable from './data-table';
import { tables, grid, type } from 'bootstrap-css';


const data = [ {id: 1, firstName: 'John'}, { id: 2, firstName: 'Jim'}, {id: 3, firstName: 'July'} ];
const columnNames = [{key: 'id', value: 'Id'}, {key: 'firstName', value: 'First Name'}, {key: 'lastNane', value: 'Last Name'}];

class App extends React.Component {
  render () {
    return (
      <div className='container'>
        <h2 className='mt-3'>Users</h2>
        <div className='row'>
          <DataTable className='table table-hover mt-3'
            data={data}
            columnNames={columnNames}/>
        </div>
      </div>
    );
  }
}

const header = <h1>This is h1 block</h1>;

render(<App />, document.getElementById('app'));


function getUsers(success, error) {
  return $.get('/users')
    .done(response => success(response))
    .catch(response => error(response));
};

const isDev = project => project === 'Dev';

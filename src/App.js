import React, { Component } from 'react';
import './App.css';
import FormContainer from './components/form'

class App extends Component {
  
  render() {
    const inputList = [{
      text: 'First Name',
      validator: 'validateName',
      value: 'firstName'
    },
    {
      text: 'Last Name',
      validator: 'validateName',
      value: 'lastName'
    },
    {
      text: 'Email Address',
      validator: 'validateEmail',
      value: 'emailAddress'
    },
    {
      text: 'Phone Number',
      validator: 'validatePhoneNumber',
      value: 'phoneNumber'
    }
  ]
    return (
      <div className="App">
        <header className="App-header">
        <FormContainer inputList={inputList} />
        </header>
      </div>
    );
  }
}

export default App;

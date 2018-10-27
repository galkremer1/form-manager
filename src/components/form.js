
import React from 'react';
import {Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import validators from './validators';
import './form.css';

const axios = require('axios');

class FormContainer extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.handleChange = this.handleChange.bind(this);
      this.validators = validators;
      this.axios = axios;
      this.state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        phoneNumber: '',
        isFormValid: false,
        validationState: {
          firstName: null,
          lastName: null,
          emailAddress: null,
          phoneNumber: null,
        }
      };
    }

    submitForm = (e) => {
      e.preventDefault();
      // this.axios.post('https://api.sendgrid.com/v3/mail/send', {
      this.axios.post('/sendEmail', {
        "personalizations":
      [{"to": [{"email": "kremerlabs3@gmail.com"}]}],
        "from": {"email": "jones@form.com"},
        "subject": "This is a test",
        "content": [{"type": "text/plain", "value": "and easy to do anywhere, even with cURL"}]
            }, {
        'Content-Type': 'application/json'
      })
      .then(function (response) {
        debugger
        console.log(response);
      })
      .catch(function (error) {
        debugger
        console.log(error);
      });
    }

    checkFormValidation() {
      let isFormValid = true;
      const {validationState} = this.state;
      Object.keys(validationState).forEach((key) => {
        if (isFormValid && validationState[key] !== 'success') {
          isFormValid =  false;
        }
      })
      return isFormValid;
    }
  
    handleChange(e) {
      const value = e.target.value;
      const inputId = e.target.id;
      const {validationState} = this.state;
      const validator = e.target.getAttribute('validator');
      const inputValidationState = this.validators[validator](value);
      validationState[inputId] = inputValidationState;
      const isFormValid = this.checkFormValidation();
      this.setState({ 
          [inputId]: value,
          validationState,
          isFormValid
          }
        );
    }

    render() {
      const {inputList} = this.props;
      return (
        <form onSubmit={this.submitForm.bind(this)}>
          <ControlLabel>Jones Form</ControlLabel>
          {
            inputList.map((input) => {
              return  <FormGroup
                key = {input.value}
                controlId={input.value}
                validationState={this.state.validationState[input.value]}>
                  <FormControl
                    type="text"
                    value={this.state[input.value]}
                    placeholder={input.text}
                    onChange={this.handleChange.bind(this)}
                    validator={input.validator}
                  />
                  <FormControl.Feedback />
                </FormGroup>
            })
          }
          <Button type="submit" disabled={!this.state.isFormValid}>Submit</Button>
        </form>
      );
    }
  }
  
export default FormContainer;

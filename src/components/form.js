
import React from 'react';
import {Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import { ClipLoader } from 'react-spinners'
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
        },
        loading: false,
        isFormSubmitted: false,
        submissionResult: ''
      };
    }

    submitForm = (e) => {
      const {emailAddress, firstName, lastName, phoneNumber} = this.state; 
      const emailContent = "Got a new Lead from " + firstName + ' ' + lastName +
      ' phone number: ' + phoneNumber;
      e.preventDefault();
      this.setState({loading: true});
      this.axios.post('/sendEmail', {
        "personalizations":
        [{"to": [{"email": "jonesformtest@gmail.com"}]}],
        "from": {"email": emailAddress},
        "subject": "New lead",
        "content": [{
          "type": "text/plain", 
          "value": emailContent
        }]}, 
        {'Content-Type': 'application/json'})
      .then((response) => {
        this.setState({
          loading: false,
          isFormSubmitted: 'success',
          submissionResult: 'Form was submitted successfully!'
        })
      })
      .catch((error) => {
        this.setState({
          loading: false,
          isFormSubmitted: 'error',
          submissionResult: 'Error submitting form. Please try again.'
        })
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
  
    goBack = () => {
      const {isFormSubmitted} = this.state;
      if (isFormSubmitted ==  'error') {
        this.setState({
          isFormSubmitted: false
        })
      } else {
        this.setState({
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
          },
          loading: false,
          isFormSubmitted: false,
          submissionResult: ''
        })
      }
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
        <div >
          <form className={this.state.isFormSubmitted ? 'hide-form': ''} onSubmit={this.submitForm.bind(this)}>
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
            <Button type="submit" disabled={!this.state.isFormValid || this.state.loading}>Submit</Button>
          </form>
          <ClipLoader
            sizeUnit={"px"}
            size={150}
            color={'#123abc'}
            loading={this.state.loading}
          />
          {this.state.isFormSubmitted &&
            <div>
              <div>
                {this.state.submissionResult} 
              </div>
              <Button onClick={this.goBack}>Go back</Button>
            </div>
          }
        </div>

      );
    }
  }
  
export default FormContainer;

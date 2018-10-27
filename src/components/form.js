
import React from 'react';
import {Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import './form.css';
import validators from './validators';

class FormContainer extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.handleChange = this.handleChange.bind(this);
      this.validators = validators;
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
        <form>
          <ControlLabel>Jones Form</ControlLabel>
          {
            inputList.map((input) => {
              return  <FormGroup
                key = {input.value}s
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

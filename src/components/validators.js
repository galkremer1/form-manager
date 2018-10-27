const validators = {
      validateName: (value) => {
        const length = value.length;
        if (length >= 2){
            if (/^[a-zA-Z]+$/.test(value)) { //REGEX for testing only letters
                return 'success';
            }
            return 'error';
        } else if (length > 0) return 'error';
        return null;
      },
      validateEmail: (value) => {
        const length = value.length;
        if (length > 0){
            if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) { //REGEX for testing emails
                return 'success';
            }
            return 'error';
        };
        return null;
      },
      validatePhoneNumber: (value) => {
        const length = value.length;
        if (length == 10){
            if (/^\d+$/.test(value)) { //REGEX for testing only numbers
                return 'success';
            }
            return 'error';
        } else if (length > 0) {
            return 'error';
        };
        return null;
      }
}

export default validators;
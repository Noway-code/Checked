// validates username
// returns an array containing strings with necessary corrections
const isValidUsername = (username) => {
   const minLength = 1;
   const regex =  /^[a-zA-Z0-9.\-]*$/;
   
   let errors = [];

   if (username.length < minLength) {
      errors.push("Minimum 1 character");
   }
   if (!regex.test(username)) {
      errors.push("Must contain only letters, numbers, period(.), or hyphen(-)")
   }

   return errors;
}

// validates password
// returns an array containing strings with necessary corrections
const isValidPassword = (password) => {
   const minLength = 8;
   const maxLength = 128;
   const regex = /^[^\n]*$/;

   let errors = [];

   if (password.length < minLength) {
      errors.push("Minimum 8 characters");
   }
   if (password.length > maxLength) {
      errors.push("Maximum 128 characters");
   }
   if(!/[A-Z]/.test(password))
   { 
      errors.push("Must contain a capital letter")
   }
   if(!/[0-9]/.test(password))
   { 
      errors.push("Must contain a number")
   }
   if (!regex.test(password)) {
      errors.push("Cannot contain tab or new line (enter key) characters")
   }
   return errors
}

// validates a name
// returns an array containing strings with necessary corrections
const isValidName = (name) => {
   const minLength = 1;
   const regex = /^[a-zA-Z]*$/;
   
   let errors = [];
   
   if (name.length < minLength) {
      errors.push("Minimum 1 character");
   }
   if (!regex.test(name)) {
      errors.push("Must contain only letters")
   }

   return errors;
}

export {
   isValidUsername,
   isValidPassword,
   isValidName
};
import axios from "axios";
import * as d from "./eventHandler";

const regexFullname = /^([a-zA-Z0-9]+|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{1,}|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{3,}\s{1}[a-zA-Z0-9]{1,})$/g;
const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/gm;
const regexPhone = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;
const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\u0020-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u00FF\u0100-\uFFFF]).{8,254}$/gm;

const signup = document.getElementById("signup-form");
const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

const userData = {};

// validate user inputField
const validateFullname = (event) => {
  // Check if user input is empty
  if (!event.target.value) {
    setErrorMessage("Please enter your fullname", fullname);
    return;
  } else {
    removeErrorMessage(fullname);
    // return;
  }

  // Check if user input is less than 4
  if (event.target.value.length < 4) {
    setErrorMessage(
      "A fullname of aleast 4 or more characters is required",
      fullname
    );
    return;
  } else {
    removeErrorMessage(fullname);
    // return;
  }

  // Check if user input contains number or special characters
  if (!event.target.value.match(regexFullname)) {
    setErrorMessage(
      "Fullname can't contain numbers or special characters",
      fullname
    );
    return;
  } else {
    removeErrorMessage(fullname);
    // return;
  }
  // Add user input to user data obj
  userData.fullname = event.target.value;
  return userData;
};

const validateEmail = (event) => {
  // Check if email input is empty
  if (!event.target.value) {
    setErrorMessage("Please enter your email address", email);
    return;
  } else {
    removeErrorMessage(email);
  }

  // Check if contains @ symbol and matches regexEmail
  if (
    event.target.value.includes("@") &&
    !event.target.value.match(regexEmail)
  ) {
    setErrorMessage("Please provide a valid email address", email);
    return;
  } else {
    removeErrorMessage(email);
  }

  // Add user input to user data obj
  userData.email = event.target.value;
  return userData;
};

const validatePhone = (event) => {
  // Check if phone input is empty
  if (!event.target.value) {
    setErrorMessage("Please enter your phone number", phone);
    return;
  } else {
    removeErrorMessage(phone);
  }

  // Check if user input matches regexPhone
  if (!event.target.value.match(regexPhone)) {
    setErrorMessage("Your phone number is incorrect", phone);
    return;
  } else {
    removeErrorMessage(phone);
  }

  // Add user input to user data obj
  userData.phone = event.target.value;
  return userData;
};

const validatePassword = (event) => {
  // Check if password field is emtpy
  if (!event.target.value) {
    setErrorMessage(
      `A minimum 8 characters password contains a combination of uppercase and lowercase letter, symbols and number are required`,
      password
    );
    return;
  } else {
    removeErrorMessage(password);
  }

  // Check if password field matches regexPassword
  if (!event.target.value.match(regexPassword)) {
    setErrorMessage(
      `A minimum 8 characters password contains a combination of uppercase and lowercase letter, symbols and number are required`,
      password
    );
  } else {
    removeErrorMessage(password);
  }

  userData.password = event.target.value;
  return userData;
};

const validateConfirmPassword = (event) => {
  // Check if confirm password field is emtpy
  if (!event.target.value) {
    setErrorMessage("Password does not match", confirmPassword);
    return;
  } else {
    removeErrorMessage(confirmPassword);
  }

  // Check if confirmPassword === password
  if (event.target.value !== password.value) {
    setErrorMessage("Password does not match", confirmPassword);
  }

  userData.confirmPassword = event.target.value;
  return userData;
};

// handle signup form submission
const handleSignup = (event) => {
  event.preventDefault();
  console.log("You submit a form", userData);
};

if (signup) {
  fullname.addEventListener("keyup", validateFullname);
  fullname.addEventListener("change", validateFullname);

  email.addEventListener("keyup", validateEmail);
  email.addEventListener("change", validateEmail);

  phone.addEventListener("change", validatePhone);
  password.addEventListener("change", validatePassword);
  confirmPassword.addEventListener("change", validateConfirmPassword);

  signup.addEventListener("submit", handleSignup);
}

// setErrorMessage
const setErrorMessage = (message, element) => {
  element.parentElement.querySelector("small").textContent = message;
  element.classList.add("error");
};

const removeErrorMessage = (element) => {
  element.parentElement.querySelector("small").textContent = "";
  element.classList.remove("error");
};

// //Collect registration contact
// export const collectRegistrationContact = () => {
//   const userData = {};

//   if (!registration) return;

//   registration.addEventListener("submit", (e) => {
//     e.preventDefault();

//     // Checks if there are userInputs and return if is null
//     if (!userInputs) return;

//     // Loops through input fields to get name attributes
//     const inputFields = Array.from(userInputs).map((inputField) =>
//       inputField.getAttribute("name")
//     );

//     // Loops through input fields to get user input value
//     const inputValues = Array.from(userInputs).map(
//       (userInput) => userInput.value
//     );

//     // Use Object.define properties in a loop to set the Properties and Values of User Data
//     for (let i = 0; i < inputFields.length; i++) {
//       Object.defineProperties(userData, {
//         [inputFields[i]]: {
//           value: inputValues[i],
//           writable: true,
//           enumerable: true,
//         },
//       });
//     }

//     sendFormData(userData, "https://su1trade.com/registers");
//     // sendFormData(userData, "http://localhost:5000/registers");
//     document.querySelector('[type="submit"]').innerHTML = "Please wait...";
//   });
// };

// // Collect user details from Sign Up form
// export const collectSignUpForm = () => {
//   const userData = {};

//   if (!signUp) return;

//   signUp.addEventListener("submit", (e) => {
//     e.preventDefault();

//     // Checks if there are userInputs and return if is null
//     if (!userInputs) return;

//     // Loops through input fields to get name attributes
//     const inputFields = Array.from(userInputs).map((inputField) =>
//       inputField.getAttribute("name")
//     );

//     // Loops through input fields to get user input value
//     const inputValues = Array.from(userInputs).map(
//       (userInput) => userInput.value
//     );

//     // Use Object.define properties in a loop to set the Properties and Values of User Data
//     for (let i = 0; i < inputFields.length; i++) {
//       Object.defineProperties(userData, {
//         [inputFields[i]]: {
//           value: inputValues[i],
//           writable: true,
//           enumerable: true,
//         },
//       });
//     }

//     sendFormData(userData, "http://localhost:5000/signup");
//   });
// };

// // Validates user inputs
// function validateUserInput(input) {
//   // 1. Validate name field
//   // 2. Validate email field
//   // 3. Validate phone field
// }

// // Sends data to server
// function sendFormData(data, url) {
//   axios
//     .post(url, data)
//     .then((res) => {
//       if (res.data) {
//         setTimeout(() => {
//           d.openModalPopup();
//           document.querySelector('[type="submit"]').innerHTML = "Sign Up";
//           userInputs.forEach((input) => {
//             input.value = "";
//           });
//         }, 2000);
//       }
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// }

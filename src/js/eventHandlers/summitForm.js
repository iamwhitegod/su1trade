import axios from "axios";
import * as d from "./eventHandler";

const registration = document.querySelector("#registration");
const signUp = document.querySelector("#signup-form");
const userInputs = document.querySelectorAll("input");

//Collect registration contact
export const collectRegistrationContact = () => {
  const userData = {};

  if (!registration) return;

  registration.addEventListener("submit", (e) => {
    e.preventDefault();

    // Checks if there are userInputs and return if is null
    if (!userInputs) return;

    // Loops through input fields to get name attributes
    const inputFields = Array.from(userInputs).map((inputField) =>
      inputField.getAttribute("name")
    );

    // Loops through input fields to get user input value
    const inputValues = Array.from(userInputs).map(
      (userInput) => userInput.value
    );

    // Use Object.define properties in a loop to set the Properties and Values of User Data
    for (let i = 0; i < inputFields.length; i++) {
      Object.defineProperties(userData, {
        [inputFields[i]]: {
          value: inputValues[i],
          writable: true,
          enumerable: true,
        },
      });
    }

    sendFormData(userData, "https://su1trade.com/registers");
    // sendFormData(userData, "http://localhost:5000/registers");
    document.querySelector('[type="submit"]').innerHTML = "Please wait...";
  });
};

// Collect user details from Sign Up form
export const collectSignUpForm = () => {
  const userData = {};

  if (!signUp) return;

  signUp.addEventListener("submit", (e) => {
    e.preventDefault();

    // Checks if there are userInputs and return if is null
    if (!userInputs) return;

    // Loops through input fields to get name attributes
    const inputFields = Array.from(userInputs).map((inputField) =>
      inputField.getAttribute("name")
    );

    // Loops through input fields to get user input value
    const inputValues = Array.from(userInputs).map(
      (userInput) => userInput.value
    );

    // Use Object.define properties in a loop to set the Properties and Values of User Data
    for (let i = 0; i < inputFields.length; i++) {
      Object.defineProperties(userData, {
        [inputFields[i]]: {
          value: inputValues[i],
          writable: true,
          enumerable: true,
        },
      });
    }

    sendFormData(userData, "http://localhost:5000/signup");
  });
};

// Validates user inputs
function validateUserInput(input) {
  // 1. Validate name field
  // 2. Validate email field
  // 3. Validate phone field
}

// Sends data to server
function sendFormData(data, url) {
  axios
    .post(url, data)
    .then((res) => {
      if (res.data) {
        setTimeout(() => {
          d.openModalPopup();
          document.querySelector('[type="submit"]').innerHTML = "Sign Up";
          userInputs.forEach((input) => {
            input.value = "";
          });
        }, 2000);
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
}

import axios from "axios";

const form = document.querySelector(".form");
const userInputs = document.querySelectorAll("input");

// Regular expressions for form input field validation
const letters = /^[A-Za-z]+$/;
var phoneNum = (num) => /^\d{11}$/.test(num);
const isEmail = (email) => {
  return /^(([^<>()\[\]\\.,;:\$@"]+(\.[^<>()\[\]\\.,;:\$@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
};

export const collectUserForm = () => {
  const userData = {};
  // Checks if there is a form on the current page and adds form event listener
  if (!form) return;

  form.addEventListener("submit", (e) => {
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
        },
      });
    }

    // Pass user's data for validation
    validateUserInput(userData);
  });
};

const setErrorFor = (input, message) => {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  //Add error message
  small.textContent = message;

  //Add Class
  formControl.classList = "form-control error";
};

const validateUserInput = ({ fullname, email, phone }) => {
  if (fullname == false) {
    console.log("Fullname can't be blank");
    setErrorFor(document.getElementById("fullname"), "Fullname can't be blank");
  } else if (!letters.test(fullname)) {
    setErrorFor(
      document.getElementById("fullname"),
      "Fullname should only be alphabets"
    );
  }
  // else {
  //   setSuccessFor(fullname);
  // }

  if (email == false) {
    alert("Email can't be empty");
    setErrorFor(document.getElementById("email"), "Email can't be empty");
  } else if (!isEmail(email)) {
    setErrorFor(document.getElementById("email"), "Please enter a invalid");
  }
  // else {
  //   setErrorFor(emails)
  // }

  if (!phoneNum(phone)) {
    alert("Please enter a valid Phone number");
    setErrorFor(document.getElementById("phone"), "Please enter a valid Phone");
  }
};

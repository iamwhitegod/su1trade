import axios from "axios";

const form = document.querySelector(".form");
const userInputs = document.querySelectorAll("input");

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

    axios.post("localhost/5000/createTable");

    // Pass user's data for validation
    // validateUserInput(userData);
  });
};

// const whitespace = /\s/;

// const validateUserInput = ({ fullname, email, phone }) => {
//   if (fullname == whitespace) {
//     console.log("Fullname can't be blank");
//     setErrorFor(document.getElementById("fullname"), "Fullname can't be blank");
//   }
// };

// const setErrorFor = (input, message) => {
//   const formControl = input.parentElement;
//   const small = formControl.querySelector("small");

//   //Add error message
//   small.textContent = message;

//   //Add Class
//   formControl.classList = "form-control error";
// };

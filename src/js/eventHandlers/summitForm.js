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
          enumerable: true,
        },
      });
    }

    //Send User data
    sendFormData(userData);

    // userInputs.forEach((userInput) => (userInput.value = ""));
  });
};

function sendFormData(data) {
  axios
    .post("https://su1trade.com/register", data)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.message);
    });
}

// async function sendFormData(data) {
//   try {
//     await axios({
//       method: "POST",
//       url:
//         "https://cors-anywhere.herokuapp.com/https://contact.su1trade.com/api/",
//       data,
//       // headers: {
//       //   "Content-Type": "application/x-www-form-urlencoded",
//       //   "Access-Control-Allow-Origin": "*",
//       //   "Access-Control-Request-Headers": "Content-Type",
//       //   // "Access-Control-Request-Method": "POST",
//       // },
//     });

//     console.log(data);
//   } catch (err) {
//     console.log(err.message);
//   }
// }

// https://cors-anywhere.herokuapp.com/

import "@babel/polyfill";
import Typewriter from "typewriter-effect/dist/core";

import { signup } from "./signup";
import { login, logout } from "./login";
import { setupEventListners } from "./event";

import canvas from "./canvas";
import formValidators from "./formValidators";

console.log("Hello from parcel");

/*
**********************************************************
**********************************************************
  Dom Element
**********************************************************
**********************************************************
*/
const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("signin-form");
const logOutBtn = document.getElementById("logout--btn");

/*
**********************************************************
**********************************************************
  Hides the Preloader after windows finish loading
**********************************************************
**********************************************************
*/

// window.onload = function () {
//   document.querySelector(".loader-container").style.display = "none";
// };

window.addEventListener("load", function () {
  document.querySelector(".loader-container").style.display = "none";
});

/*
**********************************************************
**********************************************************
  Calls Event Listener Function
**********************************************************
**********************************************************
*/
setupEventListners();

/*
**********************************************************
**********************************************************
  Typing animation
**********************************************************
**********************************************************
*/
const heading = document.querySelector('[data--js="typewriter"]');

// Animations
const typewriter = new Typewriter(heading, {
  loop: true,
  delay: 75,
});

typewriter
  .pauseFor(250)
  .typeString(
    `Invest, Buy and Sell Crptocurrencies, Learn Forex Trading and
    E-commerce.`
  )
  .pauseFor(2500)
  .deleteChars(71)
  .typeString(` and earn 17% profit every month for 5months.`)
  .pauseFor(2500)
  .deleteChars(40)
  .typeString(`get minimum of 28% or more monthly.`)
  .pauseFor(25000)
  .start();

/*
**********************************************************
**********************************************************
  Handler User Signup, Login, Logout
**********************************************************
**********************************************************
*/

if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    signup(fullname, email, phone, password, confirmPassword);
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    login(email, password);
  });
}

if (logOutBtn) {
  console.log(logOutBtn, "logged out");
  logOutBtn.addEventListener("click", logout);
}

import "@babel/polyfill";
// import Swiper from "swiper";
// import "swiper/swiper-bundle.css";
// import Typewriter from "typewriter-effect/dist/core";

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
const heroSwiper = document.querySelector(".swiper-container");
const testSwiper = document.querySelector(".swiper-testimonial");

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
 Swiper animation
**********************************************************
**********************************************************
*/
if (heroSwiper || testSwiper) {
  const swiper = new Swiper(heroSwiper, {
    speed: 600,
    loop: true,
    // effect: "fade",

    // Default parameters
    slidesPerView: 1,
    spaceBetween: 10,

    autoplay: {
      delay: 4500,
      disableOnInteraction: false,
    },

    pagination: {
      el: ".swiper-pagination",
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  const testimonialSwiper = new Swiper(testSwiper, {
    speed: 600,
    // loop: true,
    // effect: "fade",

    // Default parameters
    slidesPerView: 1,
    spaceBetween: 20,

    autoplay: {
      delay: 4500,
      disableOnInteraction: false,
    },

    breakpoints: {
      // when window width is >= 768px
      768: {
        slidesPerView: 2,
        spaceBetween: 40,
      },

      // when window width is >= 1024px
      1024: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    },
  });
}

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
    signupForm.querySelector("button").textContent = "Please wait...";

    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    signup(
      fullname,
      email,
      phone,
      password,
      confirmPassword,
      signupForm.querySelector("button")
    );
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    loginForm.querySelector("button").textContent = "Please wait...";
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    login(email, password, loginForm.querySelector("button"));
  });
}

if (logOutBtn) {
  console.log(logOutBtn, "logged out");
  logOutBtn.addEventListener("click", logout);
}

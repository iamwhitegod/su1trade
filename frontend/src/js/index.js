// import axios from "axios";
import Typewriter from "typewriter-effect/dist/core";
import * as summit from "./eventHandlers/signup";
import * as e from "./eventHandlers/eventHandler";
import * as canvas from "./eventHandlers/canvas";

(function UIevents() {
  window.onload = function () {
    //hide the preloader
    document.querySelector(".loader-container").style.display = "none";
  };

  // setup event listener
  e.setupEventListners();

  // // Typing animation
  // const heading = document.querySelector('[data--js="typewriter"]');

  // // Animations
  // const typewriter = new Typewriter(heading, {
  //   loop: true,
  //   delay: 75,
  // });

  // typewriter
  //   .pauseFor(250)
  //   .typeString(
  //     `Invest, Buy and Sell Crptocurrencies, Learn Forex Trading and
  //   E-commerce.`
  //   )
  //   .pauseFor(2500)
  //   .deleteChars(71)
  //   .typeString(` and earn 17% profit every month for 5months.`)
  //   .pauseFor(2500)
  //   .deleteChars(40)
  //   .typeString(`get minimum of 28% or more monthly.`)
  //   .pauseFor(25000)
  //   .start();

  // summit.signup();
})();

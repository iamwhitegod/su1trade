// import axios from "axios";

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

  // // Swiper animation

  const swiper = new Swiper(".swiper-container", {
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

  console.log(swiper);

  // const slider = document.querySelector(".swiper-container").swiper;
})();

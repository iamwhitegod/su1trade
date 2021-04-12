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

  const testimonialSwiper = new Swiper(".swiper-testimonial", {
    speed: 600,
    // loop: true,
    // effect: "fade",

    // Default parameters
    slidesPerView: 3,
    spaceBetween: 40,

    autoplay: {
      delay: 4500,
      disableOnInteraction: false,
    },

    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },

      // when window width is >= 600px
      600: {
        slidesPerView: 2,
        spaceBetween: 30,
      },

      // when window width is >= 900px
      900: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    },
  });

  console.log(swiper);

  // const slider = document.querySelector(".swiper-container").swiper;
})();

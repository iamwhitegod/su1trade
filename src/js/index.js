import axios from "axios";

const mbMenu = document.querySelector(".mobile-nav-menu");
mbMenu.addEventListener("click", (e) => {
  mbMenu.classList.toggle("mobile-nav-menu__active");
  document
    .querySelector(".mobile-nav-menu__list")
    .classList.toggle("menu__active");

  // if(mbMenu.classList )
  // // const mvlist = ;
  // // console.log(mvlist);
  // // mvlist.style.display = "block";
});
// mobile-nav-menu__active;

function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;

      if (!immediate) func.apply(context, args);
    };

    var callNew = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNew) func.apply(context, args);
  };
}

const slideCols = document.querySelectorAll(".slide-up");

function checkSlide(e) {
  slideCols.forEach((slideCol) => {
    const elemLoc = window.scrollY + window.innerHeight;
    const elemHeight = slideCol.clientHeight / 2.5;
    const slideInAt = elemLoc - elemHeight;
    //const colTop = slideCol.offsetTop + slideCol.height;

    const colBottom = slideCol.offsetTop + slideCol.clientHeight;
    const isHalfShown = slideInAt > slideCol.offsetTop;
    const isNotScrolledPast = window.scrollY < colBottom;

    // console.log(isHalfShown, isNotScrolledPast, slideInAt);

    if (isHalfShown && isNotScrolledPast) {
      slideCol.classList.add("active");
    }
    // else {
    //   slideCol.classList.remove("active");
    // }
  });
}

window.addEventListener("scroll", debounce(checkSlide));

// Accordion controller
const questionPanel = document.querySelectorAll(".FAQs__question");
// const answerPanel = document.querySelectorAll(".FAQs__answer");

questionPanel.forEach((question) => {
  question.addEventListener("click", (e) => {
    e.target.classList.toggle("FAQs__question--active");
    // e.target.nextElementSibling.classList.toggle("FAQs__answer--active");
  });
});

// const proxy = `https://cors-anywhere.herokuapp.com/`;
// const scriptURL = `${proxy}https://script.google.com/macros/s/AKfycbw8VylXa3hYu3ZmOSOxEG4a6x1tid8oEQ5em55bJwZ87rBqvf-g/exec`;
const form = document.forms["submit-to-google-sheet"];
console.log(form);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // fetch(scriptURL, { method: "POST", body: new FormData(form) })
  //   .then((response) => console.log("Success!", response))
  //   .catch((error) => console.error("Error!", error.message));
  axios({
    method: "POST",
    url: "localhost:5000/createTable",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
});

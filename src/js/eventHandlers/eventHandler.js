const slideCols = document.querySelectorAll(".slide-up");
const mbMenu = document.querySelector(".mobile-nav-menu");
const questionPanel = document.querySelectorAll(".FAQs__question");
const modal = document.querySelector(".modal__container");
const modalPopup = document.querySelector(".modal__popup");
const modalOverlay = document.querySelector(".modal__overlay");

/*This function forces a checklslide
 * function to wait for 20ms before running again
 */

export function debounce(func, wait = 10, immediate = true) {
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

// mobile-nav-menu__active;

export function checkSlide(e) {
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

export const clickEvent = () => {
  mbMenu.addEventListener("click", (e) => {
    mbMenu.classList.toggle("mobile-nav-menu__active");
    document
      .querySelector(".mobile-nav-menu__list")
      .classList.toggle("menu__active");

    if (document.querySelector(".mobile-menu")) {
      document.querySelector(".mobile-menu").classList.toggle("active");
    }
  });

  questionPanel.forEach((question) => {
    question.addEventListener("click", (e) => {
      e.target.classList.toggle("FAQs__question--active");
      // e.target.nextElementSibling.classList.toggle("FAQs__answer--active");
    });
  });
};

/**********************************
 * modal
 **************** */

if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal.querySelector("img")) {
      modal.classList.remove("open-modal");
    }

    if (e.target == modal.querySelector("button")) {
      modal.classList.remove("open-modal");
    }
  });
}

if (modalPopup) {
  modalPopup.addEventListener("click", (e) => {
    if (e.target === modalPopup.querySelector("img")) {
      modalPopup.classList.remove("active");
      modalOverlay.classList.remove("active");
    }

    if (e.target == modalPopup.querySelector("button")) {
      modalPopup.classList.remove("active");
      modalOverlay.classList.remove("active");
    }
  });
}

export function openModal(trigger) {
  trigger.addEventListener("click", () => {
    if (modal) {
      modal.classList.add("open-modal");
    }
  });
}

export function openModalPopup() {
  if (modalPopup) {
    modalPopup.classList.add("active");
    modalOverlay.classList.add("active");
    console.log(modalOverlay);
  }
}

openModalPopup();

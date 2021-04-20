const menu = document.querySelector('[data--js="mobile--menu"]');
const menuPanel = document.querySelector('[data--js="menu--panel"]');
const menuv2 = document.querySelector('[data--js="mobile--menuv2"]');
const menuPanelv2 = document.querySelector('[data--js="menu--panelv2"]');
const menuItems = Array.from(
  document.querySelectorAll('[data--js="menu--item"]')
);
const menuItemsv2 = Array.from(
  document.querySelectorAll('[data--js="menu--itemv2"]')
);
const modalBtns = document.querySelectorAll('[data--js="open--modal"]');
const menuLinks = document.querySelectorAll('[data--js="menu--link"]');
const questionPanel = document.querySelectorAll(".FAQs__question");
const modal = document.querySelector(".modal__container");
const modalPopup = document.querySelector(".modal__popup");
const modalOverlay = document.querySelector(".modal__overlay");

// Setup eventlisteners
export const setupEventListners = () => {
  if (menu) {
    // Toggle mobile menu
    menu.addEventListener("click", (event) => {
      menuPanel.classList.toggle("flex");
    });
  }

  if (menuv2) {
    // Toggle mobile menu
    menuv2.addEventListener("click", (event) => {
      menuPanelv2.parentElement.classList.toggle("d-block");
      menuPanelv2.parentElement.classList.toggle("sidebar-mobile");
      menuPanelv2.classList.toggle("d-block");
    });
  }

  if (menuItems) {
    menuItems.forEach((item) => {
      item.addEventListener("click", (event) => {
        menuItems.forEach((menu) => menu.classList.remove("active"));

        item.classList.add("active");
      });
    });
  }

  if (menuItemsv2) {
    menuItemsv2.forEach((item) => {
      item.addEventListener("click", (event) => {
        menuItemsv2.forEach((menu) => menu.classList.remove("active"));

        item.classList.add("active");
      });
    });
  }

  if (menuLinks) {
    menuLinks.forEach((item) => {
      item.addEventListener("click", (event) => {
        menuLinks.forEach((menu) => menu.classList.remove("active"));

        item.classList.add("active");
      });
    });
  }

  if (questionPanel) {
    questionPanel.forEach((question) => {
      question.addEventListener("click", (e) => {
        e.target.classList.toggle("FAQs__question--active");
        e.target.nextElementSibling.classList.toggle("FAQs__answer--active");
      });
    });
  }

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

      // if (e.target == modalPopup.querySelector("button")) {
      //   modalPopup.classList.remove("active");
      //   modalOverlay.classList.remove("active");
      // }
    });
  }

  if (modalBtns) {
    console.log(modalBtns);
    modalBtns.forEach((btn) => openModal(btn));
  }
};

// setupEventListners();

// /**********************************
//  * modal
//  **************** */

export function openModal(trigger) {
  trigger.addEventListener("click", () => {
    if (modalPopup) {
      modalPopup.classList.add("active");
      modalOverlay.classList.add("active");
      // console.log(modalOverlay);
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

// openModalPopup();

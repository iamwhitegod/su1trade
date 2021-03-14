const menu = document.querySelector('[data--js="mobile--menu"]');
const menuPanel = document.querySelector('[data--js="menu--panel"]');
const menuItems = Array.from(
  document.querySelectorAll('[data--js="menu--item"]')
);
const menuLinks = document.querySelectorAll('[data--js="menu--link"]');
const questionPanel = document.querySelectorAll(".FAQs__question");

// Setup eventlisteners
export const setupEventListners = () => {
  // Toggle mobile menu
  if (menu) {
    menu.addEventListener("click", (event) => {
      menuPanel.classList.toggle("flex");
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
};

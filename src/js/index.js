// import axios from "axios";
import * as summit from "./eventHandlers/summitForm";
import * as e from "./eventHandlers/eventHandler";
import * as canvas from "./eventHandlers/canvas";

(function UIevents() {
  // window.addEventListener("scroll", e.debounce(e.checkSlide));
  e.setupEventListners();
  summit.collectRegistrationContact();
  summit.collectSignUpForm();
})();

// canvas.init();
// canvas.animate();

// import axios from "axios";
import * as summit from "./eventHandlers/summitForm";
import * as e from "./eventHandlers/eventHandler";

(function UIevents() {
  window.addEventListener("scroll", e.debounce(e.checkSlide));
  e.clickEvent();
  summit.collectRegistrationContact();
  summit.collectSignUpForm();
})();

import axios from "axios";
import * as summit from "./eventHandlers/summitForm";
import * as e from "./eventHandlers/eventHandler";

(function UIevents() {
  // summit.collectUserForm();
  e.clickEvent();

  window.addEventListener("scroll", e.debounce(e.checkSlide));
})();

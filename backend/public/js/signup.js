import "@babel/polyfill";
import axios from "axios";
import { showAlert } from "./alert";

export const signup = async (
  fullname,
  email,
  phone,
  password,
  confirmPassword,
  btn
) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/signup",
      data: {
        fullname,
        email,
        phone,
        password,
        confirmPassword,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", "Signed up successfully!");
      btn.textContent = "Create an Account";
      window.setTimeout(() => {
        location.assign("/user/dashboard");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", "Sorry, unable to create account. Try Again!");
    btn.textContent = "Create an Account";
  }
};

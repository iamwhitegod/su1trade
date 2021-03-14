import "@babel/polyfill";
import axios from "axios";
import {showAlert} from './alert';

export const signup = async (
  fullname,
  email,
  phone,
  password,
  confirmPassword
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
      window.setTimeout(() => {
        location.assign("/user/dashboard");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

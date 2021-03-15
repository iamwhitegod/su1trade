import "@babel/polyfill";
import axios from "axios";
import { showAlert } from "./alert";

export const login = async (email, password, btn) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/login",
      data: {
        email,
        password,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", "Logged in successfully!");
      btn.textContent = "Sign in";
      window.setTimeout(() => {
        location.assign("/user/dashboard");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", "Invalid email or password. Try Again");
    btn.textContent = "Sign in";
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "/api/v1/users/logout",
    });
    if ((res.data.status = "success")) location.replace("/login");
  } catch (err) {
    console.log(err.response.data.message);
    showAlert("error", "logging out! Try again.");
  }
};

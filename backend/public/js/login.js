import "@babel/polyfill";
import axios from "axios";
import { showAlert } from "./alert";

export const login = async (email, password) => {
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
      window.setTimeout(() => {
        location.assign("/user/dashboard");
      }, 1500);
    }
  } catch (err) {
    console.log(err);
    showAlert("error", "Invalid email or password");
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

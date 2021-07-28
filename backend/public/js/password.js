import "@babel/polyfill";
import axios from "axios";

export const forgotPassword = async function (email) {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/forgot-password",
      data: {
        email,
      },
    });

    console.log(res);
  } catch (err) {
    console.log(err.message);
  }
};

export const resetPassword = async function (
  password,
  confirmPassword,
  pathname
) {
  try {
    const res = await axios({
      method: "PATCH",
      url: `/api/v1/users${pathname}`,
      data: {
        password,
        confirmPassword,
      },
    });

    console.log(res);

    if (res.data.status === "success") {
      showAlert("success", "Password changed successfully!");
      window.setTimeout(() => {
        location.assign("/login");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", "Something went wrong. Try Again!");
  }
};

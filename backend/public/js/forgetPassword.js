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
  } catch (err) {
    console.log(err.message);
  }
};

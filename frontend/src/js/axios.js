import axios from "axios";

const instance = axios.create({
  baseURL: "localhost:5000/api/v1/users",
});

export default instance;

import axios from "axios";

const Url = axios.create({
  baseURL: "https://wexabackend.onrender.com",
});

export default Url;

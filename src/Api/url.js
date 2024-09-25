import axios from "axios";

const Url = axios.create({
  baseURL: "https://wexabackend.onrender.com/api/v1",
});

export default Url;

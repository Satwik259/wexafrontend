import axios from "axios";

const Url = axios.create({
  baseURL: "http://localhost:9032/api/v1/",
});

export default Url;

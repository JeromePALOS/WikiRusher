import axios from "axios";

export default axios.create({
  baseURL: process.env.VUE_APP_ROOT_BACK_URL + "/api",
  //baseURL: "http://wikirusher.com:8080/api",
  headers: {
    "Content-type": "application/json"
  }
});

import axios from "axios";

export default axios.create({
  baseURL: "https://animegon-server.herokuapp.com/",
});

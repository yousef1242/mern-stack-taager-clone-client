import axios from "axios";


const request = axios.create({
  baseURL: "https://mern-stack-taager-clone-server.onrender.com",
});

export default request;
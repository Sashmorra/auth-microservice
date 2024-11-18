import axios from "axios";


const instance = axios.create({
  baseURL: process.env.USERS_SERVICE_URL,
});

export { instance };

import axios from "axios";
import { BASE_URL_DEV, BASE_URL_PROD } from "../constants/constants";

const services = {};

services.login = async (email, password) => {
  try {
    const { data } = await axios.post(`${BASE_URL_DEV}/auth/login`, { email, password });
    return data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return {
        ok: false,
        msg: error,
      };
    }
  }
};

services.renewToken = async (token = "") => {
  try {
    const { data } = await axios.get(`${BASE_URL_DEV}/auth/renew`, {
      headers: {
        "x-token": token,
      }
    });
    return data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return {
        ok: false,
        msg: error,
      };
    }
  }
}
export default services;

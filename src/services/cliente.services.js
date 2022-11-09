import axios from "axios";
import { BASE_URL_DEV, BASE_URL_PROD } from "../constants/constants";

const services = {};

services.create = async (cliente) => {
  try {
    const { data } = await axios.post(`${BASE_URL_DEV}/cliente/new`, cliente);
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

services.search = async (search) => {
  try {
    const { data } = await axios.get(`${BASE_URL_DEV}/cliente/search?term=${search}`);
    return data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return {
        ok: false,
        msg: error,
        clientes: [],
      };
    }
  }
}

export default services;

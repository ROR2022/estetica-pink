import axios from "axios";
import { hostURL } from "./dataEnv";

export const registerUser = async (user) => {
  try {
    console.log("Registering: ", user);
    const response = await axios.post(`${hostURL}/api/auth/register`, user);
    console.log("Response Register: ", response);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const confirmVerificationCode = async (verification, code) => {
  try {
    const response = await axios.post(`${hostURL}/api/verification/confirm`, {
      verification,
      code,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const loginUser = async (user) => {
  try {
    const response = await axios.post(`${hostURL}/api/auth/login`, user);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const createResena = async (dataResena, token) => {
  // agregar token a la peticion
  const config = {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.post(`${hostURL}/api/resenas`, dataResena, config);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const getResenas = async () => {
  try {
    const response = await axios.get(`${hostURL}/api/resenas`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}

export const createVerification = async (email) => {
  try {
    const response = await axios.post(`${hostURL}/api/verification`, { email });
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}

export const updatedPassword = async (dataRecovery) => {
  try {
    const response = await axios.post(`${hostURL}/api/auth/recovery`, dataRecovery);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}
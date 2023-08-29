// Services/AuthService.js

import { httpClient } from "../Utils/HttpClient";

export const login = async (data) => {
  try {
    const response = await httpClient.post('api/Auth/Login', data);
    console.log('Response:', response);
    return response.data; 
  } catch (error) {
    throw error;
  }
};

export const register = async (data) => {
  try {
    const response = await httpClient.post('api/Auth/Register', data);
    console.log('Response:', response);
    return response.data; 
  } catch (error) {
    throw error;
  }
};

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

export const getUserRoles = async (Id) => {
  const response = await httpClient.get(`/api/Auth/getUserRole?userId=${Id}`);
  return response;
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
export const ConfirmEmailSend = async(data) =>{
  const response = await httpClient.post('api/ConfirmEmail/ConfirmEmai',data)
  console.log('Response:', response);
}
export const ResetPasswordSend = async(userId) =>{
  console.log(userId)
  const response = await httpClient.post(`https://localhost:7222/api/Auth/ResetPasswordLetter/${userId}`)
}
export const ResetPassword = async(data) =>{
  try {
    const response = await httpClient.post('api/Auth/ResetPassword',data)
    console.log('Response:', response);
    return response.data; 
  } catch (error) {
    throw error;
  }
}
export const ForgetPasswordSend = async(mail) =>{
  console.log(mail)
  const response = await httpClient.post(`/api/Auth/ForgetPasswordLetter/${mail.value}`)
  return response; 
}
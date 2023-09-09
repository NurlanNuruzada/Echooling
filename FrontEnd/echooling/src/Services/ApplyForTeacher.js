import { httpClient } from "../Utils/HttpClient";
export const ApplyAsTeacher = async (AppUserId, data) => {
  const response = await httpClient.post(`/api/Teacher/id?id=${AppUserId}`, data);
  console.log('Response:', response.data);
  console.log('AppUserId:', AppUserId);
  return response.data;
};
import { httpClient } from "../Utils/HttpClient";

// Add JWT authorization headers to the request
const addJwtHeaders = (jwt) => ({
  headers: {
    Authorization: `Bearer ${jwt}`
  },
});

export const ApplyAsTeacher = async (AppUserId, data, jwt) => {
  const response = await httpClient.post(`/api/Teacher/id?id=${AppUserId}`, data, {
    ...addJwtHeaders(jwt),
    "Content-Type": "application/json" // Adjust the content type as needed
  });
  console.log('Response:', response.data);
  console.log('AppUserId:', AppUserId);
  return response.data;
};

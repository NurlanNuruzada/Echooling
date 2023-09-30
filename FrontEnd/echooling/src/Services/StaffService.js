import { httpClient } from "../Utils/HttpClient";

// Add JWT authorization headers to the request
const addJwtHeaders = (jwt) => ({
  headers: {
    Authorization: `Bearer ${jwt}`
  },
});

export const GetUStaffUsers = (jwt) => {
  return httpClient.get('/api/Staff/GetStaffDetails', addJwtHeaders(jwt));
};

export const getById = async (Id, jwt) => {
  const response = await httpClient.get(`/api/Staff/id?id=${Id}`, addJwtHeaders(jwt));
  return response;
};

export const ApplyForStaffForm = async (AppUserId, data, jwt) => {
  const response = await httpClient.post(`/api/Staff/CreateStaff/id?id=${AppUserId}`, data, {
    ...addJwtHeaders(jwt),
    "Content-Type": "application/json" // Adjust the content type as needed
  });
  return response.data;
};

export const DeleteStaff = async (TeacherId, DeletedById, jwt) => {
  const response = await httpClient.delete(`/api/Staff/id?id=${TeacherId}&RemovedById=${DeletedById}`, addJwtHeaders(jwt));
  return response.data;
};

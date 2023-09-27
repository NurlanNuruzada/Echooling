import { httpClient } from "../Utils/HttpClient";

// Add JWT authorization headers to the request
const addJwtHeaders = (jwt) => ({
  headers: {
    Authorization: `Bearer ${jwt}`
  },
});

export const getAllEventCategories = async (jwt) => {
  const response = await httpClient.get('/api/EventCategory', addJwtHeaders(jwt));
  return response;
};

export const getAllCourseategories = async (jwt) => {
  const response = await httpClient.get('/api/CourseCategory', addJwtHeaders(jwt));
  return response;
};

export const postCourseCategory = async (data, jwt) => {
  const response = await httpClient.post('/api/CourseCategory', data, {
    ...addJwtHeaders(jwt),
    "Content-Type": "application/json" // Adjust the content type as needed
  });
  return response;
};

export const postEventCategory = async (data, jwt) => {
  const response = await httpClient.post('/api/EventCategory', data, {
    ...addJwtHeaders(jwt),
    "Content-Type": "application/json" // Adjust the content type as needed
  });
  return response;
};

export const DeleteEventCategory = async (GuId, jwt) => {
  const response = await httpClient.delete(`/api/EventCategory/id?id=${GuId}`, null, {
    ...addJwtHeaders(jwt),
    "Content-Type": "application/json" // Adjust the content type as needed
  });
  return response;
};

export const DeleteCourseCategory = async (GuId, jwt) => {
  const response = await httpClient.delete(`/api/CourseCategory/id?id=${GuId}`, null, {
    ...addJwtHeaders(jwt),
    "Content-Type": "application/json" // Adjust the content type as needed
  });
  return response;
};

import { httpClient } from "../Utils/HttpClient";

// Add JWT authorization headers to the request
const addJwtHeaders = (jwt) => ({
  headers: {
    Authorization: `Bearer ${jwt}`
  },
});

export const getSliders2 = (jwt) => {
  return httpClient.get("/api/Slider/getAll", addJwtHeaders(jwt));
}

export const getSliders = (jwt) => {
  try {
    return httpClient.get("/api/Slider/getAll", addJwtHeaders(jwt));
  } catch (error) {
    throw error;
  }
}

export const DeleteSliders = async (Id, jwt) => {
  const response = await httpClient.delete(`/api/Slider/delete/id?id=${Id}`, addJwtHeaders(jwt));
  return response.data;
}

export const UpdateSlider = async (Id, formData, jwt) => {
  const response = await httpClient.put(`/api/Slider/id?id=${Id}`, formData, {
    ...addJwtHeaders(jwt),
    "Content-Type": "multipart/form-data; boundary=l3iPy71otz"
  });
  return response.data;
}

export const GetSliderId = async (Id, jwt) => {
  const response = await httpClient.get(`/api/Slider/id?id=${Id}`, addJwtHeaders(jwt));
  return response.data;
}

export const CreateSliderFunction = async (formData, jwt) => {
  console.log("formdata inside of the Service", formData);
  const response = await httpClient.post(`/api/Slider/Create`, formData, {
    ...addJwtHeaders(jwt),
    "Content-Type": "multipart/form-data; boundary=l3iPy71otz"
  });
  return response.data;
}

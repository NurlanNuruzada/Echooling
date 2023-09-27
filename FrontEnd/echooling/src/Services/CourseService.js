import { httpClient } from "../Utils/HttpClient";

// Add JWT authorization headers to the request
const addJwtHeaders = (jwt) => ({
  headers: {
    Authorization: `Bearer ${jwt}`
  },
});

export const getallCourses = (jwt) => {
  try {
    return httpClient.get("/api/Course/getAll", addJwtHeaders(jwt));
  } catch (error) {
    throw error;
  }
};

export const getAllCourseByExpression = (title, category, rating, jwt) => {
  try {
    const params = new URLSearchParams();

    if (title !== undefined) {
      params.append("courseName", title);
    }
    if (category !== undefined) {
      params.append("category", category);
    }
    if (rating !== undefined) {
      params.append("rating", rating);
    }
    console.log(...params);
    return httpClient.get(`https://localhost:7222/api/Course/SearchCourse?${params.toString()}`, addJwtHeaders(jwt));
  } catch (error) {
    throw error;
  }
};

export const DeleteCourse = async (Id, jwt) => {
  const response = await httpClient.delete(`/api/Course/id?id=${Id}`, addJwtHeaders(jwt));
  return response.data;
};

export const UpdateCourseById = async (Id, formData, jwt) => {
  const response = await httpClient.put(`/api/Course/update/id?id=${Id}`, formData, {
    ...addJwtHeaders(jwt),
    "Content-Type": "multipart/form-data; boundary=l3iPy71otz"
  });
  return response.data;
};

export const AddCourse = async (userId, data, jwt) => {
  try {
    const response = await httpClient.post(`/api/Course/Create/id?TeacherId=${userId}`, data, {
      ...addJwtHeaders(jwt),
      "Content-Type": "multipart/form-data; boundary=l3iPy71otz"
    });
    console.log('Response:', response);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const GetCourseId = async (Id, jwt) => {
  const response = await httpClient.get(`/api/Course/get/id?id=${Id}`, addJwtHeaders(jwt));
  return response.data;
};

export const getCourseTeachers = async (CourseId, jwt) => {
  const response = await httpClient.get(`/api/Course/getCourseTeachers/id?CourseId=${CourseId}`, addJwtHeaders(jwt));
  return response.data;
};

export const getLastestWithCount = async (take, categoryId, jwt) => {
  const response = await httpClient.get(`/api/Course/GetLastestWithCount?take=${take}&categoryId=${categoryId}`, addJwtHeaders(jwt));
  return response.data;
};

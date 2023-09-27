import { httpClient } from "../Utils/HttpClient";

// Add JWT authorization headers to the request
const addJwtHeaders = (jwt) => ({
  headers: {
    Authorization: `Bearer ${jwt}`
  },
});

export const AddAppUserToEvent = async (data, jwt) => {
  const response = await httpClient.get('/api/AppuserEvent/AddUsertoEvent', data, addJwtHeaders(jwt));
  console.log('Response:', response);
  return response.data;
};

export const getallEvents = (jwt) => {
  try {
    return httpClient.get("/api/Event", addJwtHeaders(jwt));
  } catch (error) {
    throw error;
  }
};

export const DeleteEvents = async (Id, jwt) => {
  const response = await httpClient.delete(`/api/Event/id?id=${Id}`, addJwtHeaders(jwt));
  return response.data;
};

export const AddEvent = async (userId, data, jwt) => {
  try {
    const response = await httpClient.post(`/api/Event/Create/id?staffId=${userId}`, data, {
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

export const UpdateEventById = async (Id, formData, jwt) => {
  const response = await httpClient.put(`/api/Event/id?id=${Id}`, formData, {
    ...addJwtHeaders(jwt),
    "Content-Type": "multipart/form-data; boundary=l3iPy71otz"
  });
  return response.data;
};

export const GetEventId = async (Id, jwt) => {
  const response = await httpClient.get(`/api/Event/id?id=${Id}`, addJwtHeaders(jwt));
  return response.data;
};

export const getEventById = async (Id, jwt) => {
  const response = await httpClient.get(`/api/Event/id?id=${Id}`, addJwtHeaders(jwt));
  return response.data;
};

export const getUserByEventId = async (Id, jwt) => {
  const response = await httpClient.get(`/api/EventStaff/get/id?id=${Id}`, addJwtHeaders(jwt));
  return response.data;
};

export const getAllEventByExpression = (title, category, StartDate, EndDate, Location, jwt) => {
  try {
    const params = new URLSearchParams();

    if (title !== undefined) {
      params.append("EventName", title);
    }

    if (category !== undefined) {
      params.append("category", category);
    }

    if (StartDate !== undefined) {
      params.append("StartDate", StartDate);
    }

    if (EndDate !== undefined) {
      params.append("EndDate", EndDate);
    }

    if (Location !== undefined) {
      params.append("location", Location);
    }

    return httpClient.get(`https://localhost:7222/api/Event/SearchCourse?${params.toString()}`, addJwtHeaders(jwt));
  } catch (error) {
    throw error;
  }
};

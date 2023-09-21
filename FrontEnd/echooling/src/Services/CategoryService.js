import { httpClient } from "../Utils/HttpClient";

export const getAllEventCategories = async () => {
    const response = await httpClient.get('/api/EventCategory');
    return response;
}
export const getAllCourseategories = async () => {
    const response = await httpClient.get('/api/CourseCategory');
    return response;
}
export const postCourseCategory = async (data) => {
    const response = await httpClient.post('/api/CourseCategory', data);
    return response;
}
export const postEventCategory = async (data) => {
    const response = await httpClient.post('/api/EventCategory', data);
    return response;
}
export const DeleteEventCategory = async (GuId) => {
    const response = await httpClient.delete(
        `/api/EventCategory/id?id=${GuId}`,
        null, // No request body (or you can provide an empty object)
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
    return response;
};

export const DeleteCourseCategory = async (GuId) => {
    const response = await httpClient.delete(
        `/api/CourseCategory/id?id=${GuId}`,
        null, // No request body (or you can provide an empty object)
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
    return response;
};

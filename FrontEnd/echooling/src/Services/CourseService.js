import { httpClient } from "../Utils/HttpClient";



export const AddCourse = async (userId, data) => {
    try {
        const response = await httpClient.post(`/api/Course/Create/id?TeacherId=${userId}`, data, {
            headers: {
                "Content-Type": "multipart/form-data; boundary=l3iPy71otz",
            },
        });
        console.log('Response:', response);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
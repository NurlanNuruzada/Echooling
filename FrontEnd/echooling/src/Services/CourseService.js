import { httpClient } from "../Utils/HttpClient";

export const getallCourses = () => {
    try {
        return httpClient.get("/api/Course/getAll")
    }
    catch (error) {
        throw error
    }
}
export const getAllCourseByExpression = (title, category, rating) => {
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
        return httpClient.get(`https://localhost:7222/api/Course/SearchCourse?${params.toString()}`);
    } catch (error) {
        throw error;
    }
};

export const DeleteCourse = async (Id) => {
    const response = await httpClient.delete(`/api/Course/id?id=${Id}`)
    return response.data;
}
export const UpdateCourseById = async (Id, formData) => {
    const response = await httpClient.put(`/api/Course/update/id?id=${Id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data; boundary=l3iPy71otz",
        },
    });
    return response.data;
}

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
export const GetCourseId = async (Id) => {
    const response = await httpClient.get(`/api/Course/get/id?id=${Id}`)
    return response.data;
}
export const getCourseTeachers = async (CourseId) => {
    const response = await httpClient.get(`/api/Course/getCourseTeachers/id?CourseId=${CourseId}`)
    return response.data;
}
export const getLastestWithCount = async (take, categoryId) => {
    const response = await httpClient.get(`/api/Course/GetLastestWithCount?take=${take}&categoryId=${categoryId}`)
    return response.data;
}

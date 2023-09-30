import { httpClient } from "../Utils/HttpClient";

export const getallCommentOfCourse = (Id) => {
    try {
        const response =  httpClient.get(`/api/CourseReview/getReviewsOfCourseById2/id?CourseId=${Id.toString()}`)
        return response
    }
    catch (error) {
        throw error
    }
}
export const AddCommnent = (formData) => {
    try {
        return httpClient.post(`/api/CourseReview/Create`, formData, {
            headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
            },
        });
    } catch (error) {
        throw error;
    }
};
export const DeleteComment = async (reviewId,UserId) => {
    const response = await httpClient.delete(`/api/CourseReview/delete/id?reviewId=${reviewId}&UserId=${UserId}`)
    return response.data;
}
export const UpdateReview = async (reviewId, UserId,formData) => {
    const response = await httpClient.put(`/api/CourseReview/id?reviewId=${reviewId}&UserId=${UserId}`, formData)
    return response.data;
}

export const AddCourse = async (userId, data) => {
    try {
        const response = await httpClient.post(`/api/Course/Create/id?TeacherId=${userId}`, data, {
            headers: {
                "Content-Type": "multipart/form-data; boundary=l3iPy71otz",
            },
        });
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
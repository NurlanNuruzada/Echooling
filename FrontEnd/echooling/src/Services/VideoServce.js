
import { httpClient } from "../Utils/HttpClient";

export const UploadVideo = async (id,formData) => {
    const response = await httpClient.post(`/api/VideoContent/Create?CourseId=${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data; boundary=l3iPy71otz",
        },
    });
    return response.data;
}
export const GetVideosByCourseId = (CourseId, take = 0) => {
    try {
        return httpClient.get(`/api/VideoContent/GetVideosByCourseIdid?CourseId=${CourseId}&take=${take}`);
    } catch (error) {
        throw error;
    }
}

export const deleteVideo = (Id) => {
    try {
        return httpClient.delete(`/api/VideoContent/delete/id?id=${Id}`)
    }
    catch (error) {
        throw error
    }
}
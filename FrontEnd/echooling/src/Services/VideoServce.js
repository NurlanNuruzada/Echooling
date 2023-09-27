
import { httpClient } from "../Utils/HttpClient";

export const UploadVideo = async (id,formData) => {
    const response = await httpClient.post(`/api/VideoContent/Create?CourseId=${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data; boundary=l3iPy71otz",
        },
    });
    return response.data;
}
export const GetVideosByCourseId = (Id) => {
    try {
        return httpClient.get(`/api/VideoContent/id?id=${Id}`)
    }
    catch (error) {
        throw error
    }
}
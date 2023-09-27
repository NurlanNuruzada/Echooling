
import { httpClient } from "../Utils/HttpClient";

export const UploadVideo = async (formData) => {
    const response = await httpClient.put(`/api/VideoContent/Create`, formData, {
        headers: {
            "Content-Type": "multipart/form-data; boundary=l3iPy71otz",
        },
    });
    return response.data;
}
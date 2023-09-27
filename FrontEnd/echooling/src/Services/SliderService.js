import { httpClient } from "../Utils/HttpClient";
export const getSliders2 = (jwt) => {
    return httpClient.get("/api/Slider/getAll"), {
        headers: {
            Authorization: `Bearer ${jwt}`
        },
    }
}
export const getSliders = () => {
    try {
        return httpClient.get("/api/Slider/getAll")
    }
    catch (error) {
        throw error
    }
}
export const DeleteSliders = async (Id) => {
    const response = await httpClient.delete(`/api/Slider/delete/id?id=${Id}`)
    return response.data;
}
export const UpdateSlider = async (Id,formData) => {
    const response = await httpClient.put(`/api/Slider/id?id=${Id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data; boundary=l3iPy71otz",
        },
    });
    return response.data;
}
export const GetSliderId = async (Id) => {
    const response = await httpClient.get(`/api/Slider/id?id=${Id}`)
    return response.data;
}
export const CreateSliderFunction = async (formData) => {
    console.log("formdata inside of the Service",formData)
    const response = await httpClient.post(`/api/Slider/Create`, formData, {
        headers: {
            "Content-Type": "multipart/form-data; boundary=l3iPy71otz",
        },
    });
    return response.data;
}
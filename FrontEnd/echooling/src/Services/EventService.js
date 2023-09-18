import { httpClient } from "../Utils/HttpClient";

// export default getEvents = () =>{
//     httpClient.get()
// }
export const AddAppUserToEvent = async (data) => {
    const response = await httpClient.get('/api/AppuserEvent/AddUsertoEvent', data)
    console.log('Response:', response);
    return response.data;
}
export const getallEvents = () => {
    try {
        return httpClient.get("/api/Event")
    }
    catch (error) {
        throw error
    }
}
export const DeleteEvents = async (Id) => {
    const response = await httpClient.delete(`/api/Event/id?id=${Id}`)
    return response.data;
}
export const AddEvent = async (userId, data) => {
    try {
        const response = await httpClient.post(`/api/Event/Create/id?staffId=${userId}`, data, {
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
export const UpdateEventById = async ( Id,formData) => {
    const response = await httpClient.put(`/api/Event/id?id=${Id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data; boundary=l3iPy71otz",
        },
    });
    return response.data;
}
export const GetEventId = async (Id) => {
    const response = await httpClient.get(`/api/Event/id?id=${Id}`)
    return response.data;
}
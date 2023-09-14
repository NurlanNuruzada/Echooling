import { httpClient } from "../Utils/HttpClient";

// export default getEvents = () =>{
//     httpClient.get()
// }
export const AddAppUserToEvent = async (data) => {
    const response = await httpClient.get('/api/AppuserEvent/AddUsertoEvent', data)
    console.log('Response:', response);
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

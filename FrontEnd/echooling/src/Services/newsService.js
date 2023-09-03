import { httpClient } from "../Utils/HttpClient";

export const  sentNotification= async (email)=> {
    const response = await httpClient.post('api/News/SendNofication', email);
    console.log('Response:', response);
    return response.data; 
}
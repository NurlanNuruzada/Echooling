import { httpClient } from "../Utils/HttpClient";

export const  getAllEventCategories= async ()=> {
    const response = await httpClient.get('/api/EventCategory');
    return response.data; 
}
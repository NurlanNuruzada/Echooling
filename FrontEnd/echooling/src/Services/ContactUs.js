import { httpClient } from "../Utils/HttpClient";
export const  ContactUs= async (email)=> {
    const response = await httpClient.post('/api/News/ContactMessage', email);
    console.log('Response:', response);
    return response.data; 
}
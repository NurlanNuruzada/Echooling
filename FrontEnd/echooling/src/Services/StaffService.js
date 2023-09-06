import { httpClient } from "../Utils/HttpClient";

export const GetUStaffUsers = () =>{
    return httpClient.get('/api/Staff/GetTeachers')
}   
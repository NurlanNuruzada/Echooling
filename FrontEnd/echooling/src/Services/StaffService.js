import { httpClient } from "../Utils/HttpClient";

export const GetUStaffUsers = () =>{
    return httpClient.get('/api/Staff/GetStaffDetails')
}   
export const getById = (Id) =>{
    return httpClient.get(`/api/Staff/id?id=${Id}`)
}   
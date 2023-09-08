import { httpClient } from "../Utils/HttpClient";
export const getTeacherById = (Id) =>{
    return httpClient.get(`/api/Teacher/id?id=${Id}`)
}  
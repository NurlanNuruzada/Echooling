import { httpClient } from "../Utils/HttpClient";
export const getTeacherById = async (Id) => {
    return await httpClient.get(`/api/Teacher/id?id=${Id}`)
}  
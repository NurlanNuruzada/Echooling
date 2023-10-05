import { httpClient } from "../Utils/HttpClient";
export const GetInfo = () => {
    return  httpClient.get("/api/info/GetInfo")} 
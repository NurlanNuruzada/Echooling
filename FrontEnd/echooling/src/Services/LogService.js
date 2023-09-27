
import { httpClient } from "../Utils/HttpClient";

export const GetAllLogs = () => {
    try {
        return httpClient.get("/api/Logger")
    }
    catch (error) {
        throw error
    }
}
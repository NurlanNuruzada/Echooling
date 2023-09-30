import { httpClient } from "../Utils/HttpClient";

export const getAllRoles = async (jwt) => {
    try {
        const response = await httpClient.get("/api/Auth/GetAllRoles", {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};
export const GetAllUsersWithRoles = async (jwt) => {
    try {
        const response = await httpClient.get("/api/Auth/GetAllUsers", {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const AddRole = async (userId,Role ) => {
    try {
        console.log(Role);
        const response = await httpClient.post(`/api/Auth/AddRole?userId=${userId}&Role=${Role}`)
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const RemoveRole = async (userId,  Role) => {
    const response = await httpClient.post(`/api/Auth/RemoveRole?userId=${userId}&Role=${Role}`)
    return response.data;
}
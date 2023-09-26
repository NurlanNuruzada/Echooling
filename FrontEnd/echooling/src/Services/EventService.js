import { httpClient } from "../Utils/HttpClient";

// export default getEvents = () =>{
//     httpClient.get()
// }
export const AddAppUserToEvent = async (data) => {
    const response = await httpClient.get('/api/AppuserEvent/AddUsertoEvent', data)
    console.log('Response:', response);
    return response.data;
}
export const getallEvents = () => {
    try {
        return httpClient.get("/api/Event")
    }
    catch (error) {
        throw error
    }
}
export const DeleteEvents = async (Id) => {
    const response = await httpClient.delete(`/api/Event/id?id=${Id}`)
    return response.data;
}
export const AddEvent = async (userId, data) => {
    try {
        const response = await httpClient.post(`/api/Event/Create/id?staffId=${userId}`, data, {
            headers: {
                "Content-Type": "multipart/form-data; boundary=l3iPy71otz",
            },
        });
        console.log('Response:', response);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
export const UpdateEventById = async (Id, formData) => {
    const response = await httpClient.put(`/api/Event/id?id=${Id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data; boundary=l3iPy71otz",
        },
    });
    return response.data;
}
export const GetEventId = async (Id) => {
    const response = await httpClient.get(`/api/Event/id?id=${Id}`)
    return response.data;
}
export const getEventById = async (Id) => {
    const response = await httpClient.get(`/api/Event/id?id=${Id}`)
    return response.data;
}
export const getUserByEventId = async (Id) => {
    const response = await httpClient.get(`/api/EventStaff/get/id?id=${Id}`)
    return response.data;
}

export const getAllEventByExpression = (title, category, StartDate, EndDate, Location) => {
    try {
        const params = new URLSearchParams();

        if (title !== undefined) {
            params.append("EventName", title);
        }

        if (category !== undefined) {
            params.append("category", category);
        }

        if (StartDate !== undefined) {
            params.append("StartDate", StartDate);
        }

        if (EndDate !== undefined) {
            params.append("EndDate", EndDate);
        }

        if (Location !== undefined) {
            params.append("location", Location);
        }

        return httpClient.get(`https://localhost:7222/api/Event/SearchCourse?${params.toString()}`);
    } catch (error) {
        throw error;
    }
};

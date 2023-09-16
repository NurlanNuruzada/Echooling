import { httpClient } from "../Utils/HttpClient";

export const  getAllEventCategories= async ()=> {
    const response = await httpClient.get('/api/EventCategory');
    return response; 
}
export const  getAllCourseategories= async ()=> {
    const response = await httpClient.get('/api/CourseCategory');
    return response; 
}
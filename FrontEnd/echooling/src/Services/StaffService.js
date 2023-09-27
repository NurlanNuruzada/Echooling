import { httpClient } from "../Utils/HttpClient";

export const GetUStaffUsers = () =>{
    return httpClient.get('/api/Staff/GetStaffDetails')
}   
export const getById =async (Id) =>{
    const response = await  httpClient.get(`/api/Staff/id?id=${Id}`)
    return response;
}   
export const ApplyForStaffForm = async (AppUserId, data) => {
    const response = await  httpClient.post(`/api/Staff/CreateStaff/id?id=${AppUserId}`,data)
    console.log('Response:', response.data);
    console.log('AppUserId:', AppUserId);
    return response.data;
  };

  export const DeleteStaff = async (TeacherId,DeletedById) => {
    const response = await httpClient.delete(`/api/Staff/id?id=${TeacherId}&RemovedById=${DeletedById}`)
    return response.data;
}
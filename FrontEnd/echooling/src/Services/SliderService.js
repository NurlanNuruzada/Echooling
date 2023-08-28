import { httpClient } from "../Utils/HttpClient";

export const getSliders = (jwt)=>{
   return httpClient.get("https://localhost:7222/"),{
       headers: {
           Authorization: `Bearer ${jwt}`
    },
}
}   
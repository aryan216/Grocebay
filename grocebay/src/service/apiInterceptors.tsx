import axios from "axios";
import { BASE_URL } from "./config";
import { refresh_tokens } from "./authService";
import { Alert } from "react-native";
import { tokenStorage } from "@state/storage";

export const appAxios = axios.create({
    baseURL: BASE_URL
})

appAxios.interceptors.request.use(async config => {
    const accessToken = await tokenStorage.getString("accessToken");
    if(accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
}
    
)

appAxios.interceptors.response.use(
    response=>response,
    async error=>{
        if(error.response && error.response.status===401){
            try {
                const newAccessToken=await refresh_tokens();
                if(newAccessToken){
                    error.config.headers.Authorization = `Bearer ${newAccessToken}`;
                    return axios(error.config);
                }
                
            } catch (error) {
                console.log("refresh token error",error);
            }
        }

        if(error.response && error.response.status !=401){
            
                const errorMessage=error.response.data.message || "Something went wrong";
                console.log(errorMessage);
           
            
        }
        return Promise.resolve(error);
    }
)
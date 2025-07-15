import axios from "axios";
import { BASE_URL } from "./config";
import { tokenStorage } from "@state/storage";
import { useAuthStore } from "@state/authStorage";

export const customerLogin= async(phone:string)=>{
    try {
    const response=await axios.post(`${BASE_URL}/customer/login`,{phone})
    const {accessToken,refreshToken,customer}=response.data;
    tokenStorage.set("accessToken",accessToken);
    tokenStorage.set("refreshToken",refreshToken);
    const {setUser}=useAuthStore.getState();
    setUser(customer);
    } catch (error) {
        console.log("Login Error",error)
    }
}

export const deliveryLogin= async(email:string, password:string)=>{
    try {
    const response=await axios.post(`${BASE_URL}/customer/login`,{email,password})
    const {accessToken,refreshToken,deliveryPartner}=response.data;
    tokenStorage.set("accessToken",accessToken);
    tokenStorage.set("refreshToken",refreshToken);
    const {setUser}=useAuthStore.getState();
    setUser(deliveryPartner);
    } catch (error) {
        console.log("Login Error",error)
    }
}
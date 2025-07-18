import { Platform } from "react-native"

export const GOOGLE_MAP_API='AIzaSyBc5qooUejy4VIh8rob22jQ_KlvZl6Y0Uo'
export const BASE_URL=Platform.OS==='android'? 'http://192.168.1.47:3000/api/v1' : 'http://localhost:3000/api/v1' 
export const SOCKET_URL=Platform.OS==='android'? 'http://192.168.1.4:3000/api/v1' : 'http://localhost:3000'


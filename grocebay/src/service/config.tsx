import { Platform } from "react-native"

export const BASE_URL=Platform.OS==='android'? 'http://192.168.1.47:3000/api/v1' : 'http://localhost:3000/api/v1' 
export const SOCKET_URL=Platform.OS==='android'? 'http://192.168.1.4:3000/api/v1' : 'http://localhost:3000'


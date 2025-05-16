import { Platform } from "react-native"

export const BASE_URL=Platform.OS==='android'? 'http://192.168.1.4:3000/api' : 'http://localhost:3000/api' 
export const SOCKET_URL=Platform.OS==='android'? 'http://192.168.1.4:3000/api' : 'http://localhost:3000'


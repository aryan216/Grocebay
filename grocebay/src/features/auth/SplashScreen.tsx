import { View, Text, StyleSheet,Image, Alert } from 'react-native'
import React,{FC, useEffect} from 'react'
import { Colors } from '@utils/Constants'

import Logo from '@assets/images/logo.jpeg'
import { screenHeight, screenWidth } from '@utils/Scaling'
import { resetAndNavigate } from '@utils/NavigationUtils'
import GeoLocation from '@react-native-community/geolocation'
import { useAuthStore } from '@state/authStorage'
import { tokenStorage } from '@state/storage'
import {jwtDecode} from 'jwt-decode'
import { refetch_user, refresh_tokens } from '@service/authService'
GeoLocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'always',
  enableBackgroundLocationUpdates: true,
  locationProvider: 'auto'
})

interface DecodedToken{
    exp: number;
}

const SplashScreen:FC = () => {
    const {user,setUser}=useAuthStore();

    const tokenCheck = async () => {
  const accessToken = tokenStorage.getString("accessToken") as string;
  const refreshToken = tokenStorage.getString("refreshToken") as string;

  if (!accessToken || !refreshToken) {
    resetAndNavigate('CustomerLogin');
    return;
  }

  const currentTime = Date.now() / 1000;
  const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
  const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken);

  if (decodedRefreshToken?.exp < currentTime) {
    resetAndNavigate('CustomerLogin');
    Alert.alert("Session Expired, Please Login Again");
    return;
  }

  if (decodedAccessToken?.exp < currentTime) {
    try {
      await refresh_tokens();
      await refetch_user(setUser);
    } catch (error) {
      console.log("refetch user error", error);
      Alert.alert("There was an error refreshing token");
      resetAndNavigate("CustomerLogin");
      return;
    }
  } else {
    // If access token is still valid, ensure user is set
    if (!user) {
      await refetch_user(setUser);
    }
  }

  console.log("User after token check", user);

  // Now route based on role
  if (user?.role === "Customer") {
    resetAndNavigate('ProductDashboard');
  } else if (user?.role === "Delivery") {
    resetAndNavigate('DeliveryDashboard');
  } else {
    resetAndNavigate('CustomerLogin');
  }
};


    useEffect(() => { 
        const navigateUser = async () => {
          try {
            GeoLocation.requestAuthorization();
            console.log("going to check for token")
            tokenCheck();
          } catch (error) {
            Alert.alert('Sorrry we need your location for better shopping experience ')
          }
        }
    
        const timeoutId = setTimeout(navigateUser, 1000)
    
        // Cleanup timeout on component unmount
        return () => clearTimeout(timeoutId)
      }, [])

  return (
    <View style={styles.container}>
      <Image style={styles.logoImage} source={Logo} />
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        backgroundColor:Colors.primary,
        flex:1,
        justifyContent:'center',
        alignItems:'center' 
    },
    logoImage:{
        width:screenWidth*0.2,
        height:screenWidth*0.2,
        resizeMode:'contain'
    }
})

export default SplashScreen
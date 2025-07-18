import { View, Text, StyleSheet, Platform } from 'react-native'
import React, { useEffect } from 'react'
import { NoticeHeight, screenHeight } from '@utils/Scaling'
import {CollapsibleContainer,CollapsibleScrollView,useCollapsibleContext,CollapsibleHeaderContainer,withCollapsibleContext} from '@r0b0t3d/react-native-collapsible';
import Geolocation from '@react-native-community/geolocation';
import { reverseGeocode } from '@service/mapService';
import { useAuthStore } from '@state/authStorage';


const Notice= -(NoticeHeight+12)

const ProductDashboard = () => {
  const {user,setUser}=useAuthStore();
  useEffect(() => {
    const updateUser = () => {
      Geolocation.getCurrentPosition((position) => {
        const {latitude,longitude} = position.coords
        reverseGeocode(latitude,longitude,setUser)
      },
      err=>console.log(err),
      {
        enableHighAccuracy: true,
        timeout: 15000,
      
      }
      )
    }
    updateUser()          
    
  },[])


  return (
    <View>
      <Text>ProductDashboard</Text>
    </View>
  )
}

const styles= StyleSheet.create({
  panelContainer:{
    flex:1
  },
  transparent:{
    backgroundColor:'transparent'
  },
  backToTop:{
    position:"absolute",
    alignSelf:"center",
    top:Platform.OS === 'ios' ? screenHeight * 0.18 : 100,
    flexDirection:"row",
    alignItems:"center",
    gap:4,
    backgroundColor:'black',
    borderRadius:20,
    paddingHorizontal:10,
    paddingVertical:5,
    zIndex:999
  }
})

export default ProductDashboard
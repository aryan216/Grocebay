import { View, Text, StyleSheet,Image } from 'react-native'
import React,{FC, useEffect} from 'react'
import { Colors } from '@utils/Constants'

import Logo from '@assets/images/logo.jpeg'
import { screenHeight, screenWidth } from '@utils/Scaling'
import { navigate } from '@utils/NavigationUtils'
const SplashScreen:FC = () => {
    useEffect(() => {
        const navigateUser = async () => {
          try {
            navigate('CustomerLogin')
          } catch (error) {
            console.error('Navigation Error:', error)
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
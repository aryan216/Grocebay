import { View, Text, Alert, StyleSheet, ScrollView } from 'react-native'
import React, { FC, useState } from 'react'
import { resetAndNavigate } from '@utils/NavigationUtils';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import { deliveryLogin } from '@service/authService';
import LottieView from 'lottie-react-native';
import CustomText from '@components/ui/CustomText';
import { Fonts } from '@utils/Constants';
const DeliveryLogin:FC= () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [loading,setLoading]=useState(false);

  const handleLogin=async()=>{
    setLoading(true);
    try {
      await deliveryLogin(email,password);
      resetAndNavigate("DeliveryDashboard");
      
    } catch (error) {
      Alert.alert("Login Failed")
    }finally{
      setLoading(false)
    }
  }


  return (
    <CustomSafeAreaView>
      {/* <Text>DeliveryLogin</Text> */
      }
      <ScrollView keyboardShouldPersistTaps="handled" keyboardDismissMode='on-drag'>
        <View style={styles.container}>
          <View style={styles.lottieContainer}>
            <LottieView source={require("@assets/animations/delivery_man.json")} autoPlay loop style={styles.lottie} hardwareAccelerationAndroid/>
            </View>

            <CustomText variant='h3' fontFamily={Fonts.Bold}>
              Delivery Partner Portal
            </CustomText>

            {/* <CustomInput
            onChangeText={setEmail}
            value={email}
            left={<Icon/>}
            /> */}

        </View>


      </ScrollView>
    </CustomSafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20,
    alignItems:'center',

  },
  lottie:{
    width:"100%",
    height:"100%"
  },
  lottieContainer:{
    width:"100%",
    height:"100%"
  }
})

export default DeliveryLogin
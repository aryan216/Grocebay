import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import CustomSafeAreaView from '@components/global/CustomSafeAreaView'
import ProductSlider from '@components/login/ProductSlider'
const CustomerLogin = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <CustomSafeAreaView>
        <ProductSlider/>
      </CustomSafeAreaView>
    </GestureHandlerRootView>
  )
}

export default CustomerLogin

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})
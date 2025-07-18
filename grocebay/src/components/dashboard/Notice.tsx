import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import { NoticeHeight } from '@utils/Scaling'
import CustomText from '@components/ui/CustomText'
import { Fonts } from '@utils/Constants'
import Svg, { Defs, Path } from 'react-native-svg'
const Notice = () => {
  return (
    <View style={{height:NoticeHeight}}>
      <View style={styles.container}>
        <View style={styles.noticeContainer}>
            <SafeAreaView style={{padding:10}}>
                <CustomText
                style={styles.heading}
                variant='h8'
                fontFamily={Fonts.SemiBold} 
                >
                    It's raining near this location
                </CustomText>
                <CustomText style={styles.textCenter} variant='h9' >Our delivery partners may take long time to reach you</CustomText>
            </SafeAreaView>
        </View>    
      </View>
      <Svg
      width={"100%"}
      height='35'
      fill='#CCD5E4'
      viewBox='0 0 4000 1000'
      preserveAspectRatio='none'
      style={styles.wave}
      >
        <Defs>
            <Path/>
        </Defs>
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#ccd5e4',

    },
    noticeContainer:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#ccd5e4'
    },
    textCenter:{
        textAlign:'center'
    },
    heading:{
        color:'#2d3875',
        marginBottom:8,

    },
    wave:{
        width:"100%",
        transform:[{rotateX:'180deg'}]
    }
})

export default Notice
import { View, Text, StyleSheet, Animated } from 'react-native'
import React, { FC } from 'react'
import { NoticeHeight } from '@utils/Scaling';
import Notice from '@components/dashboard/Notice';

const Notice_Height= -(NoticeHeight + 12)
const NoticeAnimation : FC<{noticePosition:any;children:React.ReactElement}>= ({noticePosition,children}) => {
  return (
    <View style={styles.Container}>
      <Animated.View style={[styles.noticeContainer,{transform:[{translateY:noticePosition}]}]}>
        <Notice/>
      </Animated.View>
      <Animated.View style={[styles.contentContainer,{paddingTop:noticePosition.interpolate({
        inputRange:[Notice_Height,0],
        outputRange:[0,Notice_Height+20]
      })}]}>
        {children}
      </Animated.View>

    </View>
  )
}

const styles = StyleSheet.create({
    noticeContainer:{
        width:"100%",
        zIndex:999,
        position:"absolute",
    },
    contentContainer:{
        flex:1,
        width:'100%'
    },
    Container:{
        flex:1,
        backgroundColor:'#fff'
    }

})

export default NoticeAnimation
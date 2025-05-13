import {FC,ReactNode} from "react"
import { SafeAreaView, StyleSheet,Text,View,ViewStyle } from "react-native"

interface CustomSafeAreaViewProps{
    children:ReactNode,
    style?:ViewStyle
}

const CustomSafeAreaView:FC<CustomSafeAreaViewProps> = ({children,style}) => {
    return (
        <View style={styles.container}>
            <SafeAreaView style={style}>{children}</SafeAreaView>
        </View>
    )
}

export default CustomSafeAreaView

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    }
})

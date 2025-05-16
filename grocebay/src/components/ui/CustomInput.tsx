import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import React, {FC} from 'react';
import {Colors, Fonts} from '@utils/Constants';
import Icon from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';

interface InputProps {
  left: React.ReactNode;
  onClear?: () => void;
  right?: Boolean;
}

const CustomInput: FC<InputProps & React.ComponentProps<typeof TextInput>> = ({left, onClear, right, ...props}) => {
  return (
    <View style={styles.flexRow}>
      {left}
      <TextInput
        {...props}
        style={styles.inputContainer}
        placeholderTextColor="#ccc"
      />

      <View style={styles.icon}>
        {props?.value?.length !=0 && right && (
          <TouchableOpacity onPress={onClear}><Icon name="close-circle-sharp" size={RFValue(16)}/></TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
    icon:{
        width:"5%",
        justifyContent:'center',
        alignItems:'center',
        marginRight:10
    },
    inputContainer:{
      width:"70%",
      fontFamily:Fonts.SemiBold,
      fontSize:RFValue(12),
      paddingVertical:14,
      paddingBottom:16,
      height:"100%",
      color:Colors.text,
      bottom:-1


    },
    text:{
      width:"10%",
      marginLeft:10
    },
    flexRow:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        borderRadius:10,
        borderWidth:0.5,
        width:"100%",
        marginVertical:10,
        backgroundColor:'#fff',
        shadowOffset:{width:1,height:1},
        shadowOpacity:0.6,
        shadowRadius:2,
        shadowColor:Colors.border,
        borderColor:Colors.border

    }

});

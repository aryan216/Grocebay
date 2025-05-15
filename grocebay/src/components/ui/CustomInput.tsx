import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import React, {FC} from 'react';
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

    },
    text:{

    },
    flexRow:{
        
    }

});

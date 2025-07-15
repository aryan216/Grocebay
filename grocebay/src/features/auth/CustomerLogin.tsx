import { View, StyleSheet, Image, KeyboardAvoidingView, Platform, Keyboard, Alert, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import ProductSlider from '@components/login/ProductSlider';
import { Colors, Fonts, lightColors } from '@utils/Constants';
import CustomText from '@components/ui/CustomText';
import { RFValue } from 'react-native-responsive-fontsize';
import { resetAndNavigate } from '@utils/NavigationUtils';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import useKeyboardOffsetHeight from '@utils/useKeyboardOffsetHeight';
import LinearGradient from 'react-native-linear-gradient';
import CustomInput from '@components/ui/CustomInput';
import CustomButton from '@components/ui/CustomButton';
import { customerLogin } from '@service/authService';
import Icon from "react-native-vector-icons/MaterialIcons";

const bottomcolors = [...lightColors].reverse();

const CustomerLogin = () => {
  const [gestureSequence, setGestureSequence] = useState<String[]>([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading,setLoading] = useState(false);

  const keyboardOffset = useSharedValue(0);
  const keyboardOffsetHeight = useKeyboardOffsetHeight();

  useEffect(() => {
    keyboardOffset.value = withTiming(
      keyboardOffsetHeight === 0 ? 0 : -keyboardOffsetHeight * 0.88,
      { duration: 500 }
    );
  }, [keyboardOffsetHeight]);

  const animatedScrollStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: keyboardOffset.value }],
    };
  });

  const handleGesture = ({ nativeEvent }: any) => {
    if (nativeEvent.state === State.END) {
      const { translationX, translationY } = nativeEvent;
      let direction = '';
      if (Math.abs(translationX) > Math.abs(translationY)) {
        direction = translationX > 0 ? 'right' : 'left';
      } else {
        direction = translationY > 0 ? 'down' : 'up';
      }

      const newSequence = [...gestureSequence, direction].slice(-5);
      setGestureSequence(newSequence);
      if (newSequence.join(' ') === 'right left up right left') {
        setGestureSequence([]);
        resetAndNavigate('DeliveryLogin');
      }
    }
  };

  const handleAuth = async() => {
    Keyboard.dismiss()
    setLoading(true);
    try {
      await customerLogin(phoneNumber)
      resetAndNavigate('ProductDashboard')
      
    } catch (error) {
      Alert.alert("Login Failed")
    }finally{
      setLoading(false)
    }

  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <CustomSafeAreaView>
        <ProductSlider />
        <PanGestureHandler onHandlerStateChange={handleGesture}>
          <Animated.View style={[styles.flexGrow, animatedScrollStyle]}>
            <Animated.ScrollView
              bounces={false}
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.subContainer}
              showsVerticalScrollIndicator={false}
            >
              <LinearGradient colors={bottomcolors} style={styles.gradient} />
              <View style={styles.content}>
                <Image
                  style={styles.logo}
                  source={require('@assets/images/logo.jpeg')}
                />
                <CustomText variant='h2' fontFamily={Fonts.Bold}>
                  Grocery Delivery App
                </CustomText>
                <CustomText variant='h5' fontFamily={Fonts.Bold} style={styles.subText}>
                  Login or SignUp
                </CustomText>

                <CustomInput
                  onChangeText={(text) => setPhoneNumber(text.slice(0, 10))}
                  onClear={() => setPhoneNumber('')}
                  value={phoneNumber}
                  placeholder='Enter Phone Number'
                  inputMode='numeric'
                  left={
                    <CustomText
                      style={styles.phoneText}
                      variant='h6'
                      fontFamily={Fonts.SemiBold}
                    >
                      +91
                    </CustomText>
                  }
                />
                <CustomButton 
                disabled={phoneNumber?.length!==10}
                onPress={()=>handleAuth()}
                loading={loading}
                title='Continue' 
                />
              </View>
            </Animated.ScrollView>
          </Animated.View>
        </PanGestureHandler>
      </CustomSafeAreaView>

      <View style={styles.footer}>
        <CustomText fontSize={RFValue(8)}>
          By continuing, you agree to our terms of service and privacy policy
        </CustomText>
      </View>

      <TouchableOpacity style={styles.deliveryButton} onPress={() => resetAndNavigate('DeliveryLogin')}>
        <Icon name='directions-bike' size={RFValue(14)} color="#000"/>
      </TouchableOpacity>
    </GestureHandlerRootView> 
  );
};

export default CustomerLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexGrow: {
    flex: 1,
  },
  subContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexGrow: 1,
    paddingBottom: 80, 
  },
  gradient: {
    paddingTop: 60,
    width: '100%',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  logo: {
    height: 50,
    width: 50,
    borderRadius: 20,
    marginVertical: 10,
  },
  subText: {
    marginTop: 2,
    marginBottom: 35,
    opacity: 0.8,
  },
  phoneText: {
    marginRight: 5,
  },
  footer: {
    borderTopWidth: 0.8,
    borderColor: Colors.border,
    paddingVertical: 8,
    zIndex: 22,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c1c2c3',
    width: '100%',
  },
  deliveryButton: {
    position: 'absolute',
    top:Platform.OS === 'ios' ? 40:20,
    right:20,
    shadowOffset:{width:1,height:1},
    shadowColor:'#000',
    shadowOpacity:0.5,
    shadowRadius:12,
    elevation:10,
    zIndex: 99,
    bottom: 20,
    padding:10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    
  },
});

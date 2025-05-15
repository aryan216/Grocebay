import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import ProductSlider from '@components/login/ProductSlider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Fonts, lightColors } from '@utils/Constants';
import CustomText from '@components/ui/CustomText';
import { RFValue } from 'react-native-responsive-fontsize';
import { resetAndNavigate } from '@utils/NavigationUtils';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import useKeyboardOffsetHeight from '@utils/useKeyboardOffsetHeight';
import LinearGradient from 'react-native-linear-gradient';

const bottomcolors = [...lightColors].reverse();

const CustomerLogin = () => {
  const [gestureSequence, setGestureSequence] = useState<String[]>([]);

  const keyboardOffset = useSharedValue(0);
  const keyboardOffsetHeight = useKeyboardOffsetHeight();

  useEffect(() => {
    keyboardOffset.value = withTiming(
      keyboardOffsetHeight === 0 ? 0 : -keyboardOffsetHeight * 0.84,
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

  return (
    <GestureHandlerRootView style={styles.container}>
      <CustomSafeAreaView>
        <ProductSlider />

        <PanGestureHandler onHandlerStateChange={handleGesture}>
          <Animated.ScrollView
            bounces={false}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.subContainer}
            style={animatedScrollStyle}
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
              <CustomText variant='h5' fontFamily={Fonts.Bold} style={styles.text}>
                Login or SignUp
              </CustomText>
            </View>
          </Animated.ScrollView>
        </PanGestureHandler>
      </CustomSafeAreaView>

      <View style={styles.footer}>
        <SafeAreaView>
          <CustomText fontSize={RFValue(6)}>
            By continuing, you agree to our terms of service and privacy policy
          </CustomText>
        </SafeAreaView>
      </View>
    </GestureHandlerRootView>
  );
};

export default CustomerLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    borderTopWidth: 0.8,
    borderColor: Colors.border,
    paddingBottom: 10,
    zIndex: 22,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c1c2c3',
    width: '100%',
  },
  subContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
    marginBottom: 20,
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
  text:{
    marginTop:2,
    marginBottom:35,
    opacity:0.8
  }
});

import { useEffect, useState } from "react";
import { Keyboard, Platform } from "react-native";

export default function useKeyboardOffsetHeight() {
  const [keyboardOffsetHeight, setKeyboardOffsetHeight] = useState(0);

  useEffect(() => {
    const showListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      e => {
        setKeyboardOffsetHeight(e.endCoordinates.height);
      }
    );

    const hideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardOffsetHeight(0);
      }
    );

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  return keyboardOffsetHeight;
}

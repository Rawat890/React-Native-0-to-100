import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  Pressable,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from "react-native";
import { scale } from "react-native-size-matters";
import { COLORS } from "../utils/colors";
import EyeOpen from "../assets/icons/eyeOpen.svg";
import EyeClose from "../assets/icons/eyeClosed.svg";
import { FONT_SIZE, FONT_WEIGHT } from "../utils/others";

export interface InputWithIconProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  secureToggle?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
}

export default function InputWithIcon({
  label,
  error,
  leftIcon,
  rightIcon,
  secureToggle = false,
  containerStyle,
  inputStyle,
  secureTextEntry,
  ...props
}: InputWithIconProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(secureTextEntry ?? false);

  const animatedBorder = useRef(new Animated.Value(0)).current;

  const animateBorder = (toValue: number) => {
    Animated.timing(animatedBorder, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const borderColor = animatedBorder.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.lightGray, COLORS.purple],
  });

  const handleFocus = () => {
    setIsFocused(true);
    animateBorder(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    animateBorder(0);
  };

  return (
    <View style={containerStyle}>
      {label && <Text style={styles.label}>{label}</Text>}

      <Animated.View style={[styles.inputWrapper, { borderColor }]}>
        {/* LEFT ICON */}
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

        {/* TEXT INPUT */}
        <TextInput
          {...props}
          style={[styles.input, inputStyle]}
          placeholderTextColor={COLORS.gray}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={hidePassword}
        />

        {/* SECURE TOGGLE BUTTON */}
        {secureToggle && (
          <Pressable
            onPress={() => setHidePassword(!hidePassword)}
            hitSlop={10}
            style={styles.rightIcon}
          >
            {hidePassword ? (
              <EyeClose width={22} height={22} />
            ) : (
              <EyeOpen width={22} height={22} />
            )}
          </Pressable>
        )}

        {/* RIGHT ICON */}
        {!secureToggle && rightIcon && (
          <View style={styles.rightIcon}>{rightIcon}</View>
        )}
      </Animated.View>

      {/* ERROR TEXT */}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.normal,
    marginBottom: scale(8),
    color: COLORS.black,
    marginTop:scale(10)
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: scale(1.3),
    borderRadius: scale(10),
    paddingHorizontal: scale(12),
    backgroundColor: COLORS.white,
    minHeight: scale(48),
  },
  leftIcon: {
    marginRight: scale(10),
  },
  input: {
    flex: 1,
    fontSize: scale(15),
    color: COLORS.black,
  },
  rightIcon: {
    marginLeft: scale(10),
  },
  error: {
    marginTop: scale(5),
    color: COLORS.red,
    fontSize: scale(12),
  },
});

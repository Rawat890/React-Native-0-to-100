import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { scale } from "react-native-size-matters";
import { COLORS } from "../utils/colors";

export interface HeaderProps {
  title?: string;
  subtitle?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode | React.ReactNode[];
  onLeftPress?: () => void;
  onRightPress?: (index: number) => void;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
}

export default function Header({
  title,
  subtitle,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  containerStyle,
  titleStyle,
}: HeaderProps) {
  const rightIconsArray = Array.isArray(rightIcon)
    ? rightIcon
    : rightIcon
    ? [rightIcon]
    : [];

  return (
    <View style={[styles.container, containerStyle]}>
      {/* LEFT ICON */}
      <Pressable
        onPress={onLeftPress}
        style={styles.leftIconWrapper}
        hitSlop={10}
      >
        {leftIcon}
      </Pressable>

      {/* TITLE */}
      <View style={styles.titleWrapper}>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>

      {/* RIGHT ICONS */}
      <View style={styles.rightWrapper}>
        {rightIconsArray.map((icon, index) => (
          <Pressable
            key={index}
            onPress={() => onRightPress?.(index)}
            hitSlop={10}
            style={styles.rightIconSpacing}
          >
            {icon}
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: scale(60),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(15),
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
  },
  leftIconWrapper: {
    width: scale(30),
    justifyContent: "center",
    alignItems: "center",
  },
  titleWrapper: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: scale(18),
    fontWeight: "700",
    color: COLORS.black,
  },
  subtitle: {
    fontSize: scale(12),
    color: COLORS.gray,
  },
  rightWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightIconSpacing: {
    marginLeft: scale(15),
  },
});

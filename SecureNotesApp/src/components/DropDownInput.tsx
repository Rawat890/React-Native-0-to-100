import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  Animated,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import { scale } from "react-native-size-matters";

import ChevronDown from "../assets/icons/chevronDown.svg";
import ChevronUp from "../assets/icons/chevronUp.svg";
import { COLORS } from "../utils/colors";

interface DropdownInputProps {
  label?: string;
  placeholder?: string;
  data: string[];                   
  value?: string;
  onSelect: (item: string) => void;
  error?: string;
  disabled?: boolean;
  containerStyle?: any;
}

export default function DropdownInput({
  label,
  placeholder = "Select option",
  data,
  value,
  onSelect,
  error,
  disabled = false,
  containerStyle,
}: DropdownInputProps) {
  const [visible, setVisible] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  const toggleDropdown = () => {
    if (disabled) return;
    setVisible(!visible);

    Animated.timing(animatedHeight, {
      toValue: visible ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const dropdownHeight = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, scale(180)],
  });

  const handleSelect = (item: string) => {
    onSelect(item);
    toggleDropdown();
  };

  return (
    <View style={containerStyle}>
      {label && <Text style={styles.label}>{label}</Text>}

      {/* Input Pressable */}
      <Pressable
        onPress={toggleDropdown}
        style={[
          styles.inputWrapper,
          error && { borderColor: COLORS.red },
          disabled && { opacity: 0.6 },
        ]}
      >
        <Text
          style={[
            styles.inputText,
            { color: value ? COLORS.black : COLORS.gray },
          ]}
        >
          {value || placeholder}
        </Text>

        {visible ? (
          <ChevronUp width={20} height={20} />
        ) : (
          <ChevronDown width={20} height={20} />
        )}
      </Pressable>

      {/* Dropdown Modal */}
      <Modal transparent visible={visible} animationType="fade">
        <TouchableWithoutFeedback onPress={toggleDropdown}>
          <View style={styles.modalOverlay}>
            <Animated.View style={[styles.dropdownContainer, { height: dropdownHeight }]}>
              <FlatList
                data={data}
                keyExtractor={(item, idx) => idx.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Pressable
                    style={styles.dropdownItem}
                    onPress={() => handleSelect(item)}
                  >
                    <Text style={styles.dropdownText}>{item}</Text>
                  </Pressable>
                )}
              />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Error */}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: scale(14),
    marginBottom: scale(6),
    fontWeight: "600",
    color: COLORS.black,
  },
  inputWrapper: {
    borderWidth: scale(1.2),
    borderColor: COLORS.gray,
    borderRadius: scale(8),
    paddingHorizontal: scale(12),
    height: scale(48),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
  },
  inputText: {
    fontSize: scale(15),
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: scale(20),
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  dropdownContainer: {
    backgroundColor: COLORS.white,
    borderRadius: scale(10),
    overflow: "hidden",
  },
  dropdownItem: {
    paddingVertical: scale(12),
    paddingHorizontal: scale(15),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  dropdownText: {
    fontSize: scale(15),
    color: COLORS.black,
  },
  error: {
    marginTop: scale(5),
    color: COLORS.red,
    fontSize: scale(12),
  },
});

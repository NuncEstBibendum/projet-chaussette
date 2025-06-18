import colors from "app/constants/colors";
import React from "react";
import { TextInput as RNTextInput, StyleSheet, TextInputProps, View } from "react-native";

interface CustomTextInputProps extends TextInputProps {
  error?: boolean;
  containerStyle?: object;
  leftIcon?: React.ReactNode;
}

const TextInput: React.FC<CustomTextInputProps> = ({
  error,
  containerStyle,
  style,
  leftIcon,
  ...props
}) => {
  return (
    <View style={containerStyle}>
      {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
      <RNTextInput
        style={[styles.input, error && styles.errorInput, style]}
        placeholderTextColor={colors.darkBlue}
        {...props}
      />
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  leftIcon: {
    position: "absolute",
    left: 16,
    top: 0,
    bottom: 0,
  },
  input: {
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: colors.darkBlue,
    fontSize: 16,
    color: colors.black,
  },
  errorInput: {
    borderColor: colors.blue,
    color: colors.blue,
  },
});

import colors from "app/constants/colors";
import React from "react";
import { TextInput as RNTextInput, StyleSheet, TextInputProps, View } from "react-native";

interface CustomTextInputProps extends TextInputProps {
  error?: boolean;
  containerStyle?: object;
}

const TextInput: React.FC<CustomTextInputProps> = ({ error, containerStyle, style, ...props }) => {
  return (
    <View style={containerStyle}>
      <RNTextInput
        style={[styles.input, error && styles.errorInput, style]}
        placeholderTextColor={colors.purple}
        {...props}
      />
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  input: {
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: colors.purple,
    fontSize: 16,
    color: colors.black,
  },
  errorInput: {
    borderColor: colors.pink,
    color: colors.pink,
  },
});

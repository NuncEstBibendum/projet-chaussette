import colors from "app/constants/colors";
import React from "react";
import { TextInput as RNTextInput, StyleSheet, TextInputProps, View } from "react-native";

interface CustomTextInputProps extends TextInputProps {
  error?: boolean;
  containerStyle?: object;
}

export const TextInput: React.FC<CustomTextInputProps> = ({
  error,
  containerStyle,
  style,
  ...props
}) => {
  return (
    <View style={containerStyle}>
      <RNTextInput
        style={[styles.input, error && styles.errorInput, style]}
        placeholderTextColor={colors.brown[200]}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colors.beige[100],
    borderWidth: 1,
    borderColor: colors.beige[200],
    fontSize: 16,
    color: colors.dark[400],
  },
  errorInput: {
    borderColor: "#ff0000",
    color: colors.red[400],
  },
});

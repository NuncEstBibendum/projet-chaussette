import colors from "app/constants/colors";
import { Text as RNText, StyleSheet, TextStyle } from "react-native";

interface Props {
  children: React.ReactNode;
  color?: string;
  style?: TextStyle;
  size?: "small" | "medium" | "large";
}

const Text = ({ children, color, style, size = "small" }: Props) => {
  return (
    <RNText
      style={[
        styles.text,
        style,
        { color, fontSize: size === "small" ? 14 : size === "medium" ? 24 : 32 },
      ]}
    >
      {children}
    </RNText>
  );
};

export default Text;

const styles = StyleSheet.create({
  text: {
    fontFamily: "Helvetica",
    fontSize: 16,
    color: colors.black,
  },
});

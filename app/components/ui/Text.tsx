import colors from "app/constants/colors";
import { Text as RNText, StyleSheet, TextStyle } from "react-native";

interface Props {
  children: React.ReactNode;
  color?: string;
  style?: TextStyle;
}

const Text = ({ children, color, style }: Props) => {
  return <RNText style={[styles.text, style, { color }]}>{children}</RNText>;
};

export default Text;

const styles = StyleSheet.create({
  text: {
    fontFamily: "Helvetica",
    fontSize: 16,
    color: colors.dark[400],
  },
});

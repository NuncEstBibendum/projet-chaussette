import Text from "app/components/ui/Text";
import colors from "app/constants/colors";
import { Pressable, StyleSheet, View } from "react-native";

interface Props {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = ({
  label,
  onPress,
  variant = "primary",
  disabled = false,
  leftIcon,
  rightIcon,
}: Props) => {
  return (
    <Pressable
      onPress={() => !disabled && onPress()}
      style={[styles.button, styles[variant], disabled && styles.disabled]}
      disabled={disabled}
    >
      <View style={styles.buttonContent}>
        {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
        <Text color={disabled ? colors.darkBlue : colors.white}>{label}</Text>
        {rightIcon && <View style={styles.icon}>{rightIcon}</View>}
      </View>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  primary: {
    backgroundColor: colors.darkBlue,
  },
  secondary: {
    backgroundColor: colors.blue,
  },
  disabled: {
    backgroundColor: colors.blue,
    opacity: 0.5,
  },
  icon: {
    marginRight: 8,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

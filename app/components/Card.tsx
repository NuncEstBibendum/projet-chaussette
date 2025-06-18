import { View, StyleProp, ViewStyle } from "react-native";

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
}

const Card = ({ children, style, backgroundColor }: Props) => {
  return (
    <View
      style={[
        {
          padding: 16,
          gap: 16,
          borderRadius: 16,
          backgroundColor,
          flex: 1,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default Card;

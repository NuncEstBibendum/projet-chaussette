import colors from "app/constants/colors";
import { ImageBackground, StyleSheet } from "react-native";

interface Props {
  children: React.ReactNode;
  backgroundImage?: string;
}

const CategoryCard = ({ children, backgroundImage }: Props) => {
  return (
    <ImageBackground
      style={[styles.card]}
      source={backgroundImage ? backgroundImage : require("../../../assets/images/logo.png")}
    >
      {children}
    </ImageBackground>
  );
};
export default CategoryCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.beige[200],
    paddingVertical: 64,
    paddingLeft: 16,
    marginBottom: 16,
    borderRadius: 8,
    overflow: "hidden",
  },
});

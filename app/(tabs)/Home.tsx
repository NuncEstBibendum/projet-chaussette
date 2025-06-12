import CategoryCard from "app/components/ui/CategoryCard";
import SafeAreaScrollView from "app/components/ui/SafeAreaScrollView";
import Text from "app/components/ui/Text";
import colors from "app/constants/colors";

export default function Home() {
  return (
    <SafeAreaScrollView title="Choose a game mode">
      <CategoryCard backgroundImage={require("../../assets/images/categories/classic.png")}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textTransform: "uppercase",
            fontFamily: "Beleren",
          }}
          color={colors.beige[200]}
        >
          Classic
        </Text>
      </CategoryCard>
      <CategoryCard backgroundImage={require("../../assets/images/categories/illustration.png")}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textTransform: "uppercase",
            fontFamily: "Beleren",
          }}
          color={colors.beige[200]}
        >
          Illustration
        </Text>
      </CategoryCard>
      <CategoryCard backgroundImage={require("../../assets/images/categories/flavor.png")}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textTransform: "uppercase",
            fontFamily: "Beleren",
          }}
          color={colors.beige[200]}
        >
          Flavor text
        </Text>
      </CategoryCard>
      <CategoryCard backgroundImage={require("../../assets/images/categories/artist.png")}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textTransform: "uppercase",
            fontFamily: "Beleren",
          }}
          color={colors.beige[200]}
        >
          Find the artist
        </Text>
      </CategoryCard>
      <CategoryCard backgroundImage={require("../../assets/images/categories/survival.png")}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textTransform: "uppercase",
            fontFamily: "Beleren",
          }}
          color={colors.beige[200]}
        >
          Survival mode
        </Text>
      </CategoryCard>
    </SafeAreaScrollView>
  );
}

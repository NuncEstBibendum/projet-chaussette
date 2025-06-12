import colors from "app/constants/colors";
import { useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import CardType from "../types/CardType";
import ManaSymbols from "./ManaSymbols";

interface Props {
  card: CardType | null;
  guessStep: number;
  style?: any;
}

const mapColorsToCardImage = {
  W: require("../../assets/images/cards/white.png"),
  U: require("../../assets/images/cards/blue.png"),
  B: require("../../assets/images/cards/black.png"),
  R: require("../../assets/images/cards/red.png"),
  G: require("../../assets/images/cards/green.png"),
  gold: require("../../assets/images/cards/gold.png"),
  land: require("../../assets/images/cards/land.png"),
  artifact: require("../../assets/images/cards/colorless.png"),
};

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case "common":
      return "#000000";
    case "uncommon":
      return "#B2B5BB";
    case "rare":
      return "#E2B53C";
    case "mythic":
      return "#E85B0E";
    default:
      return "#000000";
  }
};

const hideCardNameInText = (text: string, cardName: string) => {
  if (!text || !cardName) return text;
  const underscores = "_".repeat(cardName.length);
  return text.replace(new RegExp(cardName, "gi"), underscores);
};

const renderOracleText = (text: string) => {
  if (!text) return null;

  // Split text by mana/symbol patterns {X} and parentheses
  const parts = text.split(/(\{[^}]+\}|\([^)]+\))/g);

  const fontSize = text.length > 250 ? 12 : 14;

  return (
    <Text style={[styles.cardText, { fontSize }]}>
      {parts.map((part, index) => {
        if (part.match(/^\{[^}]+\}$/)) {
          // Handle standalone mana symbols
          const symbol = part.slice(1, -1);
          return (
            <Text key={index} style={[styles.symbolText, { fontSize }]}>
              {symbol}
            </Text>
          );
        }
        if (part.match(/^\([^)]+\)$/)) {
          // Handle parenthetical text that might contain mana symbols
          const innerText = part.slice(1, -1); // Remove parentheses
          const innerParts = innerText.split(/(\{[^}]+\})/g);

          return (
            <Text key={index} style={{ fontFamily: "PlantinItalic" }}>
              (
              {innerParts.map((innerPart, innerIndex) => {
                if (innerPart.match(/^\{[^}]+\}$/)) {
                  const symbol = innerPart.slice(1, -1);
                  return (
                    <Text key={`${index}-${innerIndex}`} style={[styles.symbolText, { fontSize }]}>
                      {symbol}
                    </Text>
                  );
                }
                return innerPart;
              })}
              )
            </Text>
          );
        }
        return <Text key={index}>{part}</Text>;
      })}
    </Text>
  );
};

const MtgCard = ({ card, guessStep, style }: Props) => {
  const [imageLoading, setImageLoading] = useState(false);

  if (!card) return null;

  return (
    <View style={[styles.cardContainer, style]}>
      <Image
        source={{ uri: card.image_uris.art_crop }}
        style={styles.croppedImage}
        blurRadius={100}
        onLoadStart={() => setImageLoading(true)}
        onLoadEnd={() => setImageLoading(false)}
      />
      {imageLoading && (
        <ActivityIndicator size="large" style={[styles.croppedImage, styles.loader]} />
      )}
      <Image
        source={
          mapColorsToCardImage[
            card.type_line.includes("Land")
              ? "land"
              : card.type_line.includes("Artifact")
                ? "artifact"
                : card.colors.length > 1
                  ? "gold"
                  : (card.colors[0] as keyof typeof mapColorsToCardImage)
          ]
        }
        style={styles.cardBackground}
        resizeMode="contain"
      />
      <View style={styles.contentOverlay}>
        <View style={styles.titleRow}>
          <View style={styles.manaCostContainer}>
            <ManaSymbols manaCost={card.mana_cost} />
          </View>
        </View>
        <Text
          style={[
            styles.typeLine,
            { fontSize: card.type_line.length > 30 ? 12 : card.type_line.length > 20 ? 14 : 16 },
          ]}
        >
          {card.type_line}
        </Text>

        {guessStep >= 2 && (
          <>
            <View style={[styles.rarityCircle, { backgroundColor: getRarityColor(card.rarity) }]} />

            {Boolean(card.power && card.toughness) && (
              <Text style={styles.powerToughness}>
                {card.power}/{card.toughness}
              </Text>
            )}
            {Boolean(card.set && card.artist) && (
              <Text
                style={[
                  styles.cardArtistAndSet,
                  { fontSize: `${card.set} • ${card.artist}`.length > 20 ? 10 : 12 },
                ]}
              >
                {card.set.toUpperCase()} • {card.artist}
              </Text>
            )}
          </>
        )}

        {guessStep >= 3 && (
          <View style={styles.textContainer}>
            {renderOracleText(hideCardNameInText(card.oracle_text, card.name))}
            {Boolean(card.flavor_text) && (
              <>
                <View style={styles.separator} />
                <Text style={styles.flavorText}>{card.flavor_text}</Text>
              </>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    height: "100%",
  },
  cardBackground: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  contentOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    padding: 15,
  },
  headerContainer: {
    marginBottom: 10,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  cardCmc: {
    fontSize: 14,
    color: "#000",
    position: "absolute",
    top: 12,
    right: 10,
    fontFamily: "Beleren",
  },
  manaCostContainer: {
    position: "absolute",
    top: 12,
    right: 10,
  },
  typeLine: {
    color: "#000",
    marginBottom: 5,
    position: "absolute",
    top: 266,
    left: 26,
    fontFamily: "Beleren",
  },
  textBox: {
    marginVertical: 5,
    padding: 5,
  },
  textContainer: {
    width: "90%",
    position: "absolute",
    top: 300,
    left: 30,
  },
  separator: {
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "90%",
    marginVertical: 8,
    alignSelf: "center",
  },
  cardText: {
    fontSize: 14,
    color: "#000",
    marginBottom: 3,
    fontFamily: "Plantin",
  },
  flavorText: {
    fontSize: 12,
    color: "#000",
    fontFamily: "Times New Roman",
    fontStyle: "italic",
  },
  cardRarity: {
    fontSize: 14,
    color: "#000",
    marginBottom: 3,
    position: "absolute",
    top: 266,
    right: 26,
    fontFamily: "Beleren",
  },
  powerToughness: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Beleren",
    color: "#000",
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 25,
    right: 15,
    backgroundColor: "white",
    paddingHorizontal: 15,
    borderRadius: 20,
    borderColor: "#000",
    borderWidth: 2,
  },
  cardArtistAndSet: {
    fontSize: 12,
    color: "#FFF",
    fontFamily: "Plantin",
    position: "absolute",
    bottom: 10,
    left: 30,
  },
  rarityCircle: {
    position: "absolute",
    top: 266,
    right: 30,
    width: 20,
    height: 20,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.black,
  },
  croppedImage: {
    aspectRatio: 1.4 / 1,
    position: "absolute",
    width: "88%",
    alignSelf: "center",
    top: 50,
  },
  symbolText: {
    fontFamily: "Symbols",
    fontSize: 14,
    color: "#000",
  },
  loader: {
    position: "absolute",
    backgroundColor: "#1e1e1e",
  },
});

export default MtgCard;

import FlipCard from "app/components/FlipCard";
import MtgCard from "app/components/MtgCard";
import Button from "app/components/ui/Button";
import SafeAreaScrollView from "app/components/ui/SafeAreaScrollView";
import { TextInput } from "app/components/ui/TextInput";
import colors from "app/constants/colors";
import { useCreateGameSession } from "app/hooks/useCreateGameSession";
import { useRandomCard } from "app/hooks/useRandomCard";
import calculateSimilarity from "app/utils/calculateSimilarity";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";

export default function Play() {
  const [guessStep, setGuessStep] = useState(1);
  const [guess, setGuess] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [cardNumber, setCardNumber] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const { data: randomCard, isLoading, refetch } = useRandomCard();
  const { mutate: createGameSession } = useCreateGameSession();

  const isFlipped = useSharedValue(false);
  const showLoading = isLoading || isRefetching;

  const flipCard = () => {
    isFlipped.value = !isFlipped.value;
  };

  const handleGuess = () => {
    if (!randomCard || isLoading) return;

    const similarity = calculateSimilarity(guess, randomCard.name);

    if (similarity >= 80 || guessStep >= 3) {
      setDisabled(true);
      flipCard();
      setTimeout(() => {
        setRevealed(true);
      }, 400);
    } else {
      setGuessStep(guessStep + 1);
    }
    setGuess("");
  };

  const fetchRandomCard = async () => {
    if (cardNumber >= 5) {
      console.log("Game over");
      setCardNumber(0);
      setShowScore(true);
      createGameSession();
      return;
    }
    setCardNumber(cardNumber + 1);
    setGuessStep(1);
    setGuess("");
    setRevealed(false);
    isFlipped.value = false;
    setDisabled(false);
    setIsRefetching(true);
    await refetch();
    setIsRefetching(false);
  };

  useEffect(() => {
    createGameSession();
    fetchRandomCard();
  }, []);

  return (
    <SafeAreaScrollView style={styles.container}>
      <Button
        onPress={() => {
          createGameSession();
          console.log("Game session created");
        }}
        label="Create Game Session"
      />
      {showScore && (
        <View>
          <Text style={styles.title}>Score: {cardNumber}</Text>
          <Button
            onPress={() => {
              setShowScore(false);
              setCardNumber(0);
              fetchRandomCard();
            }}
            label="Play again"
          />
        </View>
      )}
      {!showScore && (
        <>
          <Text style={styles.title}>Card {cardNumber}</Text>
          {showLoading ? (
            <View style={styles.loadingCard}>
              <Image
                source={require("../../assets/images/cards/back.png")}
                style={styles.cardImage}
              />
              <ActivityIndicator size="large" style={styles.loader} />
            </View>
          ) : (
            <FlipCard
              isFlipped={isFlipped}
              cardStyle={styles.flipCard}
              FlippedContent={
                <Image source={{ uri: randomCard?.image_uris?.normal }} style={styles.cardImage} />
              }
              RegularContent={<MtgCard card={randomCard ?? null} guessStep={guessStep} />}
            />
          )}

          <View style={styles.inputContainer}>
            {revealed ? (
              <Button
                onPress={fetchRandomCard}
                label={cardNumber >= 5 ? "Show score" : "Next Card"}
                disabled={showLoading}
              />
            ) : (
              <>
                <TextInput
                  value={guess}
                  onChangeText={setGuess}
                  style={styles.input}
                  placeholder="Guess the card name"
                />
                <Button
                  onPress={handleGuess}
                  label="Submit Guess"
                  disabled={!randomCard || isLoading || disabled}
                />
                <Text style={styles.stepIndicator}>Attempt {guessStep} of 3</Text>
              </>
            )}
          </View>
        </>
      )}
    </SafeAreaScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Beleren",
    fontSize: 32,
    color: colors.beige[100],
  },
  buttonContainer: {
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingCard: {
    width: 335,
    aspectRatio: 0.716,
    position: "relative",
  },
  loader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  flipCard: {
    width: 335,
    aspectRatio: 0.716,
    backfaceVisibility: "hidden",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    borderRadius: 17,
  },
  inputContainer: {
    width: "100%",
    marginTop: "auto",
  },
  input: {
    width: "100%",
    marginVertical: 10,
  },
  stepIndicator: {
    marginTop: 5,
    fontSize: 14,
    color: colors.beige[100],
  },
  confetti: {
    position: "absolute",
    top: 0,
    width: 500,
    height: 500,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
});

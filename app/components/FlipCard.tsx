import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type FlipCardProps = {
  isFlipped: SharedValue<boolean>;
  cardStyle: StyleProp<ViewStyle>;
  direction?: "x" | "y";
  duration?: number;
  RegularContent: React.ReactNode;
  FlippedContent: React.ReactNode;
};

export default function FlipCard({
  isFlipped,
  cardStyle,
  direction = "y",
  duration = 800,
  RegularContent,
  FlippedContent,
}: FlipCardProps) {
  const isDirectionX = direction === "x";
  const regularCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped.value), [0, 1], [0, 180]);
    const rotateValue = withTiming(`${spinValue}deg`, { duration });
    const dezoomValue = interpolate(Number(isFlipped.value), [0, 1], [1, 0.3]);
    const dezoomTiming = withTiming(dezoomValue, { duration });

    return {
      transform: [
        { perspective: 1000 },
        isDirectionX ? { rotateX: rotateValue } : { rotateY: rotateValue },
        { scale: dezoomTiming },
      ],
    };
  });

  const flippedCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped.value), [0, 1], [180, 360]);
    const rotateValue = withTiming(`${spinValue}deg`, { duration });
    const zoomValue = interpolate(Number(isFlipped.value), [0, 1], [0.3, 1]);
    const zoomTiming = withTiming(zoomValue, { duration });

    return {
      transform: [
        { perspective: 1000 },
        isDirectionX ? { rotateX: rotateValue } : { rotateY: rotateValue },
        { scale: zoomTiming },
      ],
    };
  });

  return (
    <View>
      <Animated.View style={[styles.regularCard, cardStyle, regularCardAnimatedStyle]}>
        {RegularContent}
      </Animated.View>
      <Animated.View style={[styles.flippedCard, cardStyle, flippedCardAnimatedStyle]}>
        {FlippedContent}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  regularCard: {
    position: "absolute",
    zIndex: 1,
  },
  flippedCard: {
    zIndex: 2,
  },
});

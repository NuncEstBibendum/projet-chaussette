import colors from "app/constants/colors";
import { SafeAreaView, ScrollView, ViewStyle } from "react-native";
import Text from "./Text";

const SafeAreaScrollView = ({
  children,
  title,
  style,
}: {
  children: React.ReactNode;
  title?: string;
  style?: ViewStyle;
}) => {
  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: colors.cream }, style]}>
      {title && (
        <Text
          style={{
            fontSize: 18,
            marginBottom: 16,
            fontFamily: "MTG-Font",
            textAlign: "center",
          }}
          color={colors.purple}
        >
          {title}
        </Text>
      )}
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 16 }}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SafeAreaScrollView;

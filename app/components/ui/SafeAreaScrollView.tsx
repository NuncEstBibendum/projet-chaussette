import colors from "app/constants/colors";
import { SafeAreaView, ScrollView, ViewStyle } from "react-native";

const SafeAreaScrollView = ({
  children,
  style,
}: {
  children: React.ReactNode;
  title?: string;
  style?: ViewStyle;
}) => {
  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: colors.cream }, style]}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>{children}</ScrollView>
    </SafeAreaView>
  );
};

export default SafeAreaScrollView;

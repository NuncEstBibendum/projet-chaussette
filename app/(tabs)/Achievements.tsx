import SafeAreaScrollView from "app/components/ui/SafeAreaScrollView";
import Text from "app/components/ui/Text";
import colors from "app/constants/colors";
import useGetAchievements from "app/hooks/useGetAchievements";
import { View } from "react-native";

export default function Achievements() {
  const { data: achievements } = useGetAchievements();

  return (
    <SafeAreaScrollView title="Achievements">
      <View style={{ gap: 16 }}>
        <View style={{ gap: 8 }}>
          <View style={{ gap: 8 }}>
            {achievements?.map((achievement) => (
              <View
                key={achievement.id}
                style={{
                  gap: 8,
                  borderWidth: 1,
                  borderColor: colors.darkBlue,
                  padding: 8,
                  borderRadius: 12,
                  backgroundColor: colors.blue,
                }}
              >
                <Text>{achievement.name}</Text>
                <Text>{achievement.description}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaScrollView>
  );
}

import SafeAreaScrollView from "app/components/ui/SafeAreaScrollView";
import Text from "app/components/ui/Text";
import colors from "app/constants/colors";
import { useAuth } from "app/contexts/AuthContext";
import useGetChildren from "app/hooks/useGetChildren";
import useGetLastChildrenAchievements from "app/hooks/useGetLastChildrenAchievements";
import { TouchableOpacity, View } from "react-native";

export default function Home() {
  const { user } = useAuth();
  const { data: children, isLoading: childrenLoading } = useGetChildren();
  const { data: lastChildrenAchievements, isLoading: lastChildrenAchievementsLoading } =
    useGetLastChildrenAchievements(user?.id ?? "");

  if (childrenLoading || lastChildrenAchievementsLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaScrollView title="Home">
      <View style={{ gap: 16 }}>
        <Text size="large">Bienvenue {user?.username}</Text>
        <View
          style={{
            padding: 16,
            borderWidth: 1,
            borderColor: colors.purple,
            gap: 16,
            borderRadius: 16,
          }}
        >
          <Text size="medium">Dernières compétences acquises</Text>
          <View style={{ gap: 8 }}>
            <View style={{ gap: 8 }}>
              {lastChildrenAchievements?.map((achievement) => (
                <View
                  key={achievement.id}
                  style={{
                    gap: 8,
                    borderWidth: 1,
                    borderColor: colors.purple,
                    padding: 8,
                    borderRadius: 12,
                    backgroundColor: colors.pink,
                  }}
                >
                  <Text>{achievement.achievement.name}</Text>
                  <Text>{achievement.achievement.description}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
        <View
          style={{
            padding: 16,
            borderWidth: 1,
            borderColor: colors.purple,
            gap: 16,
            borderRadius: 16,
          }}
        >
          <Text size="medium">Mes enfants</Text>
          <View style={{ gap: 8 }}>
            {children?.map((child) => (
              <TouchableOpacity>
                <Text>{child.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaScrollView>
  );
}

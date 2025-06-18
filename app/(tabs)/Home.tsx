import Card from "app/components/Card";
import SafeAreaScrollView from "app/components/ui/SafeAreaScrollView";
import Text from "app/components/ui/Text";
import TextInput from "app/components/ui/TextInput";
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
        <View
          style={{
            backgroundColor: colors.darkBlue,
            padding: 16,
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
            borderBottomColor: colors.white,
            paddingBottom: 82,
          }}
        >
          <Text size="large" color={colors.white}>
            Bienvenue,
          </Text>
          <Text size="xlarge" style={{ fontWeight: "bold" }} color={colors.white}>
            {user?.username}
          </Text>
          <TextInput placeholder="Rechercher une compétence" style={{ marginVertical: 24 }} />
        </View>
        <View style={{ gap: 16, marginTop: -82, paddingHorizontal: 16 }}>
          <View style={{ gap: 16, flexDirection: "row" }}>
            <Card backgroundColor={colors.green}>
              <Text size="large" color={colors.darkBlue} style={{ fontWeight: "bold" }}>
                Truc cool n°1
              </Text>
              <Text size="medium" color={colors.darkBlue}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
              </Text>
            </Card>
            <Card backgroundColor={colors.yellow}>
              <Text size="large" color={colors.darkBlue} style={{ fontWeight: "bold" }}>
                Truc cool n°2
              </Text>
              <Text size="medium" color={colors.darkBlue}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
              </Text>
            </Card>
          </View>
          <Text size="large" color={colors.darkBlue} style={{ fontWeight: "bold" }}>
            Dernières compétences acquises
          </Text>
          <View style={{ gap: 8 }}>
            {lastChildrenAchievements?.map((achievement) => (
              <Card key={achievement.id} backgroundColor={colors.blue}>
                <Text size="medium" color={colors.darkBlue} style={{ fontWeight: "bold" }}>
                  {achievement.achievement.name}
                </Text>
                <Text size="small" color={colors.darkBlue}>
                  {achievement.achievement.description}
                </Text>
              </Card>
            ))}
          </View>
          <Text size="large" color={colors.darkBlue} style={{ fontWeight: "bold" }}>
            Mes enfants
          </Text>
          <View style={{ gap: 8 }}>
            {children?.map((child) => (
              <TouchableOpacity>
                <Text size="medium" color={colors.darkBlue}>
                  {child.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaScrollView>
  );
}

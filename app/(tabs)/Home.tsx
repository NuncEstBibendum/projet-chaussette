import Card from "app/components/Card";
import SafeAreaScrollView from "app/components/ui/SafeAreaScrollView";
import Text from "app/components/ui/Text";
import TextInput from "app/components/ui/TextInput";
import Modal from "app/components/ui/Modal";
import AddChildForm from "app/components/AddChildForm";
import colors from "app/constants/colors";
import { useAuth } from "app/contexts/AuthContext";
import useCreateChildren from "app/hooks/useCreateChildren";
import useGetChildren from "app/hooks/useGetChildren";
import useGetLastChildrenAchievements from "app/hooks/useGetLastChildrenAchievements";
import { TouchableOpacity, View } from "react-native";
import { useState } from "react";

export default function Home() {
  const { user } = useAuth();
  const { data: children, isLoading: childrenLoading } = useGetChildren();
  const { data: lastChildrenAchievements, isLoading: lastChildrenAchievementsLoading } =
    useGetLastChildrenAchievements(user?.id ?? "");
  const { mutate: createChildren, isPending: isCreating } = useCreateChildren();
  const [showAddChildModal, setShowAddChildModal] = useState(false);

  if (childrenLoading || lastChildrenAchievementsLoading) {
    return <Text>Loading...</Text>;
  }

  const handleAddChild = (data: { name: string; birthDate: Date; gender: "male" | "female" }) => {
    createChildren({
      userId: user?.id ?? "",
      name: data.name,
      birthDate: data.birthDate,
      gender: data.gender,
    });
    setShowAddChildModal(false);
  };

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
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text size="large" color={colors.darkBlue} style={{ fontWeight: "bold" }}>
              Mes enfants
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: colors.green,
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 16,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => setShowAddChildModal(true)}
            >
              <Text
                size="medium"
                color={colors.darkBlue}
                style={{ margin: 0, padding: 0, lineHeight: 25 }}
              >
                Ajouter un enfant +
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ gap: 8 }}>
            {children?.map((child) => (
              <TouchableOpacity key={child.id}>
                <Text size="medium" color={colors.darkBlue}>
                  {child.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <Modal
        visible={showAddChildModal}
        onClose={() => setShowAddChildModal(false)}
        title="Ajouter un enfant"
      >
        <AddChildForm
          onSubmit={handleAddChild}
          onCancel={() => setShowAddChildModal(false)}
          isLoading={isCreating}
        />
      </Modal>
    </SafeAreaScrollView>
  );
}

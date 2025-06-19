import Card from "app/components/Card";
import SafeAreaScrollView from "app/components/ui/SafeAreaScrollView";
import Text from "app/components/ui/Text";
import Modal from "app/components/ui/Modal";
import colors from "app/constants/colors";
import useGetChildrenAchievements from "app/hooks/useGetChildrenAchievements";
import useCreateChildrenAchievement from "app/hooks/useCreateChildrenAchievement";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AddAchievementForm from "app/components/AddAchievementForm";

export default function ChildDetails() {
  const { childId, childName } = useLocalSearchParams<{ childId: string; childName: string }>();
  const router = useRouter();
  const { data: childrenAchievements, isLoading: childrenAchievementsLoading } =
    useGetChildrenAchievements(childId ?? "");
  const { mutate: createAchievement, isPending: isCreating } = useCreateChildrenAchievement();
  const [showAddAchievementModal, setShowAddAchievementModal] = useState(false);

  if (childrenAchievementsLoading) {
    return <Text>Loading...</Text>;
  }

  const handleAddAchievement = (data: {
    achievementId: string;
    acquiredAt?: Date;
    masteredAt?: Date;
  }) => {
    createAchievement({
      childId: childId ?? "",
      achievementId: data.achievementId,
      acquiredAt: data.acquiredAt,
      masteredAt: data.masteredAt,
    });
    setShowAddAchievementModal(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <SafeAreaScrollView title={`Achievements de ${childName}`}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.darkBlue} />
          </TouchableOpacity>
          <Text size="large" color={colors.darkBlue} style={styles.title}>
            {childName}
          </Text>
          <TouchableOpacity
            onPress={() => setShowAddAchievementModal(true)}
            style={styles.addButton}
          >
            <Ionicons name="add" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text size="large" color={colors.darkBlue} style={styles.sectionTitle}>
            Achievements ({childrenAchievements?.length ?? 0})
          </Text>

          {childrenAchievements && childrenAchievements.length > 0 ? (
            <View style={styles.achievementsList}>
              {childrenAchievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  backgroundColor={colors.blue}
                  style={styles.achievementCard}
                >
                  <Text size="medium" color={colors.darkBlue} style={styles.achievementName}>
                    {achievement.achievement.name}
                  </Text>
                  <Text size="small" color={colors.darkBlue} style={styles.achievementDescription}>
                    {achievement.achievement.description}
                  </Text>
                  <View style={styles.datesContainer}>
                    {achievement.acquiredAt && (
                      <View style={styles.dateItem}>
                        <Text size="small" color={colors.darkBlue} style={styles.dateLabel}>
                          Acquisition:
                        </Text>
                        <Text size="small" color={colors.darkBlue}>
                          {formatDate(achievement.acquiredAt)}
                        </Text>
                      </View>
                    )}
                    {achievement.masteredAt && (
                      <View style={styles.dateItem}>
                        <Text size="small" color={colors.darkBlue} style={styles.dateLabel}>
                          Maîtrise:
                        </Text>
                        <Text size="small" color={colors.darkBlue}>
                          {formatDate(achievement.masteredAt)}
                        </Text>
                      </View>
                    )}
                  </View>
                </Card>
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text size="medium" color={colors.darkBlue} style={styles.emptyText}>
                Aucun achievement pour le moment
              </Text>
              <Text size="small" color={colors.darkBlue} style={styles.emptySubtext}>
                Cliquez sur le bouton + pour ajouter un achievement
              </Text>
            </View>
          )}
        </View>
      </View>

      <Modal
        visible={showAddAchievementModal}
        onClose={() => setShowAddAchievementModal(false)}
        title="Ajouter un achievement"
      >
        <AddAchievementForm
          onSubmit={handleAddAchievement}
          onCancel={() => setShowAddAchievementModal(false)}
          isLoading={isCreating}
        />
      </Modal>
    </SafeAreaScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: colors.green,
    padding: 8,
    borderRadius: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 16,
  },
  sectionTitle: {
    fontWeight: "bold",
  },
  achievementsList: {
    gap: 12,
  },
  achievementCard: {
    marginBottom: 0,
  },
  achievementName: {
    fontWeight: "bold",
  },
  achievementDescription: {
    marginTop: 4,
  },
  datesContainer: {
    marginTop: 12,
    gap: 8,
  },
  dateItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dateLabel: {
    fontWeight: "bold",
    minWidth: 80,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  emptySubtext: {
    textAlign: "center",
    opacity: 0.7,
  },
});

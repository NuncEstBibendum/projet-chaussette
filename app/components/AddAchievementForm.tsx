import Button from "app/components/ui/Button";
import Text from "app/components/ui/Text";
import colors from "app/constants/colors";
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import TextInput from "./ui/TextInput";
import useSearchAchievements from "app/hooks/useSearchAchievements";

type Achievement = {
  id: string;
  name: string;
  description: string;
};

interface AddAchievementFormProps {
  onSubmit: (data: { achievementId: string; acquiredAt?: Date; masteredAt?: Date }) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const AddAchievementForm: React.FC<AddAchievementFormProps> = ({
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [search, setSearch] = useState("");
  const { data: searchAchievements, isLoading: searchAchievementsLoading } =
    useSearchAchievements(search);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [acquiredAt, setAcquiredAt] = useState<Date | undefined>(undefined);
  const [masteredAt, setMasteredAt] = useState<Date | undefined>(undefined);
  const [showAcquiredDatePicker, setShowAcquiredDatePicker] = useState(false);
  const [showMasteredDatePicker, setShowMasteredDatePicker] = useState(false);
  const handleSubmit = () => {
    if (!selectedAchievement) {
      Alert.alert("Erreur", "Veuillez sélectionner un achievement");
      return;
    }

    if (masteredAt && acquiredAt && masteredAt < acquiredAt) {
      Alert.alert(
        "Erreur",
        "La date de maîtrise ne peut pas être antérieure à la date d'acquisition"
      );
      return;
    }

    onSubmit({
      achievementId: selectedAchievement.id,
      acquiredAt,
      masteredAt,
    });
  };

  const handleAcquiredDateChange = (event: any, selectedDate?: Date) => {
    setShowAcquiredDatePicker(false);
    if (selectedDate) {
      setAcquiredAt(selectedDate);
    }
  };

  const handleMasteredDateChange = (event: any, selectedDate?: Date) => {
    setShowMasteredDatePicker(false);
    if (selectedDate) {
      setMasteredAt(selectedDate);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.form}>
        <View style={styles.field}>
          <Text size="medium" color={colors.darkBlue} style={styles.label}>
            Compétence
          </Text>
          <TextInput
            placeholder="Chercher une compétence"
            value={search}
            onChangeText={setSearch}
          />
          {search && searchAchievementsLoading && <Text>Chargement...</Text>}
          {search && searchAchievements && searchAchievements.length > 0 && (
            <ScrollView style={styles.achievementOptionsContainer}>
              {searchAchievements.map((achievement) => (
                <TouchableOpacity
                  key={achievement.id}
                  onPress={() => {
                    setSelectedAchievement(achievement);
                    setSearch("");
                  }}
                  style={styles.achievementOption}
                >
                  <Text size="medium" color={colors.darkBlue}>
                    {achievement.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
          {selectedAchievement && (
            <View style={styles.selectedAchievement}>
              <Text size="medium" color={colors.darkBlue} style={styles.selectedLabel}>
                {selectedAchievement.name}
              </Text>
              <Text size="small" color={colors.darkBlue}>
                {selectedAchievement.description}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.field}>
          <Text size="medium" color={colors.darkBlue} style={styles.label}>
            Date d'acquisition (optionnel)
          </Text>
          <Text size="small" color={colors.darkBlue}>
            Une compétence est acquise lorsque l'enfant l'a réalisée pour la première fois, même
            maladroitement
          </Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowAcquiredDatePicker(true)}
          >
            <Text size="medium" color={colors.darkBlue}>
              {acquiredAt ? formatDate(acquiredAt) : "Sélectionner une date"}
            </Text>
          </TouchableOpacity>
          {showAcquiredDatePicker && (
            <DateTimePicker
              value={acquiredAt || new Date()}
              mode="date"
              display="default"
              onChange={handleAcquiredDateChange}
              maximumDate={new Date()}
            />
          )}
        </View>

        <View style={styles.field}>
          <Text size="medium" color={colors.darkBlue} style={styles.label}>
            Date de maîtrise (optionnel)
          </Text>
          <Text size="small" color={colors.darkBlue}>
            Une compétence est maîtrisée lorsqu'elle est pratiquée quotidiennement et/ou que
            l'enfant est capable de l'apprendre à quelqu'un d'autre
          </Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowMasteredDatePicker(true)}
          >
            <Text size="medium" color={colors.darkBlue}>
              {masteredAt ? formatDate(masteredAt) : "Sélectionner une date"}
            </Text>
          </TouchableOpacity>
          {showMasteredDatePicker && (
            <DateTimePicker
              value={masteredAt || new Date()}
              mode="date"
              display="default"
              onChange={handleMasteredDateChange}
              maximumDate={new Date()}
            />
          )}
        </View>
      </View>

      <View style={styles.buttons}>
        <Button label="Annuler" onPress={onCancel} />
        <Button
          label="Ajouter la compétence"
          onPress={handleSubmit}
          disabled={isLoading || !selectedAchievement}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    gap: 20,
  },
  field: {
    gap: 8,
    position: "relative",
  },
  label: {
    fontWeight: "bold",
  },
  achievementOptionsContainer: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.darkBlue,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    position: "absolute",
    top: 70,
    zIndex: 10,
    backgroundColor: colors.cream,
    width: "100%",
  },
  achievementOption: {
    padding: 12,
  },
  selectedAchievement: {
    padding: 12,
    backgroundColor: colors.green,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.darkBlue,
  },
  selectedLabel: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  selectedName: {
    fontWeight: "bold",
  },
  dateButton: {
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: colors.darkBlue,
    justifyContent: "center",
  },
  buttons: {
    gap: 12,
    marginTop: 24,
  },
});

export default AddAchievementForm;

import Button from "app/components/ui/Button";
import Text from "app/components/ui/Text";
import TextInput from "app/components/ui/TextInput";
import colors from "app/constants/colors";
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface AddChildFormProps {
  onSubmit: (data: { name: string; birthDate: Date; gender: "male" | "female" }) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const AddChildForm: React.FC<AddChildFormProps> = ({ onSubmit, onCancel, isLoading = false }) => {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [gender, setGender] = useState<"male" | "female">("male");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = () => {
    if (!name.trim()) {
      Alert.alert("Erreur", "Veuillez saisir le prénom de l'enfant");
      return;
    }

    onSubmit({
      name: name.trim(),
      birthDate,
      gender,
    });
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setBirthDate(selectedDate);
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
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.field}>
          <Text size="medium" color={colors.darkBlue} style={styles.label}>
            Prénom
          </Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Entrez le prénom de l'enfant"
            style={styles.input}
          />
        </View>

        <View style={styles.field}>
          <Text size="medium" color={colors.darkBlue} style={styles.label}>
            Date de naissance
          </Text>
          <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
            <Text size="medium" color={colors.darkBlue}>
              {formatDate(birthDate)}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={birthDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          )}
        </View>

        <View style={styles.field}>
          <Text size="medium" color={colors.darkBlue} style={styles.label}>
            Sexe
          </Text>
          <View style={styles.genderContainer}>
            <TouchableOpacity
              style={[styles.genderButton, gender === "male" && styles.genderButtonActive]}
              onPress={() => setGender("male")}
            >
              <Text
                size="medium"
                color={gender === "male" ? colors.white : colors.darkBlue}
                style={styles.genderText}
              >
                Garçon
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.genderButton, gender === "female" && styles.genderButtonActive]}
              onPress={() => setGender("female")}
            >
              <Text
                size="medium"
                color={gender === "female" ? colors.white : colors.darkBlue}
                style={styles.genderText}
              >
                Fille
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.buttons}>
        <Button label="Annuler" onPress={onCancel} />
        <Button
          label="Ajouter l'enfant"
          onPress={handleSubmit}
          disabled={isLoading || !name.trim()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 24,
  },
  form: {
    gap: 20,
  },
  field: {
    gap: 8,
  },
  label: {
    fontWeight: "bold",
  },
  input: {
    width: "100%",
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
  genderContainer: {
    flexDirection: "row",
    gap: 12,
  },
  genderButton: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: colors.darkBlue,
    justifyContent: "center",
    alignItems: "center",
  },
  genderButtonActive: {
    backgroundColor: colors.darkBlue,
  },
  genderText: {
    fontWeight: "bold",
  },
  buttons: {
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: colors.darkBlue,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddChildForm;

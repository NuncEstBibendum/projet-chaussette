import colors from "app/constants/colors";
import Text from "app/components/ui/Text";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal as RNModal,
  ScrollView,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SelectOption {
  value: string;
  label: string;
  description?: string;
}

interface SelectProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  options: SelectOption[];
  disabled?: boolean;
  error?: boolean;
}

const Select: React.FC<SelectProps> = ({
  value,
  onValueChange,
  placeholder,
  options,
  disabled = false,
  error = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((option) => option.value === value);

  const handleSelect = (optionValue: string) => {
    onValueChange(optionValue);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.selectButton,
          error && styles.selectButtonError,
          disabled && styles.selectButtonDisabled,
        ]}
        onPress={() => !disabled && setIsOpen(true)}
        disabled={disabled}
      >
        <View style={styles.selectContent}>
          {selectedOption ? (
            <View style={styles.selectedOption}>
              <Text size="medium" color={colors.darkBlue} style={styles.selectedLabel}>
                {selectedOption.label}
              </Text>
              {selectedOption.description && (
                <Text size="small" color={colors.darkBlue} style={styles.selectedDescription}>
                  {selectedOption.description}
                </Text>
              )}
            </View>
          ) : (
            <Text size="medium" color={colors.darkBlue} style={styles.placeholder}>
              {placeholder}
            </Text>
          )}
        </View>
        <Ionicons name={isOpen ? "chevron-up" : "chevron-down"} size={20} color={colors.darkBlue} />
      </TouchableOpacity>

      <RNModal
        visible={isOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setIsOpen(false)}>
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalHeader}>
              <Text size="large" color={colors.darkBlue} style={styles.modalTitle}>
                Sélectionner
              </Text>
              <TouchableOpacity onPress={() => setIsOpen(false)} style={styles.closeButton}>
                <Ionicons name="close" size={24} color={colors.darkBlue} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.optionsList} showsVerticalScrollIndicator={false}>
              {options.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[styles.optionItem, value === option.value && styles.optionItemSelected]}
                  onPress={() => handleSelect(option.value)}
                >
                  <Text
                    size="medium"
                    color={value === option.value ? colors.white : colors.darkBlue}
                    style={styles.optionLabel}
                  >
                    {option.label}
                  </Text>
                  {option.description && (
                    <Text
                      size="small"
                      color={value === option.value ? colors.white : colors.darkBlue}
                      style={styles.optionDescription}
                    >
                      {option.description}
                    </Text>
                  )}
                  {value === option.value && (
                    <Ionicons name="checkmark" size={20} color={colors.white} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Pressable>
        </Pressable>
      </RNModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  selectButton: {
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: colors.darkBlue,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectButtonError: {
    borderColor: colors.blue,
  },
  selectButtonDisabled: {
    opacity: 0.5,
  },
  selectContent: {
    flex: 1,
  },
  selectedOption: {
    flex: 1,
  },
  selectedLabel: {
    fontWeight: "bold",
  },
  selectedDescription: {
    opacity: 0.7,
    marginTop: 2,
  },
  placeholder: {
    opacity: 0.7,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: colors.cream,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.darkBlue,
  },
  modalTitle: {
    fontWeight: "bold",
  },
  closeButton: {
    padding: 4,
  },
  optionsList: {
    padding: 16,
  },
  optionItem: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: colors.darkBlue,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionItemSelected: {
    backgroundColor: colors.darkBlue,
  },
  optionLabel: {
    fontWeight: "bold",
    flex: 1,
  },
  optionDescription: {
    opacity: 0.8,
    marginTop: 4,
  },
});

export default Select;

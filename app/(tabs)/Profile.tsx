import SafeAreaScrollView from "app/components/ui/SafeAreaScrollView";
import TextInput from "app/components/ui/TextInput";
import colors from "app/constants/colors";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  return (
    <SafeAreaScrollView style={styles.root} title="Profile">
      {user && (
        <View style={styles.userInfo}>
          <Text style={styles.label}>Nom d'utilisateur</Text>
          <TextInput style={styles.value} value={user.username} editable={false} />

          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.value} value={user.email} editable={false} />
        </View>
      )}

      <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
        <Text style={styles.signOutText}>Déconnexion</Text>
      </TouchableOpacity>
    </SafeAreaScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 16,
  },
  userInfo: {
    backgroundColor: colors.green,
    padding: 20,
    borderRadius: 8,
    marginBottom: 30,
  },
  label: {
    color: colors.darkBlue,
    fontSize: 16,
    marginBottom: 5,
  },
  value: {
    color: colors.black,
    fontSize: 16,
    marginBottom: 15,
  },
  signOutButton: {
    backgroundColor: colors.darkBlue,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  signOutText: {
    color: colors.cream,
    fontSize: 16,
    fontWeight: "bold",
  },
});

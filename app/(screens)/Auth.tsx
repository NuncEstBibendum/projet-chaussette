import { Ionicons } from "@expo/vector-icons";
import Button from "app/components/ui/Button";
import Text from "app/components/ui/Text";
import TextInput from "app/components/ui/TextInput";
import colors from "app/constants/colors";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Image, Pressable, SafeAreaView, StyleSheet, View } from "react-native";
import { useAuth } from "../contexts/AuthContext";

type AuthMode = "signin" | "signup";

export default function Auth() {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const { signIn, signUp, isLoading } = useAuth();

  const handleBack = () => {
    router.back();
  };

  const handleSubmit = async () => {
    try {
      setErrorMessage("");
      if (mode === "signin") {
        await signIn(email, password);
      } else {
        if (password !== confirmPassword) {
          console.error("Passwords don't match");
          return;
        }
        await signUp(username, email, password, confirmPassword);
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const toggleMode = () => {
    setMode(mode === "signin" ? "signup" : "signin");
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <SafeAreaView style={styles.root}>
      <Image source={require("../../assets/images/logo.png")} style={styles.backgroundImage} />
      <View style={styles.overlay} />
      <SafeAreaView style={styles.container}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.darkBlue} />
        </Pressable>
        <View style={styles.content}>
          <Text color={colors.darkBlue} style={styles.title}>
            Projet Chaussette
          </Text>
          <View style={styles.form}>
            <Text color={colors.darkBlue} style={styles.subtitle}>
              {mode === "signin" ? "Connectez-vous à votre compte" : "Créez un nouveau compte"}
            </Text>
            {mode === "signup" && (
              <TextInput
                value={username}
                onChangeText={setUsername}
                placeholder="Nom d'utilisateur"
                style={styles.input}
                autoCapitalize="none"
              />
            )}
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Adresse email"
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Mot de passe"
              style={styles.input}
              secureTextEntry
            />
            {mode === "signup" && (
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirmer le mot de passe"
                style={styles.input}
                secureTextEntry
              />
            )}
            {errorMessage && (
              <Text style={styles.errorText} color={colors.darkBlue}>
                {errorMessage}
              </Text>
            )}
            <Button
              onPress={handleSubmit}
              label={mode === "signin" ? "Se connecter" : "Créer un compte"}
              disabled={isLoading}
            />
            {isLoading && <ActivityIndicator color={colors.darkBlue} style={styles.loader} />}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text color={colors.darkBlue} style={styles.dividerText}>
                or
              </Text>
              <View style={styles.dividerLine} />
            </View>
            <View style={styles.toggleContainer}>
              <Pressable onPress={toggleMode}>
                <Text style={styles.toggleText} color={colors.darkBlue}>
                  {mode === "signin" ? "Vous n'avez pas de compte ?" : "Vous avez déjà un compte ?"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: "absolute",
    height: "120%",
    width: "100%",
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "120%",
    backgroundColor: colors.cream,
    opacity: 0.5,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    left: 16,
    zIndex: 10,
    padding: 8,
  },
  title: {
    fontFamily: "Beleren",
    fontSize: 48,
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 8,
  },
  form: {
    width: "100%",
    maxWidth: 400,
    gap: 16,
    backgroundColor: colors.cream,
    padding: 24,
    borderRadius: 12,
    shadowColor: colors.darkBlue,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    width: "100%",
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  toggleText: {
    color: colors.darkBlue,
  },
  errorText: {
    textAlign: "center",
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    gap: 8,
  },
  loader: {
    marginLeft: 8,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.darkBlue,
    opacity: 0.3,
  },
  dividerText: {
    fontSize: 16,
    opacity: 0.8,
  },
});

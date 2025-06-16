import Button from "app/components/ui/Button";
import Text from "app/components/ui/Text";
import colors from "app/constants/colors";
import * as Google from "expo-auth-session/providers/google";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useState } from "react";
import { Image, SafeAreaView, StyleSheet, View } from "react-native";

WebBrowser.maybeCompleteAuthSession();

export default function Welcome() {
  const router = useRouter();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const [request, _response, promptAsync] = Google.useAuthRequest({
    androidClientId: "YOUR_ANDROID_CLIENT_ID",
    iosClientId: "YOUR_IOS_CLIENT_ID",
    webClientId: "YOUR_WEB_CLIENT_ID",
  });

  const handleGoogleSignIn = async () => {
    try {
      setIsAuthenticating(true);
      const result = await promptAsync();

      if (result?.type === "success") {
        const { authentication } = result;
        console.log("Google Auth Success:", authentication);
        router.replace("/(tabs)/Home");
      }
    } catch (error) {
      console.error("Google Sign In Error:", error);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleEmailAuth = () => {
    router.push("/(screens)/Auth");
  };

  return (
    <SafeAreaView style={styles.root}>
      <Image source={require("../../assets/images/logo.png")} style={styles.backgroundImage} />
      <View style={styles.overlay} />
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text color={colors.purple} style={styles.title}>
            Projet Chaussette
          </Text>
          <View style={styles.buttonsContainer}>
            <Button
              onPress={handleGoogleSignIn}
              label="Continuer avec Google"
              variant="secondary"
              disabled={!request || isAuthenticating}
              leftIcon={
                <Image
                  source={require("../../assets/images/google.png")}
                  style={{ width: 24, height: 24 }}
                />
              }
            />
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text color={colors.purple} style={styles.dividerText}>
                ou
              </Text>
              <View style={styles.dividerLine} />
            </View>
            <Button
              onPress={handleEmailAuth}
              label="Continuer avec Email"
              disabled={isAuthenticating}
            />
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
    width: "100%",
    height: "120%",
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
  title: {
    fontFamily: "Beleren",
    fontSize: 48,
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 48,
  },
  buttonsContainer: {
    width: "100%",
    maxWidth: 400,
    gap: 24,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.purple,
    opacity: 0.3,
  },
  dividerText: {
    fontSize: 16,
    opacity: 0.8,
  },
});

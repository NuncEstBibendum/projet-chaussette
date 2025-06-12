import { Redirect } from "expo-router";
import { ActivityIndicator } from "react-native";
import { useAuth } from "./contexts/AuthContext";

export default function Index() {
  const { user, isLoading } = useAuth();

  // Show nothing while checking auth state
  if (isLoading) {
    return <ActivityIndicator />;
  }

  // Redirect to home if user is logged in, otherwise to welcome screen
  return <Redirect href={user ? "/(tabs)/Home" : "/(screens)/Welcome"} />;
}

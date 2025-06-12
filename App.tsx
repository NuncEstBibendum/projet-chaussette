import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => {
  const [loaded, error] = useFonts({
    Beleren: require("../assets/fonts/beleren-bold.ttf"),
    Matrix: require("../assets/fonts/matrix-bold.ttf"),
    Plantin: require("../assets/fonts/plantin.ttf"),
    PlantinItalic: require("../assets/fonts/plantin-italic.ttf"),
    Relay: require("../assets/fonts/relay-medium.ttf"),
    Symbols: require("../assets/fonts/symbols.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <SafeAreaProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="index"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(screens)/welcome"
              options={{
                title: "Welcome",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(screens)/auth"
              options={{
                title: "Authentication",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(screens)/home"
              options={{
                title: "Demonic Tutor",
                headerShown: false,
              }}
            />
          </Stack>
        </SafeAreaProvider>
      </PaperProvider>
    </QueryClientProvider>
  );
};

export default App;

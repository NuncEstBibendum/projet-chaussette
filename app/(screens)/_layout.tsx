import { Stack } from "expo-router";

export default function ScreensLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Welcome"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Auth"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChildDetails"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}

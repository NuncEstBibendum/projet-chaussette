import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "app/constants/config";
import { useRouter, useSegments } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";

type Child = {
  id: string;
  name: string;
};

type User = {
  id: string;
  username: string;
  email: string;
  children: Child[];
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(screens)";
    const inTabsGroup = segments[0] === "(tabs)";
    const currentScreen = segments[1];

    // Allow navigation to ChildDetails even when user is authenticated
    const isChildDetailsScreen = currentScreen === "ChildDetails";

    if (!user && !inAuthGroup) {
      router.replace("/(screens)/Welcome");
    } else if (user && !inTabsGroup && !isChildDetailsScreen) {
      // Only redirect to Home if not on ChildDetails screen
      router.replace("/(tabs)/Home");
    }
  }, [user, segments, isLoading]);

  async function loadUser() {
    try {
      const userJson = await AsyncStorage.getItem("user");
      if (userJson) {
        setUser(JSON.parse(userJson));
      }
    } catch (error) {
      console.error("Error loading user:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const res = await response.json();
      await AsyncStorage.setItem("user", JSON.stringify(res.user));
      setUser(res.user);
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  }

  async function signUp(
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    try {
      const response = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, confirmPassword }),
      });

      console.log(response);

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const res = await response.json();
      await AsyncStorage.setItem("user", JSON.stringify(res.user));
      setUser(res.user);
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    }
  }

  async function signOut() {
    try {
      await AsyncStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

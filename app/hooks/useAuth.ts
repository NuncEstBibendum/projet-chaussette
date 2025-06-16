import { useMutation } from "@tanstack/react-query";
import { API_URL } from "app/constants/config";
import axios, { AxiosError } from "axios";

type SignInCredentials = {
  email: string;
  password: string;
};

type SignUpCredentials = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type AuthResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    username: string;
  };
};

type ErrorResponse = {
  error: string;
};

const login = async (credentials: SignInCredentials): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/api/auth/login`, credentials);
  return response.data;
};

const signUp = async (credentials: SignUpCredentials): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/api/auth/signup`, credentials);
  return response.data;
};

const useAuth = () => {
  const loginMutation = useMutation<AuthResponse, AxiosError<ErrorResponse>, SignInCredentials>({
    mutationFn: login,
  });

  const signUpMutation = useMutation<AuthResponse, AxiosError<ErrorResponse>, SignUpCredentials>({
    mutationFn: signUp,
  });

  return {
    login: loginMutation.mutate,
    signUp: signUpMutation.mutate,
    isLoading: loginMutation.isPending || signUpMutation.isPending,
    error:
      loginMutation.error?.response?.data?.error || signUpMutation.error?.response?.data?.error,
  };
};

export default useAuth;

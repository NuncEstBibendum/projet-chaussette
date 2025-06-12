import { useMutation } from "@tanstack/react-query";
import { API_URL } from "app/constants/config";
import CardType from "app/types/CardType";
import axios from "axios";

const createGameSession = async (): Promise<CardType> => {
  const response = await axios.post(`${API_URL}/api/game-session`, {
    userId: "3af74d7c-f95d-4c9b-bfa4-215ac1adae1b",
  });
  return response.data;
};

export const useCreateGameSession = () => {
  return useMutation({
    mutationFn: createGameSession,
  });
};

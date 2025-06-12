import { useQuery } from "@tanstack/react-query";
import { API_URL } from "app/constants/config";
import CardType from "app/types/CardType";
import axios from "axios";

const fetchRandomCard = async (): Promise<CardType> => {
  const response = await axios.get(`${API_URL}/api/cards/random`);
  return response.data;
};

export const useRandomCard = () => {
  return useQuery({
    queryKey: ["randomCard"],
    queryFn: fetchRandomCard,
    // Disable automatic refetching since we want manual control
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
};

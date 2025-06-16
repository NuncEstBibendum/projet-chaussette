import { useQuery } from "@tanstack/react-query";
import { API_URL } from "app/constants/config";
import axios from "axios";

type Achievement = {
  id: string;
  name: string;
  description: string;
};

const getAchievements = async (): Promise<Achievement[]> => {
  const response = await axios.get(`${API_URL}/api/achievements`);
  return response.data;
};

const useGetAchievements = () => {
  return useQuery({
    queryKey: ["achievements"],
    queryFn: getAchievements,
  });
};

export default useGetAchievements;

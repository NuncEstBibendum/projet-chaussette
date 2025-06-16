import { useQuery } from "@tanstack/react-query";
import { API_URL } from "app/constants/config";
import axios from "axios";

type ChildrenAchievement = {
  id: string;
  childId: string;
  achievementId: string;
  createdAt: string;
  updatedAt: string;
  achievement: Achievement;
};

type Achievement = {
  id: string;
  name: string;
  description: string;
};

const getLastChildrenAchievements = async (userId: string): Promise<ChildrenAchievement[]> => {
  const response = await axios.get(`${API_URL}/api/children/${userId}/last-achievements`);
  return response.data;
};

const useGetLastChildrenAchievements = (userId: string) => {
  return useQuery({
    queryKey: ["lastChildrenAchievements", userId],
    queryFn: () => getLastChildrenAchievements(userId),
  });
};

export default useGetLastChildrenAchievements;

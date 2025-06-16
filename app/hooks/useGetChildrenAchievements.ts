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

const getChildrenAchievements = async (childId: string): Promise<ChildrenAchievement[]> => {
  const response = await axios.get(`${API_URL}/api/children/${childId}/achievements`);
  return response.data;
};

const useGetChildrenAchievements = (childId: string) => {
  return useQuery({
    queryKey: ["childrenAchievements", childId],
    queryFn: () => getChildrenAchievements(childId),
  });
};

export default useGetChildrenAchievements;

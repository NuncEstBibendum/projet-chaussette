import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "app/constants/config";
import axios from "axios";

type ChildrenAchievement = {
  id: string;
  childId: string;
  achievementId: string;
  acquiredAt?: string;
  masteredAt?: string;
  createdAt: string;
  updatedAt: string;
  achievement: Achievement;
};

type Achievement = {
  id: string;
  name: string;
  description: string;
};

const createChildrenAchievement = async (
  childId: string,
  achievementId: string,
  acquiredAt?: Date,
  masteredAt?: Date
): Promise<ChildrenAchievement> => {
  const response = await axios.post(
    `${API_URL}/api/children/${childId}/create-children-achievement`,
    {
      achievementId,
      acquiredAt,
      masteredAt,
    }
  );
  return response.data;
};

const useCreateChildrenAchievement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      childId,
      achievementId,
      acquiredAt,
      masteredAt,
    }: {
      childId: string;
      achievementId: string;
      acquiredAt?: Date;
      masteredAt?: Date;
    }) => createChildrenAchievement(childId, achievementId, acquiredAt, masteredAt),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["childrenAchievements", variables.childId] });
      queryClient.invalidateQueries({ queryKey: ["lastChildrenAchievements"] });
    },
  });
};

export default useCreateChildrenAchievement;

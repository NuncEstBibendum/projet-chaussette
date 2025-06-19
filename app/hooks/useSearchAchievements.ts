import { useQuery } from "@tanstack/react-query";
import { API_URL } from "app/constants/config";
import axios from "axios";

type Achievement = {
  id: string;
  name: string;
  description: string;
};

const searchAchievements = async (search: string): Promise<Achievement[]> => {
  const response = await axios.get(`${API_URL}/api/achievements/search`, {
    params: {
      search,
    },
  });
  return response.data;
};

const useSearchAchievements = (search: string) => {
  return useQuery({
    queryKey: ["achievements", search],
    queryFn: () => searchAchievements(search),
  });
};

export default useSearchAchievements;

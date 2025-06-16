import { useQuery } from "@tanstack/react-query";
import { API_URL } from "app/constants/config";
import axios from "axios";

type Children = {
  id: string;
  name: string;
};

const getChildren = async (): Promise<Children[]> => {
  const response = await axios.get(`${API_URL}/api/children`);
  return response.data;
};

const useGetChildren = () => {
  return useQuery({
    queryKey: ["children"],
    queryFn: getChildren,
  });
};

export default useGetChildren;

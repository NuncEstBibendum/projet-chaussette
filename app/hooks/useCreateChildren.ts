import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "app/constants/config";
import axios from "axios";

type Children = {
  id: string;
  name: string;
};

const createChildren = async (
  userId: string,
  name: string,
  birthDate: Date,
  gender: "male" | "female"
): Promise<Children[]> => {
  const response = await axios.post(`${API_URL}/api/children/${userId}`, {
    name,
    birthDate,
    gender,
    parentId: userId,
  });
  return response.data;
};

const useCreateChildren = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId,
      name,
      birthDate,
      gender,
    }: {
      userId: string;
      name: string;
      birthDate: Date;
      gender: "male" | "female";
    }) => createChildren(userId, name, birthDate, gender),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["children"] });
    },
  });
};

export default useCreateChildren;

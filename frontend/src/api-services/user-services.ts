import { useMutation, useQuery } from "@tanstack/react-query";
import { getAuthenticatedUser, UserInfoType } from "../lib/utils";
import { http } from "./http";

const userId = getAuthenticatedUser()?.id;

// User details
export const getUserDetailsService = async () => {
  const resp = await http.get<UserInfoType>(`/api/user/${userId}`);
  return resp.data;
};

export const useGetUserDetailsService = () => {
  return useQuery({
    queryKey: ["getUserDetailsService"],
    queryFn: getUserDetailsService,
  });
};

// Update user details
export const updateUserDetailsService = async (
  newData: Partial<UserInfoType>
) => {
  const resp = await http.post<string>(`/api/user/${userId}`, newData);
  return resp.data;
};

export const useUpdateUserDetailsService = () => {
  return useMutation({
    mutationFn: updateUserDetailsService,
  });
};

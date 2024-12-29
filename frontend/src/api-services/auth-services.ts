import { useMutation } from "@tanstack/react-query";
import { http } from "./http";

/**
 * ============ AUTHENTICATION API's ==========
 */

// Login Service
export type LoginUserDetailsType = {
  email: string;
  password: string;
};

const loginUserService = async (userInfo: LoginUserDetailsType) => {
  const resp = await http.post<string>("/api/auth/login", userInfo);
  return resp.data;
};

export const useLoginUserService = () => {
  return useMutation({
    mutationFn: loginUserService,
  });
};

// Register Service
export type RegisterUserDetailsType = {
  firstName: string;
  lastName: string;
} & LoginUserDetailsType;

const registerUserService = async (userInfo: RegisterUserDetailsType) => {
  const resp = await http.post<string>("/api/auth/register", userInfo);
  return resp.data;
};

export const useRegisterUserService = () => {
  return useMutation({
    mutationFn: registerUserService,
  });
};

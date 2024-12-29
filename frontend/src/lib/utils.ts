import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "token-key";
export const STORAGE_KEY = "selected-univs";

export type UserVisibilityType = "public" | "anonymous";

export type UserInfoType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  visibility: UserVisibilityType;
};

export const getAuthenticatedUser = () => {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return null;
    return jwtDecode<UserInfoType>(token);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const loginUser = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
  window.location.href = "/";
};

export const logoutUser = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(STORAGE_KEY);
  window.location.href = "/";
};

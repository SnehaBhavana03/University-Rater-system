import { QueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { getAuthenticatedUser } from "../lib/utils";

const BASE_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:9000" : "";

export const http = axios.create({
  baseURL: BASE_URL,
  params: {
    userId: getAuthenticatedUser()?.id,
  },
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      enabled: Boolean(getAuthenticatedUser()?.id),
    },
  },
});

queryClient.setDefaultOptions({
  mutations: {
    onSuccess: () => queryClient.invalidateQueries(),
  },
});

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError<string>;
  }
}

import { useMutation, useQuery } from "@tanstack/react-query";
import { http } from "./http";
import { UniversityRecordType } from "./university-services";

// Update bookmark
type BookmarkServiceDataType = {
  universityId: string;
};
const bookmarkUniversityService = async (data: BookmarkServiceDataType) => {
  const resp = await http.post("/api/bookmark", data);
  return resp.data;
};

export const useBookmarkUniversityService = () => {
  return useMutation({
    mutationFn: bookmarkUniversityService,
  });
};

// Get bookmark
const getBookmarksService = async () => {
  const resp = await http.get<Record<string, boolean>>("/api/bookmark");
  return resp.data;
};

export const useGetBookmarkService = () => {
  return useQuery({
    queryKey: ["getBookmarksService"],
    queryFn: () => getBookmarksService(),
  });
};

// Get bookmark list
export type BookmarkRecType = {
  universityId: UniversityRecordType;
  userId: string;
  isBookmarked: boolean;
  _id: string;
};
const getBookmarksListService = async () => {
  const resp = await http.get<BookmarkRecType[]>("/api/bookmark/list");
  return resp.data;
};

export const useGetBookmarksListService = () => {
  return useQuery({
    queryKey: ["getBookmarksListService"],
    queryFn: () => getBookmarksListService(),
  });
};

import { useQuery } from "@tanstack/react-query";
import { IUser } from "../interfaces/IUser";
import { getUnreadConversationsId } from "../utils/fetch/fetchConversation";

export const useUnreadConversationsId = (user: IUser | null) =>
  useQuery<string[]>(["unread-conversations-id"], getUnreadConversationsId, {
    enabled: !!user,
    staleTime: 1 * 60 * 1000, // 1 minute
    initialData: [],
  });

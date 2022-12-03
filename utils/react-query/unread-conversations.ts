/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useQuery } from "@tanstack/react-query";
import { IUserDetail } from "../../interfaces/IUserDetail";
import { getUnreadConversationsId } from "../fetch/fetchConversation";

/* -------------------------------------------------------------------------- */
/*                                  FUNCTIONS                                 */
/* -------------------------------------------------------------------------- */
export const useUnreadConversationsId = (user: IUserDetail | null) =>
  useQuery<string[]>(["unread-conversations-id"], getUnreadConversationsId, {
    enabled: !!user,
    refetchInterval: 1 * 60 * 1000, // 1 minute
    initialData: [],
  });

/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { IConversationForm } from "../../interfaces/message/IConversationForm";
import { IConversationMessageForm } from "../../interfaces/message/IConversationMessageForm";
import { customFetch } from "./customFetch";

/* -------------------------------------------------------------------------- */
/*                              PUBLIC FUNCTIONS                              */
/* -------------------------------------------------------------------------- */
export const storeConversation = async (payload: IConversationForm) => {
  return await customFetch("conversations", "POST", payload);
};

export const getUnreadConversationsId = async () => {
  return await customFetch("conversations/unread", "GET");
};

export const setConversationAsRead = async (conversationId: string) => {
  return await customFetch(
    `conversations/set-as-read/${conversationId}`,
    "POST"
  );
};

export const getConversationMessages = async () => {
  return await customFetch("conversation-messages", "GET");
};

export const storeConversationMessage = async (
  payload: IConversationMessageForm
) => {
  return await customFetch("conversation-messages", "POST", payload);
};

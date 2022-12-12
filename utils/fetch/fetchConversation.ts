/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { IBasicApiResponse } from "../../interfaces/IBasicApiResponse";
import { IConversation } from "../../interfaces/message/IConversation";
import { IConversationForm } from "../../interfaces/message/IConversationForm";
import { IConversationMessageForm } from "../../interfaces/message/IConversationMessageForm";
import { customFetch } from "./customFetch";

/* -------------------------------------------------------------------------- */
/*                              PUBLIC FUNCTIONS                              */
/* -------------------------------------------------------------------------- */
export const storeConversation = async (
  payload: IConversationForm
): Promise<IBasicApiResponse> => {
  return await customFetch("conversations", "POST", payload);
};

export const getUnreadConversationsId = async (): Promise<string[]> => {
  return await customFetch("conversations/unread", "GET");
};

export const setConversationAsRead = async (
  conversationId: string
): Promise<IBasicApiResponse> => {
  return await customFetch(
    `conversations/set-as-read/${conversationId}`,
    "POST"
  );
};

export const getConversationMessages = async (): Promise<IConversation[]> => {
  return await customFetch("conversation-messages", "GET");
};

export const storeConversationMessage = async (
  payload: IConversationMessageForm
): Promise<IBasicApiResponse> => {
  return await customFetch("conversation-messages", "POST", payload);
};

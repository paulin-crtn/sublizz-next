/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { IConversationForm } from "../../interfaces/message/IConversationForm";
import { IConversationMessageForm } from "../../interfaces/message/IConversationMessageForm";
import { customFetch } from "./customFetch";

/* -------------------------------------------------------------------------- */
/*                                  CONSTANT                                  */
/* -------------------------------------------------------------------------- */
const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* -------------------------------------------------------------------------- */
/*                              PUBLIC FUNCTIONS                              */
/* -------------------------------------------------------------------------- */
export const storeConversation = async (payload: IConversationForm) => {
  return await customFetch("conversation", "POST", payload);
};

export const getMessages = async () => {
  return await customFetch("conversation-message", "GET");
};

export const storeMessage = async (payload: IConversationMessageForm) => {
  return await customFetch("conversation-message", "POST", payload);
};

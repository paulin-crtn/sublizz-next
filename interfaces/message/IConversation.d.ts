import { ILeaseDetail } from "../lease/ILeaseDetail";
import { IMessageUser } from "./IMessageUser";
import { IConversationMessage } from "./IConversationMessage";

export interface IConversation {
  id: string;
  participants: IMessageUser[];
  lease: ILeaseDetail;
  messages: IConversationMessage[];
}

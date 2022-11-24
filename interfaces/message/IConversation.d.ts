import { ILeaseDetail } from "../lease/ILeaseDetail";
import { IMessageUser } from "./IMessageUser";
import { IMessage } from "./IMessage";

export interface IConversation {
  id: string;
  participants: IMessageUser[];
  lease: ILeaseDetail;
  messages: IMessage[];
}

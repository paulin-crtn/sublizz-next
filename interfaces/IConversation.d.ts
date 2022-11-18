import { ILeaseDetail } from "./lease/ILeaseDetail";
import { IMessage } from "./IMessage";

export interface IConversation {
  id: string;
  lease: ILeaseDetail;
  messages: IMessage[];
}

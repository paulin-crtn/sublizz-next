import { ILeaseDetail } from "./lease/ILeaseDetail";
import { IMessage } from "./IMessage";

export interface IConversation {
  lease: ILeaseDetail;
  messages: IMessage[];
}

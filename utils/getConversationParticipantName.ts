import { IMessageUser } from "../interfaces/message/IMessageUser";

export const getConversationParticipantName = (participant: IMessageUser) => {
  return participant.lastName
    ? `${participant.firstName} ${participant.lastName.at(0)?.toUpperCase()}.`
    : participant.firstName;
};

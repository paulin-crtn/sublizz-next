export interface IMessage {
  id: number;
  content: string;
  createdAt: string;
  fromUser: {
    id: number;
    firstName: string;
    profilePictureName: null | string;
  };
}

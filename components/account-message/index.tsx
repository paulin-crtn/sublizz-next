/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import Link from "next/link";
import Image from "next/future/image";
import format from "date-fns/format";
import { IConversationMessageForm, ILease } from "../../interfaces/lease";
import { IConversation } from "../../interfaces/IConversation";
import { convertLeaseType } from "../../utils/convertLeaseType";
import LaunchIcon from "@mui/icons-material/Launch";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import Avatar from "@mui/joy/Avatar";
import {
  LEASE_IMAGE_PATH,
  PROFILE_PICTURE_PATH,
} from "../../const/supabasePath";
import Chip from "@mui/joy/Chip";
import { useAuth } from "../../context/auth.context";
import { IMessage } from "../../interfaces/IMessage";
import { useEffect, useRef, useState } from "react";
import Input from "@mui/joy/Input";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";
import SendIcon from "@mui/icons-material/Send";
import LeaseChips from "../lease-chips";
import LeaseDates from "../lease-dates";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import noLeaseImg from "../../public/img/no-lease-img.png";
import { useRouter } from "next/router";
import { storeMessage } from "../../utils/fetch/fetchConversationMessage";
import { useQueryClient, useMutation } from "@tanstack/react-query";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const AccountConversations = ({
  conversations,
}: {
  conversations: IConversation[];
}) => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();

  /* ------------------------------- REACT STATE ------------------------------ */
  const [sortedConversations, setSortedConversations] = useState<
    IConversation[]
  >([]);
  const [selectedConversationId, setSelectedConversationId] = useState<string>(
    conversations[conversations.length - 1].id
  );

  useEffect(() => {
    sortConversations(conversations);
  }, [conversations]);

  const sortConversations = (conversations: IConversation[]) => {
    const sorted = conversations.sort(
      (a: IConversation, b: IConversation) =>
        new Date(b.messages[b.messages.length - 1].createdAt).getTime() -
        new Date(a.messages[a.messages.length - 1].createdAt).getTime()
    );
    setSortedConversations(sorted);
  };

  /* -------------------------------- FUNCTIONS ------------------------------- */
  const getAvatar = (messages: IMessage[]) => {
    const otherParticipants = messages.filter(
      (message) => message.fromUser.id !== user?.id
    );
    return otherParticipants[0].fromUser.profilePictureName ? (
      <Avatar
        src={
          PROFILE_PICTURE_PATH +
          "/" +
          otherParticipants[0].fromUser.profilePictureName
        }
      />
    ) : (
      <Avatar>
        {otherParticipants[0].fromUser.firstName.at(0)?.toUpperCase()}
      </Avatar>
    );
  };

  const getConversationFirstName = (messages: IMessage[]) => {
    const otherParticipants = messages.filter(
      (message) => message.fromUser.id !== user?.id
    );
    return otherParticipants[0].fromUser.firstName;
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <Box display="flex" gap={3}>
      <Box
        flex="0 0 260px"
        sx={{
          border: "1px solid #dddddd",
          height: "fit-content",
          paddingX: 0.5,
          borderRadius: "12px",
          maxHeight: "calc(100vh - 293px)",
          overflowY: "scroll",
        }}
      >
        {sortedConversations.map(
          (conversation: IConversation, index: number) => (
            <Box key={conversation.id}>
              {index != 0 && <Divider />}
              <Box
                onClick={() => setSelectedConversationId(conversation.id)}
                sx={{
                  display: "flex",
                  gap: 2,
                  marginY: 0.5,
                  padding: 1,
                  cursor: "pointer",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                    borderRadius: "10px",
                  },
                  ...(selectedConversationId === conversation.id && {
                    backgroundColor: "#f5f5f5",
                  }),
                }}
              >
                {getAvatar(conversation.messages)}
                <Box>
                  <Typography fontWeight={500}>
                    {getConversationFirstName(conversation.messages)}
                  </Typography>
                  <Typography level="body2" sx={{ color: "#000000" }}>
                    {conversation.lease.city}
                  </Typography>
                  <Typography level="body2" fontSize="0.8rem">
                    {conversation.lease.pricePerMonth}€ &#8226;{" "}
                    {conversation.lease.room}{" "}
                    {conversation.lease.room > 1 ? "pièces" : "pièce"} &#8226;{" "}
                    {conversation.lease.surface}m2
                  </Typography>
                </Box>
              </Box>
            </Box>
          )
        )}
      </Box>
      <Box flex="1 1">
        {selectedConversationId && (
          <AccountConversationMessages
            conversation={
              conversations.find(
                (conversation) => conversation.id === selectedConversationId
              ) as IConversation
            }
          />
        )}
      </Box>
    </Box>
  );
};

export default AccountConversations;

const AccountConversationMessages = ({
  conversation,
}: {
  conversation: IConversation;
}) => {
  /* --------------------------------- ROUTER --------------------------------- */
  const router = useRouter();

  /* ------------------------------- REACT STATE ------------------------------ */
  const [newMessage, setNewMessage] = useState<string>("");

  /* -------------------------------- REACT REF ------------------------------- */
  const conversationBottomRef = useRef<null | HTMLDivElement>(null);

  /* ------------------------------ REACT EFFECT ------------------------------ */
  useEffect(() => {
    conversationBottomRef.current?.scrollIntoView({
      block: "end",
    });
  }, [conversation.messages.length]);

  /* ------------------------------ USE MUTATION ------------------------------ */
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (payload: IConversationMessageForm) => storeMessage(payload),
    {
      onSuccess: async (data) => {
        console.log(data);
        conversationBottomRef.current?.scrollIntoView({
          block: "end",
        });
        setNewMessage("");
        // Update React Query Cache
        queryClient.invalidateQueries({ queryKey: ["userConversations"] });
      },
    }
  );

  const handleStoreMessage = () => {
    if (!!newMessage.length) {
      mutate({ conversationId: conversation.id, message: newMessage });
    }
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Box sx={{ maxHeight: "calc(100vh - 435px)", overflowY: "scroll" }}>
        {conversation.messages.map((message, index) => (
          <Box
            key={message.id}
            sx={{
              display: "flex",
              marginBottom: index === conversation.messages.length - 1 ? 0 : 3,
            }}
          >
            <Box flex="0 0 55px">
              {message.fromUser.profilePictureName ? (
                <Avatar
                  src={
                    PROFILE_PICTURE_PATH +
                    "/" +
                    message.fromUser.profilePictureName
                  }
                />
              ) : (
                <Avatar>
                  {message.fromUser.firstName.at(0)?.toUpperCase()}
                </Avatar>
              )}
            </Box>
            <Box flex="1 1">
              <Box display="flex" alignItems="center" gap={1} marginBottom={1}>
                <Typography fontWeight={500}>
                  {message.fromUser.firstName}
                </Typography>
                <Typography level="body2">
                  {format(new Date(message.createdAt), "dd MMM uuuu p")}
                </Typography>
              </Box>
              <Typography fontWeight={300}>{message.content}</Typography>
            </Box>
          </Box>
        ))}
        <Box ref={conversationBottomRef}></Box>
      </Box>
      <Box marginTop="auto">
        <Textarea
          minRows={3}
          maxRows={3}
          placeholder="Saisissez un message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          sx={{ flex: "1 1" }}
        ></Textarea>
        <Box display="flex" gap={1} marginTop={1}>
          <Button
            size="sm"
            variant="soft"
            fullWidth
            onClick={() => router.push("/leases/" + conversation.lease.id)}
            sx={{ whiteSpace: "nowrap" }}
          >
            Voir l'annonce
          </Button>
          <Button size="sm" fullWidth onClick={handleStoreMessage}>
            Envoyer
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
/* --------------------------------- CONTEXT -------------------------------- */
import { useAuth } from "../../context/auth.context";
import { useUnreadConversationsId } from "../../react-query/unread-conversations";
/* ---------------------------------- UTILS --------------------------------- */
import { setConversationAsRead } from "../../utils/fetch/fetchConversation";
/* -------------------------------- COMPONENT ------------------------------- */
import ConversationMessages from "../conversation-messages";
/* ----------------------------------- MUI ---------------------------------- */
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Avatar from "@mui/joy/Avatar";
/* ------------------------------- INTERFACES ------------------------------- */
import { IConversation } from "../../interfaces/message/IConversation";
/* -------------------------------- CONSTANTS ------------------------------- */
import { PROFILE_PICTURE_PATH } from "../../const/supabasePath";
import { primaryColor } from "../../theme";
import { TOAST_STYLE } from "../../const/toastStyle";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const Conversations = ({
  conversations,
}: {
  conversations: IConversation[];
}) => {
  /* ------------------------------ QUERY CLIENT ------------------------------ */
  const queryClient = useQueryClient();

  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();
  const { data: unreadConversationsId } = useUnreadConversationsId(user);

  /* ------------------------------- REACT STATE ------------------------------ */
  const [sortedConversations, setSortedConversations] = useState<
    IConversation[]
  >([]);
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | undefined
  >();

  /* ------------------------------ REACT EFFECT ------------------------------ */
  useEffect(() => {
    const sorted = sortConversations(conversations);
    setSortedConversations(sorted);
    handleSelectedConversation(selectedConversationId ?? sorted[0].id);
  }, [conversations]);

  /* -------------------------------- FUNCTIONS ------------------------------- */
  const sortConversations = (conversations: IConversation[]) => {
    return conversations.sort(
      (a: IConversation, b: IConversation) =>
        new Date(b.messages[b.messages.length - 1].createdAt).getTime() -
        new Date(a.messages[a.messages.length - 1].createdAt).getTime()
    );
  };

  const handleSelectedConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId);
    if (unreadConversationsId.includes(conversationId)) {
      setTimeout(
        () =>
          setConversationAsRead(conversationId)
            .then(() =>
              queryClient.invalidateQueries({
                queryKey: ["unread-conversations-id"],
              })
            )
            .catch(() => {
              toast.error("Impossible de marquer la conversation comme lue.", {
                style: TOAST_STYLE,
              });
            }),
        2000
      );
    }
  };

  const getConversationAvatar = (conversation: IConversation) => {
    const otherParticipants = conversation.participants.filter(
      (participant) => participant.id !== user?.id
    );
    return otherParticipants[0].profilePictureName ? (
      <Avatar
        src={
          PROFILE_PICTURE_PATH + "/" + otherParticipants[0].profilePictureName
        }
      />
    ) : (
      <Avatar>{otherParticipants[0].firstName.at(0)?.toUpperCase()}</Avatar>
    );
  };

  const getConversationFirstName = (conversation: IConversation) => {
    const otherParticipants = conversation.participants.filter(
      (participant) => participant.id !== user?.id
    );
    return otherParticipants[0].firstName;
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <Box display="flex" gap={3}>
      <Box
        flex="0 0 260px"
        sx={{
          border: "1px solid #dddddd",
          paddingX: 0.5,
          borderRadius: "12px",
          maxHeight: "calc(100vh - 293px)",
          overflowY: "auto",
        }}
      >
        {sortedConversations.map((conversation: IConversation) => (
          <Box key={conversation.id}>
            <Box
              onClick={() => handleSelectedConversation(conversation.id)}
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
                  backgroundColor: primaryColor.soft,
                  "&:hover": {
                    backgroundColor: primaryColor.soft,
                  },
                }),
              }}
            >
              {getConversationAvatar(conversation)}
              <Box>
                <Typography
                  fontWeight={
                    unreadConversationsId.includes(conversation.id) ? 600 : 400
                  }
                >
                  {getConversationFirstName(conversation)}
                </Typography>
                <Typography
                  level="body2"
                  fontWeight={
                    unreadConversationsId.includes(conversation.id) ? 500 : 300
                  }
                  sx={{ color: "#000000" }}
                >
                  {conversation.lease.city}
                </Typography>
                <Typography
                  level="body2"
                  fontSize="0.8rem"
                  fontWeight={
                    unreadConversationsId.includes(conversation.id) ? 500 : 300
                  }
                >
                  {conversation.lease.pricePerMonth}€ &#8226;{" "}
                  {conversation.lease.room}{" "}
                  {conversation.lease.room > 1 ? "pièces" : "pièce"} &#8226;{" "}
                  {conversation.lease.surface}m2
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      <Box flex="1 1">
        {selectedConversationId && (
          <ConversationMessages
            conversation={
              conversations.find(
                (conv: IConversation) => conv.id === selectedConversationId
              ) as IConversation
            }
          />
        )}
      </Box>
    </Box>
  );
};

export default Conversations;

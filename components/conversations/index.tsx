/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { useEffect, useState } from "react";
/* --------------------------------- CONTEXT -------------------------------- */
import { useAuth } from "../../context/auth.context";
/* -------------------------------- COMPONENT ------------------------------- */
import ConversationMessages from "../conversation-messages";
/* ----------------------------------- MUI ---------------------------------- */
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import Avatar from "@mui/joy/Avatar";
/* ------------------------------- INTERFACES ------------------------------- */
import { IConversation } from "../../interfaces/message/IConversation";
import { IMessage } from "../../interfaces/message/IMessage";
/* -------------------------------- CONSTANTS ------------------------------- */
import { PROFILE_PICTURE_PATH } from "../../const/supabasePath";
import { primaryColor } from "../../theme";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const Conversations = ({
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
  const [selectedConversation, setSelectedConversation] = useState<
    IConversation | undefined
  >();

  /* ------------------------------ REACT EFFECT ------------------------------ */
  useEffect(() => {
    const sorted = sortConversations(conversations);
    setSortedConversations(sorted);
  }, [conversations]);

  useEffect(() => {
    if (sortedConversations && !!sortedConversations.length) {
      setSelectedConversation(sortedConversations[0]);
    }
  }, [sortedConversations]);

  /* -------------------------------- FUNCTIONS ------------------------------- */
  const sortConversations = (conversations: IConversation[]) => {
    return conversations.sort(
      (a: IConversation, b: IConversation) =>
        new Date(b.messages[b.messages.length - 1].createdAt).getTime() -
        new Date(a.messages[a.messages.length - 1].createdAt).getTime()
    );
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
        {sortedConversations.map(
          (conversation: IConversation, index: number) => (
            <Box key={conversation.id}>
              <Box
                onClick={() => setSelectedConversation(conversation)}
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
                  ...(selectedConversation?.id === conversation.id && {
                    backgroundColor: primaryColor.soft,
                    "&:hover": {
                      backgroundColor: primaryColor.soft,
                    },
                  }),
                }}
              >
                {getConversationAvatar(conversation)}
                <Box>
                  <Typography fontWeight={500}>
                    {getConversationFirstName(conversation)}
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
        {selectedConversation && (
          <ConversationMessages conversation={selectedConversation} />
        )}
      </Box>
    </Box>
  );
};

export default Conversations;

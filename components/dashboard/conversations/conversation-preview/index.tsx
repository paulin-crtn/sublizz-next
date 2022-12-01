/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* --------------------------------- CONTEXT -------------------------------- */
import { useAuth } from "../../../../utils/context/auth.context";
import { useUnreadConversationsId } from "../../../../utils/react-query/unread-conversations";
/* ----------------------------------- MUI ---------------------------------- */
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Avatar from "@mui/joy/Avatar";
import Badge from "@mui/joy/Badge";
import Divider from "@mui/joy/Divider";
/* ------------------------------- INTERFACES ------------------------------- */
import { IConversation } from "../../../../interfaces/message/IConversation";
/* -------------------------------- CONSTANTS ------------------------------- */
import { PROFILE_PICTURE_PATH } from "../../../../const/supabasePath";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const ConversationPreview = ({
  conversation,
  selectedConversationId,
  handleSelectedConversation,
}: {
  conversation: IConversation;
  selectedConversationId: string | undefined;
  handleSelectedConversation: (conversationId: string) => void;
}) => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();
  const { data: unreadConversationsId } = useUnreadConversationsId(user);

  /* -------------------------------- FUNCTIONS ------------------------------- */
  const getAvatar = (conversation: IConversation) => {
    const otherParticipants = conversation.participants.filter(
      (participant) => participant.id !== user?.id
    );
    return otherParticipants[0].profilePictureName ? (
      <Avatar
        size="lg"
        src={
          PROFILE_PICTURE_PATH + "/" + otherParticipants[0].profilePictureName
        }
      />
    ) : (
      <Avatar size="lg">
        {otherParticipants[0].firstName.at(0)?.toUpperCase()}
      </Avatar>
    );
  };

  const getParticipantName = (conversation: IConversation) => {
    const participant = conversation.participants.find(
      (participant) => participant.id !== user?.id
    );
    if (participant) {
      return participant.lastName
        ? `${participant.firstName} ${participant.lastName
            .at(0)
            ?.toUpperCase()}.`
        : participant.firstName;
    }
  };

  const getBadgeContent = () => {
    return unreadConversationsId.reduce(
      (prev: number, curr: string) =>
        curr === conversation.id ? 1 + prev : prev,
      0
    );
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <Box key={conversation.id}>
      <Box
        onClick={() => handleSelectedConversation(conversation.id)}
        sx={{
          display: "flex",
          gap: 2,
          margin: 0.5,
          padding: 1.5,
          boxSizing: "content-box",
          cursor: "pointer",
          borderRadius: "12px",
          "&:hover": {
            backgroundColor: "#eeeeee",
          },
          ...(selectedConversationId === conversation.id && {
            backgroundColor: "#262626",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#262626",
              color: "#ffffff",
            },
          }),
        }}
      >
        {unreadConversationsId.includes(conversation.id) ? (
          <Badge
            size="sm"
            color="danger"
            badgeInset="5%"
            badgeContent={getBadgeContent()}
          >
            {getAvatar(conversation)}
          </Badge>
        ) : (
          getAvatar(conversation)
        )}
        <Box>
          <Box display="flex">
            <Typography fontSize="1.05rem" sx={{ color: "inherit" }}>
              {getParticipantName(conversation)}
            </Typography>
          </Box>
          <Typography fontSize="0.95rem" sx={{ color: "inherit" }}>
            {conversation.lease.city}
          </Typography>
          <Typography level="body2" sx={{ color: "inherit" }}>
            {conversation.lease.pricePerMonth}€ &#8226;{" "}
            {conversation.lease.room}{" "}
            {conversation.lease.room > 1 ? "pièces" : "pièce"} &#8226;{" "}
            {conversation.lease.surface}m2
          </Typography>
        </Box>
      </Box>
      <Divider />
    </Box>
  );
};

export default ConversationPreview;

/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import Link from "next/link";
import format from "date-fns/format";
import { ILease } from "../../interfaces/lease";
import { IConversation } from "../../interfaces/IConversation";
import { convertLeaseType } from "../../utils/convertLeaseType";
import LaunchIcon from "@mui/icons-material/Launch";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import Avatar from "@mui/joy/Avatar";
import { PROFILE_PICTURE_PATH } from "../../const/supabasePath";
import Chip from "@mui/joy/Chip";
import { useAuth } from "../../context/auth.context";
import { IMessage } from "../../interfaces/IMessage";
import { useState } from "react";

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
  const [selectedConversation, setSelectedConversation] =
    useState<IConversation>(conversations[0]);

  /* -------------------------------- FUNCTIONS ------------------------------- */
  const getAvatar = (message: IMessage) => {
    if (message.fromUser.id === user?.id) {
      return message.toUser.profilePictureName ? (
        <Avatar
          src={PROFILE_PICTURE_PATH + "/" + message.toUser.profilePictureName}
        />
      ) : (
        <Avatar>{message.toUser.firstName.at(0)?.toUpperCase()}</Avatar>
      );
    }
    if (message.toUser.id === user?.id) {
      return message.fromUser.profilePictureName ? (
        <Avatar
          src={PROFILE_PICTURE_PATH + "/" + message.fromUser.profilePictureName}
        />
      ) : (
        <Avatar>{message.fromUser.firstName.at(0)?.toUpperCase()}</Avatar>
      );
    }
  };

  const getConversationFirstName = (message: IMessage) => {
    return message.fromUser.id === user?.id
      ? message.toUser.firstName
      : message.fromUser.firstName;
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <Box display="flex" gap={6}>
      <Box flex="0 0 240px">
        {conversations.map((conversation: IConversation, index: number) => (
          <Box key={conversation.id}>
            {index === 0 && <Divider />}
            <Box
              onClick={() => setSelectedConversation(conversation)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                marginY: 0.5,
                padding: 1,
                cursor: "pointer",
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                  borderRadius: "10px",
                },
                ...(selectedConversation.id === conversation.id && {
                  backgroundColor: "#f5f5f5",
                }),
              }}
            >
              {getAvatar(conversation.messages[0])}
              <Typography>
                {getConversationFirstName(conversation.messages[0])}
              </Typography>
            </Box>
            <Divider />
          </Box>
        ))}
      </Box>
      <Box flex="1 1">
        <AccountMessage conversation={selectedConversation} />
      </Box>
    </Box>
  );
};

export default AccountConversations;

const AccountMessage = ({ conversation }: { conversation: IConversation }) => {
  return (
    <Box>
      <Box>
        {conversation.messages.map((message) => (
          <div key={message.id}>
            <Typography>{message.content}</Typography>
            <Typography level="body2" marginTop={1}>
              Envoyé le {format(new Date(message.createdAt), "dd MMM uuuu")}
            </Typography>
          </div>
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography level="h6" marginRight={2}>
          {conversation.lease.city}
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Chip size="sm" color="neutral">
            {conversation.lease.pricePerMonth}€
          </Chip>
          <Chip size="sm" color="neutral" variant="soft">
            {convertLeaseType(conversation.lease.type)}
          </Chip>
          <Chip size="sm" color="neutral" variant="soft">
            {conversation.lease.room}{" "}
            {conversation.lease.room > 1 ? "pièces" : "pièce"}
          </Chip>
          <Chip size="sm" color="neutral" variant="soft">
            {conversation.lease.surface}m2
          </Chip>
        </Box>
      </Box>
    </Box>
  );
};

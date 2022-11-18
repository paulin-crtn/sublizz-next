/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import Link from "next/link";
import format from "date-fns/format";
import { ILease } from "../../interfaces/lease";
import { IConversation } from "../../interfaces/IConversation";
import { convertLeaseType } from "../../utils/convertLeaseType";
import LaunchIcon from "@mui/icons-material/Launch";
import styles from "./account-message.module.css";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import Avatar from "@mui/joy/Avatar";
import { PROFILE_PICTURE_PATH } from "../../const/supabasePath";
import Chip from "@mui/joy/Chip";
import { useAuth } from "../../context/auth.context";
import { IMessage } from "../../interfaces/IMessage";

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

  /* -------------------------------- FUNCTIONS ------------------------------- */
  const getConversationPicture = (message: IMessage) => {
    if (!user || !message) return undefined;
    if (message.fromUser.id === user.id) {
      return message.toUser.profilePictureName
        ? PROFILE_PICTURE_PATH + "/" + message.toUser.profilePictureName
        : undefined;
    }
    if (message.toUser.id === user.id) {
      return message.fromUser.profilePictureName
        ? PROFILE_PICTURE_PATH + "/" + message.fromUser.profilePictureName
        : undefined;
    }
    return undefined;
  };

  const getConversationFirstName = (message: IMessage) => {
    if (!user || !message) return undefined;
    return message.fromUser.id === user.id
      ? message.toUser.firstName
      : message.fromUser.firstName;
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <Box width={240}>
      {conversations.map((conversation: IConversation, index: number) => (
        <Box key={conversation.id}>
          {index === 0 && <Divider />}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              marginY: 0.5,
              padding: 1,
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#eeeeee",
                borderRadius: "10px",
              },
            }}
          >
            <Avatar
              size="lg"
              src={getConversationPicture(conversation.messages[0])}
            />
            <Typography>
              {getConversationFirstName(conversation.messages[0])}
            </Typography>
          </Box>
          <Divider />
        </Box>
      ))}
    </Box>
  );
};

export default AccountConversations;

const AccountMessage = ({ conversation }: { conversation: IConversation }) => {
  return (
    <Box>
      <Box marginTop={2} marginBottom={1}>
        {conversation.messages.map((message) => (
          <div key={message.id} className={styles.content}>
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

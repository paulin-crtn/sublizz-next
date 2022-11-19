/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import Link from "next/link";
import Image from "next/future/image";
import format from "date-fns/format";
import { ILease } from "../../interfaces/lease";
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
import { useState } from "react";
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
        {conversations.map((conversation: IConversation, index: number) => (
          <Box key={conversation.id}>
            {index != 0 && <Divider />}
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
                ...(selectedConversation.id === conversation.id && {
                  backgroundColor: "#f5f5f5",
                }),
              }}
            >
              {getAvatar(conversation.messages[0])}
              <Box>
                <Typography fontWeight={500}>
                  {getConversationFirstName(conversation.messages[0])}
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
  /* --------------------------------- ROUTER --------------------------------- */
  const router = useRouter();

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Box sx={{ maxHeight: "calc(100vh - 440px)", overflowY: "scroll" }}>
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
      </Box>
      <Box marginTop="auto" paddingTop={2}>
        <Textarea
          minRows={3}
          maxRows={3}
          placeholder="Saisissez un message..."
          sx={{ flex: "1 1" }}
        />
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
          <Button size="sm" fullWidth>
            Envoyer
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

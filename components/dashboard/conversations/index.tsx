/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/future/image";
import toast from "react-hot-toast";
/* --------------------------------- CONTEXT -------------------------------- */
import { useAuth } from "../../../utils/context/auth.context";
import { useUnreadConversationsId } from "../../../utils/react-query/unread-conversations";
/* ---------------------------------- UTILS --------------------------------- */
import { setConversationAsRead } from "../../../utils/fetch/fetchConversation";
import { getConversationParticipantName } from "../../../utils/getConversationParticipantName";
/* -------------------------------- COMPONENT ------------------------------- */
import ConversationMessages from "./conversation-messages";
import LeaseDates from "../../shared/lease-dates";
import LeaseChips from "../../shared/lease-chips";
/* ----------------------------------- MUI ---------------------------------- */
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Avatar from "@mui/joy/Avatar";
import Button from "@mui/joy/Button";
import Badge from "@mui/joy/Badge";
import Divider from "@mui/joy/Divider";
/* ------------------------------- INTERFACES ------------------------------- */
import { IConversation } from "../../../interfaces/message/IConversation";
import { ILease } from "../../../interfaces/lease";
/* -------------------------------- CONSTANTS ------------------------------- */
import { PROFILE_PICTURE_PATH } from "../../../const/supabasePath";
import { LEASE_IMAGE_PATH } from "../../../const/supabasePath";
import { TOAST_STYLE } from "../../../const/toastStyle";
import noLeaseImg from "../../../public/img/no-lease-img.png";

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

  /* ----------------------------- REACT CALLBACK ----------------------------- */
  const handleSelectedConversation = useCallback(
    (conversationId: string) => {
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
                toast.error(
                  "Impossible de marquer la conversation comme lue.",
                  {
                    style: TOAST_STYLE,
                  }
                );
              }),
          2000
        );
      }
    },
    [queryClient, unreadConversationsId]
  );

  /* ------------------------------ REACT EFFECT ------------------------------ */
  useEffect(() => {
    const sorted = sortConversations(conversations);
    setSortedConversations(sorted);
    handleSelectedConversation(selectedConversationId ?? sorted[0].id);
  }, [conversations, selectedConversationId, handleSelectedConversation]);

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

  const getConversationFirstName = (conversation: IConversation) => {
    const otherParticipants = conversation.participants.filter(
      (participant) => participant.id !== user?.id
    );
    if (otherParticipants[0]) {
      return getConversationParticipantName(otherParticipants[0]);
    }
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <Box display="flex">
      <Box flex="0 0 320px">
        <Box margin={2.5}>
          <Typography level="h5" fontWeight={600}>
            Messages
          </Typography>
          <Typography level="body2" mt={0.5}>
            Lorsqu'une annonce est supprimée, les messages associés le sont
            aussi.
          </Typography>
        </Box>

        <Divider />
        <Box
          sx={{
            paddingX: 0.5,
            maxHeight: "calc(100vh - 210px)",
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
                  margin: 1,
                  padding: 1.5,
                  cursor: "pointer",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                    borderRadius: "12px",
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
                    badgeContent={unreadConversationsId.reduce(
                      (prev, curr) =>
                        curr === conversation.id ? 1 + prev : prev,
                      0
                    )}
                  >
                    {getConversationAvatar(conversation)}
                  </Badge>
                ) : (
                  getConversationAvatar(conversation)
                )}
                <Box>
                  <Box display="flex">
                    <Typography fontSize="1.05rem" sx={{ color: "inherit" }}>
                      {getConversationFirstName(conversation)}
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
            </Box>
          ))}
        </Box>
      </Box>
      <Box
        flex="1 1"
        sx={{
          borderLeft: "1px solid #dddddd",
          borderRight: "1px solid #dddddd",
        }}
      >
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
      <Box flex="0 0 300px">
        {selectedConversationId && (
          <LeasePreview
            lease={
              conversations.find(
                (conv: IConversation) => conv.id === selectedConversationId
              )?.lease as ILease
            }
          />
        )}
      </Box>
    </Box>
  );
};

export default Conversations;

const LeasePreview = ({ lease }: { lease: ILease }) => {
  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          height: 220,
          overflow: "hidden",
        }}
      >
        <Image
          src={
            lease.leaseImages && lease.leaseImages[0]
              ? LEASE_IMAGE_PATH + "/" + lease.leaseImages[0]
              : noLeaseImg
          }
          alt="lease image"
          fill={true}
          style={{ objectFit: "cover" }}
          sizes={"600px"}
        />
      </Box>

      <Box padding={3}>
        <Typography level="h5" fontWeight="600">
          {lease.city}
        </Typography>
        <LeaseDates lease={lease} />
        <LeaseChips lease={lease} size="sm" />
        <Typography level="h6" fontWeight="300" marginTop={2}>
          {lease.pricePerMonth}€ CC
        </Typography>
        <Button
          size="sm"
          variant="soft"
          color="neutral"
          fullWidth
          onClick={() => window.open("/leases/" + lease.id, "_blank")}
          sx={{ marginTop: 2 }}
        >
          Voir l'annonce
        </Button>
      </Box>
    </Box>
  );
};

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
/* -------------------------------- COMPONENT ------------------------------- */
import ConversationMessages from "../conversation-messages";
import LeaseDates from "../../shared/lease-dates";
import LeaseChips from "../../shared/lease-chips";
import CustomBreadcrumbs from "../custom-beadcrumbs";
/* ----------------------------------- MUI ---------------------------------- */
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Avatar from "@mui/joy/Avatar";
import Button from "@mui/joy/Button";
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
        flex="0 0 300px"
        sx={{
          border: "1px solid #dddddd",
          paddingX: 0.5,
          borderRadius: "12px",
          maxHeight: "calc(100vh - 220px)",
          overflowY: "auto",
          backgroundColor: "#ffffff",
        }}
      >
        {sortedConversations.map((conversation: IConversation) => (
          <Box key={conversation.id}>
            <Box
              onClick={() => handleSelectedConversation(conversation.id)}
              sx={(theme) => ({
                display: "flex",
                gap: 2,
                marginY: 0.5,
                padding: 1,
                cursor: "pointer",
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                  borderRadius: "12px",
                },
                ...(selectedConversationId === conversation.id && {
                  backgroundColor: theme.palette.primary.softBg,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.softBg,
                  },
                }),
              })}
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
    <Box sx={{ backgroundColor: "#ffffff", borderRadius: "12px" }}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 160,
          borderRadius: "12px",
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

      <Box padding={2}>
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

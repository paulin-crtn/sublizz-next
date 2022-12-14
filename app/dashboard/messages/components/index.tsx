/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
/* --------------------------------- CONTEXT -------------------------------- */
import { useAuth } from "../../../../utils/context/auth.context";
import { useUnreadConversationsId } from "../../../../utils/react-query/unread-conversations";
/* ---------------------------------- UTILS --------------------------------- */
import { setConversationAsRead } from "../../../../utils/fetch/fetchConversation";
/* -------------------------------- COMPONENT ------------------------------- */
import ConversationPreview from "./conversation-preview";
import ConversationMessages from "./conversation-messages";
import LeasePreview from "./lease-preview";
/* ----------------------------------- MUI ---------------------------------- */
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
/* ------------------------------- INTERFACES ------------------------------- */
import { IConversation } from "../../../../interfaces/message/IConversation";
import { ILease } from "../../../../interfaces/lease";
/* -------------------------------- CONSTANTS ------------------------------- */
import { TOAST_STYLE } from "../../../../const/toastStyle";

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
            <ConversationPreview
              key={conversation.id}
              conversation={conversation}
              selectedConversationId={selectedConversationId}
              handleSelectedConversation={handleSelectedConversation}
            />
          ))}
        </Box>
      </Box>
      <Box
        flex="1 1"
        sx={{
          borderLeft: "1px solid #272930", // JoyUI
          borderRight: "1px solid #272930", // JoyUI
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
      <Box flex="0 0 320px">
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

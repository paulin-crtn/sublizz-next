/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import format from "date-fns/format";
import toast from "react-hot-toast";
/* ---------------------------------- UTILS --------------------------------- */
import { storeMessage } from "../../utils/fetch/fetchConversationMessage";
/* ----------------------------------- MUI ---------------------------------- */
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Avatar from "@mui/joy/Avatar";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";
import CircularProgress from "@mui/joy/CircularProgress";
import SendIcon from "@mui/icons-material/Send";
/* ------------------------------- INTERFACES ------------------------------- */
import { IConversationMessageForm } from "../../interfaces/lease";
import { IConversation } from "../../interfaces/IConversation";
/* -------------------------------- CONSTANTS ------------------------------- */
import { PROFILE_PICTURE_PATH } from "../../const/supabasePath";
import { TOAST_STYLE } from "../../const/toastStyle";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const ConversationMessages = ({
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

  const { mutate, isLoading } = useMutation(
    (payload: IConversationMessageForm) => storeMessage(payload),
    {
      onSuccess: async () => {
        setNewMessage("");
        queryClient.invalidateQueries({ queryKey: ["userConversations"] });
      },
      onError: async (error) => {
        error instanceof Error
          ? toast.error(error.message, { style: TOAST_STYLE })
          : toast.error("Une erreur est survenue", {
              style: TOAST_STYLE,
            });
      },
    }
  );

  /* -------------------------------- FUNCTIONS ------------------------------- */
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
            color="neutral"
            variant="soft"
            fullWidth
            onClick={() => router.push("/leases/" + conversation.lease.id)}
            sx={{ whiteSpace: "nowrap" }}
          >
            Voir l'annonce
          </Button>
          {!isLoading && (
            <Button size="sm" fullWidth onClick={handleStoreMessage}>
              <SendIcon />
            </Button>
          )}
          {isLoading && (
            <Button size="sm" fullWidth disabled>
              <CircularProgress thickness={3} />
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ConversationMessages;

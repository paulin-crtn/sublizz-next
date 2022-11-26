/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { useEffect, useRef, useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import format from "date-fns/format";
import toast from "react-hot-toast";
/* ---------------------------------- UTILS --------------------------------- */
import { storeConversationMessage } from "../../../utils/fetch/fetchConversation";
/* ----------------------------------- MUI ---------------------------------- */
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Avatar from "@mui/joy/Avatar";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";
import CircularProgress from "@mui/joy/CircularProgress";
import SendIcon from "@mui/icons-material/Send";
/* ------------------------------- INTERFACES ------------------------------- */
import { IConversation } from "../../../interfaces/message/IConversation";
import { IMessage } from "../../../interfaces/message/IMessage";
import { IConversationMessageForm } from "../../../interfaces/message/IConversationMessageForm";
/* -------------------------------- CONSTANTS ------------------------------- */
import { PROFILE_PICTURE_PATH } from "../../../const/supabasePath";
import { TOAST_STYLE } from "../../../const/toastStyle";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const ConversationMessages = ({
  conversation,
}: {
  conversation: IConversation;
}) => {
  /* ------------------------------- REACT STATE ------------------------------ */
  const [newMessage, setNewMessage] = useState<string>("");

  /* -------------------------------- REACT REF ------------------------------- */
  const conversationBottomRef = useRef<null | HTMLDivElement>(null);

  /* ------------------------------ REACT EFFECT ------------------------------ */
  useEffect(() => {
    conversationBottomRef.current?.scrollIntoView({
      block: "end",
    });
  }, [conversation]);

  /* ------------------------------ USE MUTATION ------------------------------ */
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    (payload: IConversationMessageForm) => storeConversationMessage(payload),
    {
      onSuccess: async () => {
        setNewMessage("");
        queryClient.invalidateQueries({ queryKey: ["user-conversations"] });
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

  const getMessageAvatar = (conversation: IConversation, message: IMessage) => {
    const participant = conversation.participants.find(
      (participant) => participant.id === message.fromUserId
    );
    return participant?.profilePictureName ? (
      <Avatar
        src={PROFILE_PICTURE_PATH + "/" + participant?.profilePictureName}
      />
    ) : (
      <Avatar>{participant?.firstName.at(0)?.toUpperCase()}</Avatar>
    );
  };

  const getMessageFirstName = (
    conversation: IConversation,
    message: IMessage
  ) => {
    return conversation.participants.find(
      (participant) => participant.id === message.fromUserId
    )?.firstName;
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Box
        sx={{
          height: "calc(100vh - 438px)",
          overflowY: "auto",
          marginBottom: 2,
          paddingTop: 1,
          // maskImage:
          //   "linear-gradient(to top, rgba(255,255,255,1) 90%, rgba(255,255,255,0))",
        }}
      >
        {conversation?.messages.map((message, index) => (
          <Box
            key={message.id}
            sx={{
              display: "flex",
              marginBottom: index === conversation.messages.length - 1 ? 0 : 2,
            }}
          >
            <Box flex="0 0 55px">{getMessageAvatar(conversation, message)}</Box>
            <Box flex="1 1">
              <Box
                display="flex"
                alignItems="center"
                gap={1}
                marginBottom={0.5}
              >
                <Typography fontWeight={500}>
                  {getMessageFirstName(conversation, message)}
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
            onClick={() =>
              window.open("/leases/" + conversation.lease.id, "_blank")
            }
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
              <CircularProgress />
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ConversationMessages;

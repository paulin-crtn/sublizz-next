/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { useEffect, useRef, useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import format from "date-fns/format";
import toast from "react-hot-toast";
/* --------------------------------- CONTEXT -------------------------------- */
import { useAuth } from "../../../../utils/context/auth.context";
/* ---------------------------------- UTILS --------------------------------- */
import { storeConversationMessage } from "../../../../utils/fetch/fetchConversation";
import { getConversationParticipantName } from "../../../../utils/getConversationParticipantName";
/* ----------------------------------- MUI ---------------------------------- */
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Avatar from "@mui/joy/Avatar";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";
import CircularProgress from "@mui/joy/CircularProgress";
import SendIcon from "@mui/icons-material/Send";
/* ------------------------------- INTERFACES ------------------------------- */
import { IConversation } from "../../../../interfaces/message/IConversation";
import { IMessage } from "../../../../interfaces/message/IMessage";
import { IConversationMessageForm } from "../../../../interfaces/message/IConversationMessageForm";
/* -------------------------------- CONSTANTS ------------------------------- */
import { PROFILE_PICTURE_PATH } from "../../../../const/supabasePath";
import { TOAST_STYLE } from "../../../../const/toastStyle";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const ConversationMessages = ({
  conversation,
}: {
  conversation: IConversation;
}) => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();

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
    const participant = conversation.participants.find(
      (participant) => participant.id === message.fromUserId
    );
    if (participant) {
      return getConversationParticipantName(participant);
    }
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Box
        sx={{
          height: "calc(100vh - 215px)",
          overflowY: "auto",
          paddingX: 2,
          paddingY: 2,
        }}
      >
        {conversation?.messages.map((message, index) => (
          <Box
            key={message.id}
            sx={{
              display: "flex",
              gap: 1.5,
              maxWidth: "70%",
              marginBottom: index === conversation.messages.length - 1 ? 0 : 3,
              marginLeft: message.fromUserId === user?.id ? "auto" : 0,
            }}
          >
            <Box
              flex="0 0"
              marginLeft={message.fromUserId === user?.id ? "auto" : 0}
            >
              {getMessageAvatar(conversation, message)}
            </Box>
            <Box
              sx={(theme) => ({
                width: "fit-content",
                paddingX: 2,
                paddingY: 1,
                backgroundColor:
                  message.fromUserId === user?.id
                    ? theme.palette.primary.softBg
                    : "#eeeeee",
                borderRadius: "8px",
              })}
            >
              <Typography fontWeight={300}>{message.content}</Typography>
              <Typography level="body2" mt={0.5}>
                {format(new Date(message.createdAt), "dd MMM uuuu p")}
              </Typography>
            </Box>
          </Box>
        ))}
        <Box ref={conversationBottomRef}></Box>
      </Box>
      <Box
        marginTop="auto"
        display="flex"
        gap={2}
        alignItems="flex-end"
        sx={{
          paddingX: 2,
          paddingY: 2,
        }}
      >
        <Textarea
          minRows={3}
          maxRows={3}
          // variant="plain"
          placeholder="Saisissez un message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          sx={{ flex: "1 1" }}
        ></Textarea>
        {!isLoading && (
          <Button onClick={handleStoreMessage} sx={{ flex: "0 0 50px" }}>
            <SendIcon />
          </Button>
        )}
        {isLoading && (
          <Button disabled>
            <CircularProgress />
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ConversationMessages;

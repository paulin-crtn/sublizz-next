/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { FunctionComponent, PropsWithChildren } from "react";
import { NextPage } from "next";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Head from "next/head";
/* --------------------------------- CONTEXT -------------------------------- */
import { useAuth } from "../../utils/context/auth.context";
/* ---------------------------------- UTILS --------------------------------- */
import { getConversationMessages } from "../../utils/fetch/fetchConversation";
/* ------------------------------- COMPONENTS ------------------------------- */
import AccessDenied from "../../components/public/access-denied";
import Conversations from "../../components/dashboard/conversations";
/* ----------------------------------- MUI ---------------------------------- */
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import SearchIcon from "@mui/icons-material/Search";
import Alert from "@mui/joy/Alert";
import CircularProgress from "@mui/joy/CircularProgress";
import ErrorIcon from "@mui/icons-material/Error";
import Divider from "@mui/joy/Divider";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const UserMessagesPage: NextPage = () => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();

  /* -------------------------------- USE QUERY ------------------------------- */
  const { isLoading, isError, data, error } = useQuery(
    ["user-conversations"],
    getConversationMessages,
    {
      enabled: !!user,
      refetchInterval: 5 * 60 * 1000, // 5 minutes
      initialData: [],
    }
  );

  /* ------------------------------- MIDDLEWARE ------------------------------- */
  if (!user) {
    return <AccessDenied />;
  }

  /* -------------------------------- TEMPLATE -------------------------------- */
  if (isLoading) {
    return (
      <ConversationsLayout>
        <Box sx={{ height: "100%", display: "flex" }}>
          <Box sx={{ margin: "auto", textAlign: "center" }}>
            <CircularProgress size="lg" color="neutral" />
          </Box>
        </Box>
      </ConversationsLayout>
    );
  }

  if (isError && error instanceof Error) {
    return (
      <ConversationsLayout>
        {error.message.split(",").map((msg, index) => (
          <Alert
            key={index}
            startDecorator={<ErrorIcon />}
            variant="soft"
            color="danger"
            sx={{ mb: 2 }}
          >
            {msg}
          </Alert>
        ))}
      </ConversationsLayout>
    );
  }

  if (data && !data.length) {
    return (
      <ConversationsLayout>
        <Box sx={{ marginX: "auto", marginY: 6, textAlign: "center" }}>
          <Typography level="h6" fontWeight={400} marginBottom={3}>
            Vous n'avez envoyé aucun message.
          </Typography>
          <Link href="/leases">
            <Button variant="soft" startDecorator={<SearchIcon />}>
              Parcourir les annonces
            </Button>
          </Link>
        </Box>
      </ConversationsLayout>
    );
  }

  return (
    <ConversationsLayout>
      <Conversations conversations={data} />
    </ConversationsLayout>
  );
};

export default UserMessagesPage;

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const ConversationsLayout: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <>
      <Head>
        <title>Messages | lacartedeslogements</title>
      </Head>
      <Divider />
      <Box sx={{ minHeight: "calc(100vh - 91px)" }}>{children}</Box>
    </>
  );
};

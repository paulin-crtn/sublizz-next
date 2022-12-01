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
import Add from "@mui/icons-material/Add";
/* -------------------------------- CONSTANTS ------------------------------- */
import { UserRoleEnum } from "../../enum/UserRoleEnum";

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
        <Box sx={{ minHeight: "calc(100vh - 91px)", display: "flex" }}>
          <Box margin="auto" padding={2} textAlign="center">
            <CircularProgress size="lg" thickness={6} color="neutral" />
            <Typography level="h4" marginTop={4} fontWeight={400}>
              Chargement des messages
            </Typography>
          </Box>
        </Box>
      </ConversationsLayout>
    );
  }

  if (isError && error instanceof Error) {
    return (
      <ConversationsLayout>
        <Box sx={{ minHeight: "calc(100vh - 91px)", display: "flex" }}>
          <Box margin="auto" padding={2} textAlign="center">
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
          </Box>
        </Box>
      </ConversationsLayout>
    );
  }

  if (data && !data.length) {
    return (
      <ConversationsLayout>
        <Box sx={{ minHeight: "calc(100vh - 91px)", display: "flex" }}>
          <Box margin="auto" padding={2} textAlign="center">
            <Typography level="h2" fontWeight={500} marginBottom={3}>
              Bienvenue sur votre messagerie {user.firstName}
            </Typography>
            <Typography level="h4" fontWeight={400} marginBottom={3}>
              Vous n'avez aucun message.
            </Typography>
            {user.role === UserRoleEnum.SEEKER && (
              <Link href="/leases">
                <Button
                  size="lg"
                  variant="soft"
                  startDecorator={<SearchIcon />}
                >
                  Parcourir les annonces
                </Button>
              </Link>
            )}
            {user.role === UserRoleEnum.OWNER && (
              <Link href="/dashboard/leases/new">
                <Button size="lg" variant="soft" startDecorator={<Add />}>
                  Publier une annonce
                </Button>
              </Link>
            )}
          </Box>
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

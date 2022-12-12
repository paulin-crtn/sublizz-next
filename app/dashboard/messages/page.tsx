"use client";

/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
/* --------------------------------- CONTEXT -------------------------------- */
import { useAuth } from "../../../utils/context/auth.context";
/* ---------------------------------- UTILS --------------------------------- */
import { getConversationMessages } from "../../../utils/fetch/fetchConversation";
/* ------------------------------- COMPONENTS ------------------------------- */
import AccessDenied from "../../shared/access-denied";
import Conversations from "./components";
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
import { UserRoleEnum } from "../../../enum/UserRoleEnum";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export default function Page() {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();

  /* -------------------------------- USE QUERY ------------------------------- */
  const { isLoading, isError, data, error } = useQuery(
    ["user-conversations"],
    getConversationMessages,
    {
      enabled: !!user,
      refetchInterval: 3 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
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
      <>
        <Divider />
        <Box sx={{ minHeight: "calc(100vh - 91px)", display: "flex" }}>
          <Box margin="auto" padding={2} textAlign="center">
            <CircularProgress size="lg" thickness={6} color="neutral" />
            <Typography level="h4" marginTop={4} fontWeight={400}>
              Chargement des messages
            </Typography>
          </Box>
        </Box>
      </>
    );
  }

  if (isError && error instanceof Error) {
    return (
      <>
        <Divider />
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
      </>
    );
  }

  if (data && !data.length) {
    return (
      <>
        <Divider />
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
      </>
    );
  }

  return (
    <Box sx={{ minHeight: "calc(100vh - 91px)" }}>
      <Divider />
      <Conversations conversations={data} />
    </Box>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { NextPage } from "next";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
/* --------------------------------- CONTEXT -------------------------------- */
import { useAuth } from "../../utils/context/auth.context";
/* ---------------------------------- UTILS --------------------------------- */
import { getConversationMessages } from "../../utils/fetch/fetchConversation";
/* ------------------------------- COMPONENTS ------------------------------- */
import AccessDenied from "../../components/dashboard/access-denied";
import DashboardLayout from "../../components/dashboard/dashboard-layout";
import Conversations from "../../components/dashboard/conversations";
import CustomBreadcrumbs from "../../components/dashboard/custom-beadcrumbs";
/* ----------------------------------- MUI ---------------------------------- */
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import SearchIcon from "@mui/icons-material/Search";
import Alert from "@mui/joy/Alert";
import CircularProgress from "@mui/joy/CircularProgress";
import ErrorIcon from "@mui/icons-material/Error";

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
      refetchInterval: 1 * 60 * 1000, // 1 minute
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
      <DashboardLayout
        pageTitle="Messagerie"
        breadcrumbs={<CustomBreadcrumbs currentPage="Messages" />}
      >
        <Box sx={{ height: "100%", display: "flex" }}>
          <Box sx={{ margin: "auto", textAlign: "center" }}>
            <CircularProgress size="lg" color="neutral" />
          </Box>
        </Box>
      </DashboardLayout>
    );
  }

  if (isError && error instanceof Error) {
    return (
      <DashboardLayout
        pageTitle="Messagerie"
        breadcrumbs={<CustomBreadcrumbs currentPage="Messages" />}
      >
        {error.message.split(",").map((msg) => (
          <Alert
            startDecorator={<ErrorIcon />}
            variant="soft"
            color="danger"
            sx={{ mb: 2 }}
          >
            {msg}
          </Alert>
        ))}
      </DashboardLayout>
    );
  }

  if (data && !data.length) {
    return (
      <DashboardLayout
        pageTitle="Messagerie"
        breadcrumbs={<CustomBreadcrumbs currentPage="Messages" />}
      >
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
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      pageTitle="Messagerie"
      breadcrumbs={<CustomBreadcrumbs currentPage="Messages" />}
    >
      <Conversations conversations={data} />
    </DashboardLayout>
  );
};

export default UserMessagesPage;

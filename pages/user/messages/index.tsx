/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { NextPage } from "next";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/joy/Divider";
import Alert from "@mui/joy/Alert";
import InfoIcon from "@mui/icons-material/Info";
import CircularProgress from "@mui/joy/CircularProgress";
import ErrorIcon from "@mui/icons-material/Error";
import { useAuth } from "../../../context/auth.context";
import { getUserMessages } from "../../../utils/fetchLease";
import AccessDenied from "../../../components/access-denied";
import AccountLayout from "../../../components/account-layout";
import AccountMessage from "../../../components/account-message";
import { ILease } from "../../../interfaces/lease";
import { IAccountMessage } from "../../../interfaces/lease/IAccountMessage";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const UserMessagesPage: NextPage = () => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();

  /* -------------------------------- USE QUERY ------------------------------- */
  const { isLoading, isError, data, error } = useQuery(
    ["userMessages"],
    getUserMessages
  );

  /* ------------------------------- MIDDLEWARE ------------------------------- */
  if (!user) {
    return <AccessDenied />;
  }

  /* -------------------------------- TEMPLATE -------------------------------- */
  if (isLoading) {
    return (
      <AccountLayout title="Messages">
        <Box sx={{ height: "100%", display: "flex" }}>
          <Box sx={{ margin: "auto", textAlign: "center" }}>
            <CircularProgress size="lg" color="neutral" />
          </Box>
        </Box>
      </AccountLayout>
    );
  }

  if (isError && error instanceof Error) {
    return (
      <AccountLayout title="Messages">
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
        ;
      </AccountLayout>
    );
  }

  if (data && !data.length) {
    return (
      <AccountLayout title="Messages">
        <Box sx={{ height: "100%", display: "flex" }}>
          <Box sx={{ margin: "auto", textAlign: "center" }}>
            <Typography level="h6" fontWeight={400} marginBottom={3}>
              Vous n'avez envoyé aucun message.
            </Typography>
            <Link href="/leases">
              <Button variant="soft" startDecorator={<SearchIcon />}>
                Parcourir les annonces
              </Button>
            </Link>
          </Box>
        </Box>
      </AccountLayout>
    );
  }

  return (
    <AccountLayout title="Messages">
      <Box>
        <Alert
          variant="soft"
          color="info"
          startDecorator={<InfoIcon />}
          sx={{ marginBottom: "20px" }}
        >
          Lorsqu'une annonce est supprimée, les messages associés le sont
          également.
        </Alert>
        {data.map(
          (
            lease: ILease & { leaseMessages: IAccountMessage[] },
            index: number
          ) => (
            <div key={lease.id}>
              {index === 0 && <Divider />}
              <AccountMessage lease={lease} />
              <Divider />
            </div>
          )
        )}
      </Box>
    </AccountLayout>
  );
};

export default UserMessagesPage;

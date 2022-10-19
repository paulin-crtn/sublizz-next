/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { NextPage } from "next";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Add from "@mui/icons-material/Add";
import Alert from "@mui/joy/Alert";
import CircularProgress from "@mui/joy/CircularProgress";
import ErrorIcon from "@mui/icons-material/Error";
import { useAuth } from "../../../context/auth.context";
import { getUserLeases } from "../../../utils/fetchLease";
import AccessDenied from "../../../components/access-denied";
import AccountLayout from "../../../components/account-layout";
import LeaseCard from "../../../components/lease-card";
import { ILease } from "../../../interfaces/lease";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const UserLeasesPage: NextPage = () => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();

  /* -------------------------------- USE QUERY ------------------------------- */
  const { isLoading, isError, data, error } = useQuery(
    ["userLeases"],
    getUserLeases
  );

  /* ------------------------------- MIDDLEWARE ------------------------------- */
  if (!user) {
    return <AccessDenied />;
  }

  /* -------------------------------- TEMPLATE -------------------------------- */
  if (isLoading) {
    return (
      <AccountLayout title="Mes Annonces">
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
      <AccountLayout title="Mes Annonces">
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
        ;
      </AccountLayout>
    );
  }

  if (data && !data.length) {
    return (
      <AccountLayout title="Mes Annonces">
        <Box sx={{ height: "100%", display: "flex", alignItems: "stretch" }}>
          <Box sx={{ margin: "auto", textAlign: "center" }}>
            <Typography level="h6" fontWeight={400} marginBottom={3}>
              Vous n'avez publié aucune annonce.
            </Typography>
            <Link href="/user/leases/edit">
              <Button variant="soft" startDecorator={<Add />}>
                Publier une annonce
              </Button>
            </Link>
          </Box>
        </Box>
      </AccountLayout>
    );
  }

  return (
    <AccountLayout title="Mes Annonces">
      {data.map((lease: ILease) => (
        <Box key={lease.id} marginY={2}>
          <LeaseCard lease={lease} />
        </Box>
      ))}
    </AccountLayout>
  );
};

export default UserLeasesPage;

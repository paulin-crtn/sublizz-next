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
import InfoIcon from "@mui/icons-material/Info";
import { useAuth } from "../../../context/auth.context";
import { getUserLeases } from "../../../utils/fetch/fetchLease";
import AccessDenied from "../../../components/access-denied";
import AccountLayout from "../../../components/account-layout";
import MyLease from "../../../components/my-lease";
import { ILease, ILeaseDetail } from "../../../interfaces/lease";
import Divider from "@mui/joy/Divider";

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

  if (!data || !data.length) {
    return (
      <AccountLayout title="Mes Annonces">
        <Box sx={{ marginX: "auto", marginY: 6, textAlign: "center" }}>
          <Typography level="h6" fontWeight={400} marginBottom={3}>
            Vous n'avez publié aucune annonce.
          </Typography>
          <Link href="/dashboard/leases/new">
            <Button variant="soft" startDecorator={<Add />}>
              Publier une annonce
            </Button>
          </Link>
        </Box>
      </AccountLayout>
    );
  }

  return (
    <AccountLayout title="Mes Annonces">
      <Alert
        variant="soft"
        color="info"
        startDecorator={<InfoIcon />}
        sx={{ marginBottom: "20px" }}
      >
        Vous pouvez ajouter jusqu'à 3 annonces.
      </Alert>
      {data.map((lease: ILeaseDetail, index: number) => (
        <Box key={lease.id}>
          {index === 0 && <Divider />}
          <MyLease lease={lease} />
          <Divider />
        </Box>
      ))}
    </AccountLayout>
  );
};

export default UserLeasesPage;

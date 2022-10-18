/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { NextPage } from "next";
import { useQuery } from "@tanstack/react-query";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Add from "@mui/icons-material/Add";
import { useAuth } from "../../../context/auth.context";
import { getUserLeases } from "../../../utils/fetchLease";
import AccessDenied from "../../../components/access-denied";
import AccountLayout from "../../../components/account-layout";
import LeaseCard from "../../../components/lease-card";
import { ILease } from "../../../interfaces/lease";
import Link from "next/link";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const UserLeases: NextPage = () => {
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
  return (
    <AccountLayout title="Mes Annonces">
      {data && !data.length && (
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
      )}
      {data &&
        !!data.length &&
        data.map((lease: ILease) => (
          <Box key={lease.id} marginY={2}>
            <LeaseCard lease={lease} />
          </Box>
        ))}
    </AccountLayout>
  );
};

export default UserLeases;

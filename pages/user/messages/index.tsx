/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { NextPage } from "next";
import { useQuery } from "@tanstack/react-query";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import SearchIcon from "@mui/icons-material/Search";
import { useAuth } from "../../../context/auth.context";
import { getUserMessages } from "../../../utils/fetchLease";
import AccessDenied from "../../../components/access-denied";
import AccountLayout from "../../../components/account-layout";
import LeaseCard from "../../../components/lease-card";
import { ILease } from "../../../interfaces/lease";
import Link from "next/link";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const UserMessages: NextPage = () => {
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
  return (
    <AccountLayout title="Messages">
      {data && !data.length && (
        <Box sx={{ height: "100%", display: "flex" }}>
          <Box sx={{ margin: "auto", textAlign: "center" }}>
            <Typography level="h6" marginBottom={3}>
              Vous n'avez répondu à aucune annonce.
            </Typography>
            <Link href="/leases">
              <Button variant="soft" startDecorator={<SearchIcon />}>
                Parcourir les annonces
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

export default UserMessages;

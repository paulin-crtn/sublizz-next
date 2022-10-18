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
import { ILease } from "../../../interfaces/lease";
import Link from "next/link";
import AccountMessage from "../../../components/account-message";
import { IAccountMessage } from "../../../interfaces/lease/IAccountMessage";
import Divider from "@mui/joy/Divider";
import Alert from "@mui/joy/Alert";
import InfoIcon from "@mui/icons-material/Info";

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
            <Typography level="h6" fontWeight={400} marginBottom={3}>
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
      {data && !!data.length && (
        <Box>
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
          <Alert
            variant="soft"
            color="info"
            startDecorator={<InfoIcon />}
            sx={{ marginTop: "30px" }}
          >
            Lorsqu'une annonce est supprimée, les messages associés le sont
            également.
          </Alert>
        </Box>
      )}
    </AccountLayout>
  );
};

export default UserMessages;

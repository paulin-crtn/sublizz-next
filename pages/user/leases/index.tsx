/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { NextPage } from "next";
import { useQuery } from "@tanstack/react-query";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Tab from "@mui/joy/Tab";
import TabList from "@mui/joy/TabList";
import TabPanel from "@mui/joy/TabPanel";
import Tabs from "@mui/joy/Tabs";
import { useAuth } from "../../../context/auth.context";
import {
  getUserLeasesMessages,
  getUserLeases,
} from "../../../utils/fetchLease";
import AccessDenied from "../../../components/access-denied";
import AccountLayout from "../../../components/account-layout";
import LeaseCard from "../../../components/lease-card";
import { ILease } from "../../../interfaces/lease";
import { Button } from "@mui/joy";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const UserLeases: NextPage = () => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();

  /* -------------------------------- USE QUERY ------------------------------- */
  const {
    isLoading: isUserLeasesLoading,
    isError: isUserLeasesError,
    data: userLeases,
    error: userLeasesError,
  } = useQuery(["userLeases"], getUserLeases);

  const {
    isLoading: isUserLeasesMessagesLoading,
    isError: isUserLeasesMessagesError,
    data: userLeasesMessages,
    error: userLeasesMessagesError,
  } = useQuery(["userLeasesMessages"], getUserLeasesMessages);

  /* ------------------------------- MIDDLEWARE ------------------------------- */
  if (!user) {
    return <AccessDenied />;
  }

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <AccountLayout title="Annonces">
      <Tabs aria-label="Basic tabs" defaultValue={0}>
        <TabList>
          <Tab>Annonces contactées</Tab>
          <Tab>Annonces publiées</Tab>
        </TabList>
        <TabPanel value={0}>
          {!userLeasesMessages && (
            <Typography level="h6" textAlign="center" marginY={6}>
              Vous n'avez répondu à aucune annonce.
            </Typography>
          )}
          {userLeasesMessages &&
            userLeasesMessages.map((lease: ILease) => (
              <Box key={lease.id} marginY={2}>
                <LeaseCard lease={lease} />
              </Box>
            ))}
        </TabPanel>
        <TabPanel value={1}>
          {userLeases && (
            <Typography level="h6" textAlign="center" marginY={6}>
              Vous n'avez publié aucune annonce.
            </Typography>
          )}
          {userLeases &&
            userLeases.map((lease: ILease) => (
              <Box key={lease.id} marginY={2}>
                <LeaseCard lease={lease} />
              </Box>
            ))}
        </TabPanel>
      </Tabs>
    </AccountLayout>
  );
};

export default UserLeases;

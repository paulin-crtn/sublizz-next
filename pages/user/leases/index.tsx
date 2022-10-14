/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useCallback, useEffect, useState } from "react";
import { NextPage } from "next";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Tab from "@mui/joy/Tab";
import TabList from "@mui/joy/TabList";
import TabPanel from "@mui/joy/TabPanel";
import Tabs from "@mui/joy/Tabs";
import { useAuth } from "../../../context/auth.context";
import AccessDenied from "../../../components/access-denied";
import AccountLayout from "../../../components/account-layout";
import LeaseCard from "../../../components/lease-card";
import { ILease } from "../../../interfaces/lease";
import { customFetch } from "../../../utils/customFetch";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const UserLeases: NextPage = () => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();

  /* ------------------------------- REACT STATE ------------------------------ */
  const [myLeases, setMyLeases] = useState<ILease[]>([]);

  /* ----------------------------- REACT CALLBACK ----------------------------- */
  const fetchLeases = useCallback(
    async () => await customFetch("leases/user", "GET"),
    []
  );

  /* ------------------------------ REACT EFFECT ------------------------------ */
  useEffect(() => {
    if (user) {
      fetchLeases()
        .then((leases) => setMyLeases(leases))
        .catch((error) => console.error(error));
    }
  }, [user]);

  /* ------------------------------- MIDDLEWARE ------------------------------- */
  if (!user) {
    return <AccessDenied />;
  }

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <AccountLayout title="Annonces">
      <div>
        <Tabs aria-label="Basic tabs" defaultValue={0}>
          <TabList>
            <Tab>Annonces contactées</Tab>
            <Tab>Annonces publiées</Tab>
          </TabList>
          <TabPanel value={0}>
            <Typography>Vous n'avez répondu à aucune annonce.</Typography>
          </TabPanel>
          <TabPanel value={1}>
            {myLeases && !myLeases.length && (
              <Typography>Vous n'avez publié aucune annonce.</Typography>
            )}
            {myLeases &&
              !!myLeases.length &&
              myLeases.map((lease: ILease) => (
                <Box key={lease.id} marginY={2}>
                  <LeaseCard lease={lease} />
                </Box>
              ))}
          </TabPanel>
        </Tabs>
      </div>
    </AccountLayout>
  );
};

export default UserLeases;

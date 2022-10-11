/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { NextPage } from "next";
import { Typography } from "@mui/joy";
import Tab from "@mui/joy/Tab";
import TabList from "@mui/joy/TabList";
import TabPanel from "@mui/joy/TabPanel";
import Tabs from "@mui/joy/Tabs";
import { useAuth } from "../../../context/auth.context";
import AccessDenied from "../../../components/access-denied";
import AccountLayout from "../../../components/account-layout";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const UserLeases: NextPage = () => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();

  /* -------------------------------- TEMPLATE -------------------------------- */
  if (!user) {
    return <AccessDenied />;
  }
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
            <Typography>Vous n'avez publié aucune annonce.</Typography>
          </TabPanel>
        </Tabs>
      </div>
    </AccountLayout>
  );
};

export default UserLeases;

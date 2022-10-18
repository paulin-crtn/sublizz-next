/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { NextPage } from "next";
import Box from "@mui/joy/Box";
import { useAuth } from "../../context/auth.context";
import AccountLayout from "../../components/account-layout";
import AccessDenied from "../../components/access-denied";
import AccountSettings from "../../components/account-settings";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const UserAccount: NextPage = () => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();

  /* -------------------------------- TEMPLATE -------------------------------- */
  if (!user) {
    return <AccessDenied />;
  }
  return (
    <AccountLayout title="Compte">
      <Box sx={{ width: "65%" }}>
        <AccountSettings user={user} />
      </Box>
    </AccountLayout>
  );
};

export default UserAccount;

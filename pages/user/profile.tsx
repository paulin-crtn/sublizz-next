/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { NextPage } from "next";
import Box from "@mui/joy/Box";
import { useAuth } from "../../context/auth.context";
import AccessDenied from "../../components/access-denied";
import AccountLayout from "../../components/account-layout";
import Profile from "../../components/profile";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const UserProfile: NextPage = () => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();

  /* -------------------------------- TEMPLATE -------------------------------- */
  if (!user) {
    return <AccessDenied />;
  }
  return (
    <AccountLayout title="Profil">
      <Box sx={{ width: "60%" }}>
        <Profile user={user} />
      </Box>
    </AccountLayout>
  );
};

export default UserProfile;

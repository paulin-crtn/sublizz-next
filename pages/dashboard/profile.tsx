/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { NextPage } from "next";
import Box from "@mui/joy/Box";
import { useAuth } from "../../context/auth.context";
import AccessDenied from "../../components/access-denied";
import AccountLayout from "../../components/account-layout";
import EditProfile from "../../components/edit-profile";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Typography from "@mui/joy/Typography";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const UserProfilePage: NextPage = () => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();

  /* -------------------------------- TEMPLATE -------------------------------- */
  if (!user) {
    return <AccessDenied />;
  }
  return (
    <AccountLayout breadcrumbs={<BasicBreadcrumbs />}>
      <Box>
        <EditProfile user={user} />
      </Box>
    </AccountLayout>
  );
};

export default UserProfilePage;

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const BasicBreadcrumbs = () => {
  return (
    <Breadcrumbs
      separator="›"
      aria-label="breadcrumbs"
      sx={{ fontSize: "1.6rem" }}
    >
      <Typography fontSize="inherit" fontWeight={500}>
        Profil
      </Typography>
    </Breadcrumbs>
  );
};

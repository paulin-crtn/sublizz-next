/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { NextPage } from "next";
import Box from "@mui/joy/Box";
import { useAuth } from "../../context/auth.context";
import AccountLayout from "../../components/account-layout";
import AccessDenied from "../../components/access-denied";
import AccountSettings from "../../components/account-settings";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Typography from "@mui/joy/Typography";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const UserAccountPage: NextPage = () => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();

  /* -------------------------------- TEMPLATE -------------------------------- */
  if (!user) {
    return <AccessDenied />;
  }
  return (
    <AccountLayout breadcrumbs={<BasicBreadcrumbs />}>
      <Box sx={{ width: "65%" }}>
        <AccountSettings user={user} />
      </Box>
    </AccountLayout>
  );
};

export default UserAccountPage;

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
        Compte
      </Typography>
    </Breadcrumbs>
  );
};

/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { NextPage } from "next";
import Box from "@mui/joy/Box";
import { useAuth } from "../../context/auth.context";
import AccountLayout from "../../components/account-layout";
import AccessDenied from "../../components/access-denied";
import EditAccount from "../../components/edit-account";
import CustomBreadcrumbs from "../../components/custom-beadcrumbs";

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
    <AccountLayout breadcrumbs={<CustomBreadcrumbs currentPage="Compte" />}>
      <Box width="65%">
        <EditAccount user={user} />
      </Box>
    </AccountLayout>
  );
};

export default UserAccountPage;

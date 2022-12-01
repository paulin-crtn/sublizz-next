/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { NextPage } from "next";
import Box from "@mui/joy/Box";
import { useAuth } from "../../utils/context/auth.context";
import AccessDenied from "../../components/public/access-denied";
import DashboardLayout from "../../components/dashboard/dashboard-layout";
import EditProfile from "../../components/dashboard/edit-profile";
import CustomBreadcrumbs from "../../components/dashboard/custom-beadcrumbs";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const UserProfilePage: NextPage = () => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();

  /* ------------------------------- MIDDLEWARE ------------------------------- */
  if (!user) {
    return <AccessDenied />;
  }

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <DashboardLayout
      pageTitle="Profil"
      breadcrumbs={<CustomBreadcrumbs currentPage="Profil" />}
    >
      <Box width="65%">
        <EditProfile user={user} />
      </Box>
    </DashboardLayout>
  );
};

export default UserProfilePage;

"use client";

/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { NextPage } from "next";
import { useAuth } from "../../../utils/context/auth.context";
import DashboardLayout from "../../../components/dashboard/dashboard-layout";
import AccessDenied from "../../../components/public/access-denied";
import EditAccount from "../../../components/dashboard/edit-account";
import CustomBreadcrumbs from "../../../components/dashboard/custom-beadcrumbs";
import Box from "@mui/joy/Box";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const UserAccountPage: NextPage = () => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();

  /* ------------------------------- MIDDLEWARE ------------------------------- */
  if (!user) {
    return <AccessDenied />;
  }

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <DashboardLayout breadcrumbs={<CustomBreadcrumbs currentPage="Compte" />}>
      <Box width="65%">
        <EditAccount user={user} />
      </Box>
    </DashboardLayout>
  );
};

export default UserAccountPage;

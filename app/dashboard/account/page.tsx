"use client";

/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { NextPage } from "next";
import { useAuth } from "../../../utils/context/auth.context";
import DashboardLayout from "../components/dashboard-layout";
import AccessDenied from "../../shared/access-denied";
import EditAccount from "./components/edit-account";
import CustomBreadcrumbs from "../components/custom-beadcrumbs";
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

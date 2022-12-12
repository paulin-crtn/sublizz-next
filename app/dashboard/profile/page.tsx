"use client";

/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useAuth } from "../../../utils/context/auth.context";
import AccessDenied from "../../shared/access-denied";
import DashboardLayout from "../components/dashboard-layout";
import EditProfile from "./components/edit-profile";
import CustomBreadcrumbs from "../components/custom-beadcrumbs";
import Box from "@mui/joy/Box";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export default function Page() {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();

  /* ------------------------------- MIDDLEWARE ------------------------------- */
  if (!user) {
    return <AccessDenied />;
  }

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <DashboardLayout breadcrumbs={<CustomBreadcrumbs currentPage="Profil" />}>
      <Box width="65%">
        <EditProfile user={user} />
      </Box>
    </DashboardLayout>
  );
}

"use client";

/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import EditProfile from "./components/edit-profile";
import CustomBreadcrumbs from "../components/custom-beadcrumbs";
import Box from "@mui/joy/Box";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export default function Page() {
  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <>
      <Box marginBottom={4}>
        <CustomBreadcrumbs currentPage="Profil" />
      </Box>
      <Box
        width="65%"
        sx={{
          "@media (max-width: 1200px)": { width: "85%" },
          "@media (max-width: 900px)": { width: "100%" },
        }}
      >
        <EditProfile />
      </Box>
    </>
  );
}

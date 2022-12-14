"use client";

/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import EditAccount from "./components/edit-account";
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
        <CustomBreadcrumbs currentPage="Compte" />
      </Box>
      <Box
        width="65%"
        sx={{
          "@media (max-width: 1200px)": { width: "85%" },
          "@media (max-width: 900px)": { width: "100%" },
        }}
      >
        <EditAccount />
      </Box>
    </>
  );
}

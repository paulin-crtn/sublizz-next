"use client";

/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* --------------------------------- CONTEXT -------------------------------- */
import { useAuth } from "../../utils/context/auth.context";
/* ------------------------------- COMPONENTS ------------------------------- */
import DashboardNav from "./components/dashboard-nav";
import AccessDenied from "../shared/access-denied";
/* ----------------------------------- MUI ---------------------------------- */
import Avatar from "@mui/joy/Avatar";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Chip from "@mui/joy/Chip";
/* -------------------------------- CONSTANT -------------------------------- */
import { PROFILE_PICTURE_PATH } from "../../const/supabasePath";
import { UserRoleEnum } from "../../enum/UserRoleEnum";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();

  /* ------------------------------- MIDDLEWARE ------------------------------- */
  if (!user) {
    return <AccessDenied />;
  }

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <Box sx={{ minHeight: "calc(100vh - 90px)", marginBottom: 8 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
          marginX: 8,
        }}
      >
        <Box
          component="section"
          sx={{
            flex: "0 0 310px",
            position: "sticky",
            top: 138,
            marginY: 6,
            alignSelf: "flex-start",
          }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            {user?.profilePictureName && (
              <Avatar
                src={PROFILE_PICTURE_PATH + "/" + user?.profilePictureName}
                sx={{ width: 110, height: 110, marginX: "auto" }}
              />
            )}
            {!user?.profilePictureName && (
              <Avatar
                sx={{
                  width: 110,
                  height: 110,
                  marginX: "auto",
                  fontSize: "2rem",
                }}
              >
                {user?.firstName.at(0)?.toUpperCase()}
              </Avatar>
            )}

            <Box marginBottom={1}>
              <Typography level="h5" marginY={1}>
                {user?.firstName}
              </Typography>
              <Chip
                size="sm"
                sx={{
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  borderRadius: "4px",
                  userSelect: "none",
                }}
              >
                {user?.role === UserRoleEnum.SEEKER
                  ? "Je cherche un logement"
                  : "Je propose un logement"}
              </Chip>
            </Box>
          </Box>
          {/** NAVIGATION */}
          <Box marginTop={5}>
            <DashboardNav />
          </Box>
        </Box>
        <Box
          component="section"
          sx={{
            flex: "1 1",
            marginTop: 6,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

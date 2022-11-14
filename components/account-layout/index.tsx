/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { FunctionComponent, PropsWithChildren } from "react";
import Head from "next/head";
/* --------------------------------- CONTEXT -------------------------------- */
import { useAuth } from "../../context/auth.context";
/* ------------------------------- COMPONENTS ------------------------------- */
import AccountNav from "../account-nav";
/* ----------------------------------- MUI ---------------------------------- */
import Avatar from "@mui/joy/Avatar";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
/* -------------------------------- CONSTANT -------------------------------- */
import { PROFILE_PICTURE_PATH } from "../../const/supabasePath";

/* -------------------------------------------------------------------------- */
/*                                    PROPS                                   */
/* -------------------------------------------------------------------------- */
type Props = PropsWithChildren<{ pageTitle: string; breadcrumbs: JSX.Element }>;

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const AccountLayout: FunctionComponent<Props> = ({
  children,
  pageTitle,
  breadcrumbs,
}) => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <>
      <Head>
        <title>{pageTitle} | lacartedeslogements</title>
      </Head>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          backgroundColor: "#eeeeee",
        }}
      >
        <Box
          component="section"
          sx={{
            position: "sticky",
            top: 0,
            flex: "0 0 300px",
            alignSelf: "flex-start",
            height: "100vh",
            backgroundColor: "#ffffff",
          }}
        >
          <Box
            sx={{
              position: "sticky",
              top: 90.5,
              padding: 3,
            }}
          >
            <Box>
              <Avatar
                src={
                  user?.profilePictureName
                    ? PROFILE_PICTURE_PATH + "/" + user?.profilePictureName
                    : undefined
                }
                variant="solid"
                sx={{ width: 90, height: 90, mx: "auto" }}
              />
              <Typography level="h5" marginTop={1} textAlign="center">
                {user?.firstName}
              </Typography>
            </Box>
            {/** NAVIGATION */}
            <AccountNav />
          </Box>
        </Box>
        <Box
          component="section"
          sx={{
            flex: "1 1",
            marginX: 8,
            marginY: 4,
            borderRadius: "10px",
          }}
        >
          <Box marginBottom={2}>{breadcrumbs}</Box>
          <Box
            sx={{
              marginBottom: 8,
              padding: 4,
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;",
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AccountLayout;

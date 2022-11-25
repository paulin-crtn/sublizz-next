/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { FunctionComponent, PropsWithChildren, useMemo } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
/* --------------------------------- CONTEXT -------------------------------- */
import { useAuth } from "../../../utils/context/auth.context";
/* ------------------------------- COMPONENTS ------------------------------- */
import Menu from "../menu";
/* ----------------------------------- MUI ---------------------------------- */
import Avatar from "@mui/joy/Avatar";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Add from "@mui/icons-material/Add";
import Button from "@mui/joy/Button";
import Chip from "@mui/joy/Chip";
/* -------------------------------- CONSTANT -------------------------------- */
import { PROFILE_PICTURE_PATH } from "../../../const/supabasePath";
import { UserRoleEnum } from "../../../enum/UserRoleEnum";

/* -------------------------------------------------------------------------- */
/*                                    PROPS                                   */
/* -------------------------------------------------------------------------- */
type Props = PropsWithChildren<{ pageTitle: string; breadcrumbs: JSX.Element }>;

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const DashboardLayout: FunctionComponent<Props> = ({
  children,
  pageTitle,
  breadcrumbs,
}) => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();

  /* --------------------------------- ROUTER --------------------------------- */
  const router = useRouter();

  /* ------------------------------- REACT MEMO ------------------------------- */
  const showAddLeaseButton = useMemo(() => {
    const pathArr = router.pathname.split("/");
    return user && user.role === UserRoleEnum.OWNER && pathArr.length < 4;
  }, [user]);

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <>
      <Head>
        <title>{pageTitle} | lacartedeslogements</title>
      </Head>
      <Box sx={{ backgroundColor: "#eeeeee" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 6,
            marginX: 8,
          }}
        >
          <Box
            component="section"
            sx={{
              position: "sticky",
              top: 138,
              marginY: 6,
              flex: "0 0 310px",
              alignSelf: "flex-start",
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              gap={2}
              position="absolute"
              width="100%"
              sx={(theme) => ({
                padding: 2,
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                boxShadow: theme.vars.shadow.lg,
              })}
            >
              {user?.profilePictureName && (
                <Avatar
                  src={PROFILE_PICTURE_PATH + "/" + user?.profilePictureName}
                  sx={{ width: 85, height: 85 }}
                />
              )}
              {!user?.profilePictureName && (
                <Avatar sx={{ width: 85, height: 85, fontSize: "2rem" }}>
                  {user?.firstName.at(0)?.toUpperCase()}
                </Avatar>
              )}

              <Box marginBottom={1}>
                <Typography level="h5">{user?.firstName}</Typography>
                <Chip size="sm" color="neutral" variant="soft">
                  {user?.role === UserRoleEnum.SEEKER
                    ? "Je cherche un logement"
                    : "Je propose un logement"}
                </Chip>
              </Box>
            </Box>
            {/** NAVIGATION */}
            <Box
              marginTop="135px"
              sx={(theme) => ({
                padding: 2,
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                boxShadow: theme.vars.shadow.lg,
              })}
            >
              <Menu />
            </Box>
          </Box>
          <Box
            component="section"
            sx={{
              flex: "1 1",
              marginTop: 4,
              borderRadius: "10px",
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginBottom={2}
            >
              <Box>{breadcrumbs}</Box>
              {showAddLeaseButton && (
                <Button
                  startDecorator={<Add />}
                  color="primary"
                  onClick={() => {
                    router.push("/dashboard/leases/new");
                  }}
                  sx={(theme) => ({ boxShadow: theme.vars.shadow.lg })}
                >
                  Publier une annonce
                </Button>
              )}
            </Box>
            <Box
              sx={(theme) => ({
                marginBottom: 6,
                padding: 4,
                backgroundColor: "#ffffff",
                borderRadius: "10px",
                boxShadow: theme.vars.shadow.lg,
              })}
            >
              {children}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DashboardLayout;

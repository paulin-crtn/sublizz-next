/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { FunctionComponent, PropsWithChildren, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
/* --------------------------------- CONTEXT -------------------------------- */
import { useAuth } from "../../../../utils/context/auth.context";
/* ------------------------------- COMPONENTS ------------------------------- */
import Menu from "./menu";
/* ----------------------------------- MUI ---------------------------------- */
import Avatar from "@mui/joy/Avatar";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Add from "@mui/icons-material/Add";
import Button from "@mui/joy/Button";
import Chip from "@mui/joy/Chip";
/* -------------------------------- CONSTANT -------------------------------- */
import { PROFILE_PICTURE_PATH } from "../../../../const/supabasePath";
import { UserRoleEnum } from "../../../../enum/UserRoleEnum";

/* -------------------------------------------------------------------------- */
/*                                    PROPS                                   */
/* -------------------------------------------------------------------------- */
type Props = PropsWithChildren<{ breadcrumbs: JSX.Element }>;

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const DashboardLayout: FunctionComponent<Props> = ({
  children,
  breadcrumbs,
}) => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user } = useAuth();

  /* --------------------------------- ROUTER --------------------------------- */
  const router = useRouter();
  const pathname = usePathname();

  /* ------------------------------- REACT MEMO ------------------------------- */
  const showAddLeaseButton = useMemo(() => {
    if (pathname) {
      return (
        user &&
        user.role === UserRoleEnum.OWNER &&
        (pathname === "/dashboard" || pathname === "/dashboard/leases")
      );
    }
    return false;
  }, [user, pathname]);

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
          <Box marginTop="40px">
            <Menu />
          </Box>
        </Box>
        <Box
          component="section"
          sx={{
            flex: "1 1",
            marginTop: 4,
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom={4}
          >
            <Box sx={{ "& nav": { padding: 0 } }}>{breadcrumbs}</Box>
            {showAddLeaseButton && (
              <Button
                startDecorator={<Add />}
                onClick={() => {
                  router.push("/dashboard/leases/new");
                }}
                sx={{ backgroundColor: "#ffffff", color: "#000000" }}
              >
                Publier une annonce
              </Button>
            )}
          </Box>
          <Box
            sx={(theme) => ({
              marginBottom: 6,
              borderRadius: "8px",
            })}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;

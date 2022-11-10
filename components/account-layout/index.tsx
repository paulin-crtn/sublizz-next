/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { FunctionComponent, PropsWithChildren } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import toast from "react-hot-toast";
import Avatar from "@mui/joy/Avatar";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import StyleIcon from "@mui/icons-material/Style";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import SupportIcon from "@mui/icons-material/Support";
import EmailIcon from "@mui/icons-material/Email";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAuth } from "../../context/auth.context";
import styles from "./account-layout.module.css";
import { PROFILE_PICTURE_PATH } from "../../const/supabasePath";
import { TOAST_STYLE } from "../../const/toastStyle";
import { UserRoleEnum } from "../../enum/UserRoleEnum";

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
  const { user, logout } = useAuth();

  /* --------------------------------- ROUTER --------------------------------- */
  const router = useRouter();

  /* -------------------------------- FUNCTION -------------------------------- */
  const isActive = (key: string) => {
    const current = router.asPath.split("/")[2];
    if (current === key) {
      return styles.active;
    }
  };

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
            <Box component="nav" marginTop={5}>
              <ul>
                {user?.role === UserRoleEnum.OWNER && (
                  <li
                    className={[styles.navButton, isActive("leases")].join(" ")}
                  >
                    <Link href="/dashboard/leases">
                      <Typography
                        startDecorator={<StyleIcon sx={{ marginRight: 1 }} />}
                      >
                        Mes Annonces
                      </Typography>
                    </Link>
                  </li>
                )}
                {user?.role === UserRoleEnum.SEEKER && (
                  <li
                    className={[styles.navButton, isActive("favorites")].join(
                      " "
                    )}
                  >
                    <Link href="/dashboard/favorites">
                      <Typography
                        startDecorator={
                          <FavoriteIcon sx={{ marginRight: 1 }} />
                        }
                      >
                        Favoris
                      </Typography>
                    </Link>
                  </li>
                )}
                <li
                  className={[styles.navButton, isActive("messages")].join(" ")}
                >
                  <Link href="/dashboard/messages">
                    <Typography
                      startDecorator={<EmailIcon sx={{ marginRight: 1 }} />}
                    >
                      Messages
                    </Typography>
                  </Link>
                </li>
                <li
                  className={[styles.navButton, isActive("profile")].join(" ")}
                >
                  <Link href="/dashboard/profile">
                    <Typography
                      startDecorator={<PersonIcon sx={{ marginRight: 1 }} />}
                    >
                      Profil
                    </Typography>
                  </Link>
                </li>
                <li
                  className={[styles.navButton, isActive("account")].join(" ")}
                >
                  <Link href="/dashboard/account">
                    <Typography
                      startDecorator={<SettingsIcon sx={{ marginRight: 1 }} />}
                    >
                      Compte
                    </Typography>
                  </Link>
                </li>
                <Divider sx={{ marginY: 2 }} />
                <li
                  className={styles.navButton}
                  onClick={() => {
                    logout(() => {
                      router.push("/");
                      toast.success(`À bientôt ${user?.firstName}`, {
                        style: TOAST_STYLE,
                      });
                    });
                  }}
                >
                  <Typography
                    margin={0}
                    startDecorator={<LogoutIcon sx={{ marginRight: 1 }} />}
                  >
                    Déconnexion
                  </Typography>
                </li>
                <li
                  className={styles.navButton}
                  onClick={() => console.log("aidez-nous")}
                >
                  <Typography
                    margin={0}
                    startDecorator={<SupportIcon sx={{ marginRight: 1 }} />}
                  >
                    Aidez-nous
                  </Typography>
                </li>
              </ul>
            </Box>
          </Box>
        </Box>
        <Box
          component="section"
          className={styles.content}
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

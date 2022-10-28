/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { FunctionComponent, PropsWithChildren } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Avatar from "@mui/joy/Avatar";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import Button from "@mui/joy/Button";
import NotesIcon from "@mui/icons-material/Notes";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import EmailIcon from "@mui/icons-material/Email";
import { useAuth } from "../../context/auth.context";
import styles from "./account-layout.module.css";
import { PROFILE_PICTURE_PATH } from "../../const/supabasePath";

/* -------------------------------------------------------------------------- */
/*                                    PROPS                                   */
/* -------------------------------------------------------------------------- */
type Props = PropsWithChildren<{ title: string }>;

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const AccountLayout: FunctionComponent<Props> = ({ children, title }) => {
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
    <div className={styles.container}>
      <section className={styles.menu}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            src={
              user?.profilePictureName
                ? PROFILE_PICTURE_PATH + "/" + user?.profilePictureName
                : undefined
            }
            variant="solid"
            sx={{ width: 100, height: 100, mr: 2 }}
          />
          <Box textAlign="center">
            <Typography level="h5" marginBottom={0.5}>
              {user?.firstName}
            </Typography>
            <Button size="sm" variant="outlined" color="neutral">
              Mode Bailleur
            </Button>
          </Box>
        </Box>
        <nav>
          <ul>
            <li className={[styles.navButton, isActive("leases")].join(" ")}>
              <Link href="/dashboard/leases">
                <Typography
                  startDecorator={<NotesIcon sx={{ marginRight: 1 }} />}
                >
                  Mes Annonces
                </Typography>
              </Link>
            </li>
            <li className={[styles.navButton, isActive("messages")].join(" ")}>
              <Link href="/dashboard/messages">
                <Typography
                  startDecorator={<EmailIcon sx={{ marginRight: 1 }} />}
                >
                  Messages
                </Typography>
              </Link>
            </li>
            <li className={[styles.navButton, isActive("profile")].join(" ")}>
              <Link href="/dashboard/profile">
                <Typography
                  startDecorator={<PersonIcon sx={{ marginRight: 1 }} />}
                >
                  Profil
                </Typography>
              </Link>
            </li>
            <li className={[styles.navButton, isActive("account")].join(" ")}>
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
                logout(() => router.push("/"));
              }}
            >
              <Typography
                color="danger"
                margin={0}
                startDecorator={<LogoutIcon sx={{ marginRight: 1 }} />}
              >
                Déconnexion
              </Typography>
            </li>
            <li
              className={styles.navButton}
              onClick={() => console.log("suggestions")}
            >
              <Typography
                color="info"
                margin={0}
                startDecorator={<TipsAndUpdatesIcon sx={{ marginRight: 1 }} />}
              >
                Suggestions
              </Typography>
            </li>
          </ul>
        </nav>
      </section>
      <section className={styles.content}>
        <p className={styles.title}>{title}</p>
        <div className={styles.children}>{children}</div>
      </section>
    </div>
  );
};

export default AccountLayout;

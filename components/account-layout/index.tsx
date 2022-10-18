/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { FunctionComponent, PropsWithChildren } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Avatar from "@mui/joy/Avatar";
import Typography from "@mui/joy/Typography";
import NotesIcon from "@mui/icons-material/Notes";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import EmailIcon from "@mui/icons-material/Email";
import { useAuth } from "../../context/auth.context";
import styles from "./account-layout.module.css";

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
        <Avatar
          src={user?.profilePictureUrl}
          variant="solid"
          sx={{ width: 90, height: 90, mx: "auto" }}
        />
        <Typography level="h5" textAlign="center" mt={2}>
          {user?.firstName}
        </Typography>
        <nav>
          <ul>
            <li className={[styles.navButton, isActive("leases")].join(" ")}>
              <Link href="/user/leases">
                <Typography
                  startDecorator={<NotesIcon sx={{ marginRight: 1 }} />}
                >
                  Mes Annonces
                </Typography>
              </Link>
            </li>
            <li className={[styles.navButton, isActive("messages")].join(" ")}>
              <Link href="/user/messages">
                <Typography
                  startDecorator={<EmailIcon sx={{ marginRight: 1 }} />}
                >
                  Messages
                </Typography>
              </Link>
            </li>
            <li className={[styles.navButton, isActive("profile")].join(" ")}>
              <Link href="/user/profile">
                <Typography
                  startDecorator={<PersonIcon sx={{ marginRight: 1 }} />}
                >
                  Profil
                </Typography>
              </Link>
            </li>
            <li className={[styles.navButton, isActive("account")].join(" ")}>
              <Link href="/user/account">
                <Typography
                  startDecorator={<SettingsIcon sx={{ marginRight: 1 }} />}
                >
                  Compte
                </Typography>
              </Link>
            </li>
            <li
              className={styles.navButton}
              onClick={() => {
                logout(() => router.push("/"));
              }}
            >
              <Typography
                startDecorator={<LogoutIcon sx={{ marginRight: 1 }} />}
              >
                Déconnexion
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

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
  const { user, setUser } = useAuth();

  /* --------------------------------- ROUTER --------------------------------- */
  const router = useRouter();

  /* -------------------------------- FUNCTION -------------------------------- */
  const isActive = (key: string) => {
    const router = useRouter();
    const current = router.asPath.split("/")[2];
    if (current === key) {
      return styles.active;
    }
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
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
                  Annonces
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
                localStorage.removeItem("sublizz");
                setUser(null);
                router.push("/");
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
      </div>
      <div className={styles.content}>
        <Typography level="h3">{title}</Typography>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default AccountLayout;

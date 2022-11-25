/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
/* --------------------------------- CONTEXT -------------------------------- */
import { useAuth } from "../../context/auth.context";
import { useUnreadConversationsId } from "../../utils/react-query/unread-conversations";
/* ------------------------------- COMPONENTS ------------------------------- */
import ModalLayout from "../modal-layout";
import HelpUs from "../help-us";
/* ----------------------------------- MUI ---------------------------------- */
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Divider from "@mui/joy/Divider";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Badge from "@mui/joy/Badge";
/* ---------------------------------- ICONS --------------------------------- */
import HomeIcon from "@mui/icons-material/Home";
import StyleIcon from "@mui/icons-material/Style";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import SupportIcon from "@mui/icons-material/Support";
import EmailIcon from "@mui/icons-material/Email";
import FavoriteIcon from "@mui/icons-material/Favorite";
/* --------------------------------- STYLES --------------------------------- */
import styles from "./account-nav.module.css";
/* -------------------------------- CONSTANTS ------------------------------- */
import { TOAST_STYLE } from "../../const/toastStyle";
import { UserRoleEnum } from "../../enum/UserRoleEnum";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const AccountNav = () => {
  /* --------------------------------- CONTEXT -------------------------------- */
  const { user, logout } = useAuth();
  const { data: unreadConversationsId } = useUnreadConversationsId(user);

  /* ------------------------------- REACT STATE ------------------------------ */
  const [openHelp, setOpenHelp] = useState<boolean>(false);

  /* --------------------------------- ROUTER --------------------------------- */
  const router = useRouter();

  /* -------------------------------- FUNCTION -------------------------------- */
  const isActive = (key: string) => {
    const pathArr = router.asPath.split("/");
    // Dashboard
    if (pathArr[1] === key && pathArr.length === 2) {
      return styles.active;
    }
    // Other Navigation
    if (pathArr[2] === key) {
      return styles.active;
    }
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <Box component="nav">
      <ul>
        <li className={[styles.navButton, isActive("dashboard")].join(" ")}>
          <Link href="/dashboard">
            <Typography startDecorator={<HomeIcon sx={{ marginRight: 1 }} />}>
              Tableau de bord
            </Typography>
          </Link>
        </li>

        {user?.role === UserRoleEnum.OWNER && (
          <li className={[styles.navButton, isActive("leases")].join(" ")}>
            <Link href="/dashboard/leases">
              <Typography
                startDecorator={<StyleIcon sx={{ marginRight: 1 }} />}
              >
                Gérer mes annonces
              </Typography>
            </Link>
          </li>
        )}

        {user?.role === UserRoleEnum.SEEKER && (
          <li className={[styles.navButton, isActive("favorites")].join(" ")}>
            <Link href="/dashboard/favorites">
              <Typography
                startDecorator={<FavoriteIcon sx={{ marginRight: 1 }} />}
              >
                Favoris
              </Typography>
            </Link>
          </li>
        )}

        <li className={[styles.navButton, isActive("messages")].join(" ")}>
          <Link href="/dashboard/messages">
            <Typography startDecorator={<EmailIcon sx={{ marginRight: 1 }} />}>
              Messages
              {!!unreadConversationsId.length && (
                <Badge
                  color="danger"
                  badgeContent={unreadConversationsId.length}
                  sx={{ marginLeft: 2.5 }}
                />
              )}
            </Typography>
          </Link>
        </li>

        <li className={[styles.navButton, isActive("profile")].join(" ")}>
          <Link href="/dashboard/profile">
            <Typography
              startDecorator={<AccountCircleIcon sx={{ marginRight: 1 }} />}
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
        <li className={styles.navButton} onClick={() => setOpenHelp(true)}>
          <Typography
            margin={0}
            startDecorator={<SupportIcon sx={{ marginRight: 1 }} />}
          >
            Aidez-nous
          </Typography>
        </li>
      </ul>

      <Modal open={openHelp} onClose={() => setOpenHelp(false)}>
        <ModalDialog size="lg" aria-labelledby="help-modal">
          <ModalClose />
          <ModalLayout title="Aidez-nous">
            <HelpUs setOpenHelp={setOpenHelp} />
          </ModalLayout>
        </ModalDialog>
      </Modal>
    </Box>
  );
};

export default AccountNav;

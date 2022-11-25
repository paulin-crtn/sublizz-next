/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
/* --------------------------------- CONTEXT -------------------------------- */
import { useAuth } from "../../../utils/context/auth.context";
import { useUnreadConversationsId } from "../../../utils/react-query/unread-conversations";
/* ------------------------------- COMPONENTS ------------------------------- */
import ModalLayout from "../../shared/modal-layout";
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
/* -------------------------------- CONSTANTS ------------------------------- */
import { TOAST_STYLE } from "../../../const/toastStyle";
import { UserRoleEnum } from "../../../enum/UserRoleEnum";
import { primaryColor } from "../../../theme";

/* -------------------------------------------------------------------------- */
/*                                   STYLES                                   */
/* -------------------------------------------------------------------------- */
const navListStyle = {
  margin: "5px 0",
  borderRadius: "5px",
  cursor: "pointer",
  "& > p": {
    padding: "10px 15px",
  },
  "&:hover": {
    backgroundColor: "#f5f5f5",
  },
  "&.active": {
    backgroundColor: primaryColor.main,
    "& > *": {
      color: "#ffffff",
    },
  },
};

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const Menu = () => {
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
      return "active";
    }
    // Other Navigation
    if (pathArr[2] === key) {
      return "active";
    }
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <Box component="nav">
      <ul>
        <Box component="li" sx={navListStyle} className={isActive("dashboard")}>
          <Link href="/dashboard">
            <Typography startDecorator={<HomeIcon sx={{ marginRight: 1 }} />}>
              Tableau de bord
            </Typography>
          </Link>
        </Box>

        {user?.role === UserRoleEnum.OWNER && (
          <Box component="li" sx={navListStyle} className={isActive("leases")}>
            <Link href="/dashboard/leases">
              <Typography
                startDecorator={<StyleIcon sx={{ marginRight: 1 }} />}
              >
                Gérer mes annonces
              </Typography>
            </Link>
          </Box>
        )}

        {user?.role === UserRoleEnum.SEEKER && (
          <Box
            component="li"
            sx={navListStyle}
            className={isActive("favorites")}
          >
            <Link href="/dashboard/favorites">
              <Typography
                startDecorator={<FavoriteIcon sx={{ marginRight: 1 }} />}
              >
                Favoris
              </Typography>
            </Link>
          </Box>
        )}

        <Box component="li" sx={navListStyle} className={isActive("messages")}>
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
        </Box>

        <Box component="li" sx={navListStyle} className={isActive("profile")}>
          <Link href="/dashboard/profile">
            <Typography
              startDecorator={<AccountCircleIcon sx={{ marginRight: 1 }} />}
            >
              Profil
            </Typography>
          </Link>
        </Box>

        <Box component="li" sx={navListStyle} className={isActive("account")}>
          <Link href="/dashboard/account">
            <Typography
              startDecorator={<SettingsIcon sx={{ marginRight: 1 }} />}
            >
              Compte
            </Typography>
          </Link>
        </Box>

        <Divider sx={{ marginY: 2 }} />

        <Box
          component="li"
          sx={navListStyle}
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
        </Box>
        <Box component="li" sx={navListStyle} onClick={() => setOpenHelp(true)}>
          <Typography
            margin={0}
            startDecorator={<SupportIcon sx={{ marginRight: 1 }} />}
          >
            Aidez-nous
          </Typography>
        </Box>
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

export default Menu;